const getDataUri = require('../utils/datauri');
const Company = require('../models/company.model')
const cloudinary = require('../utils/cloudinary')

const registerCompany = async (req, res)=>{
    try {
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                message:"Company Name is required",
                success:false
            })
        }
        
        let company = await Company.findOne({name:companyName})
        if(company){
            return res.status(400).json({
                message:"you can't add same comapany name",
                success:false
            })
        }
        company = await Company.create({
            name:companyName,
            userId: req.id })

            return res.status(201).json({
                message:"company register succesfully",
                company,
                success: true
            })
    } catch (error) {
        console.log(error)
    }
}

const getCompany = async (req, res) =>{
    try {
        const userId = req.id;
        const companies = await Company.find({userId})
        if(!userId){
            return res.status(404).json({
                message:"Companies not found",
                success:"false"
            })
        }
          return res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

const getCompanyById = async (req,res)=>{
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId)
        if(!company){
            return res.status(404).json({
                message:"company not found",
                success: false
            })
        }

        return res.status(200).json({
            company,
            success:true
        })
    } catch (error) {
      console.log(error)    
    }
}

const updateCompany = async (req, res) =>{
    try {
        const {name, description, website, location} = req.body
        const file = req.file;

        const fileUri = getDataUri(file);
        const cloudeResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "image",
        folder: "images",
      });
      const logo = cloudeResponse.secure_url;

     const updateData = {name, description, website, location, logo}

       let company = await Company.findByIdAndUpdate(req.params.id, updateData, {new:true})

if(!company){
    return res.status(404).json({
        message:"Company not found",
        success:false
    })
}

return res.status(200).json({
    message:"company info updated",
    success:true
})

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
registerCompany,
getCompany,
getCompanyById,
updateCompany
}