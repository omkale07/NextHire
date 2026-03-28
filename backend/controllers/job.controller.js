const Job = require("../models/job.model.js");


const postJob = async (req, res) => {
    try {
        const {title, description, requirement, salary, location, exprience, jobType, position, companyId} = req.body;
        const userId = req.id;

        if(!title || !description || !requirement || !salary || !location || !exprience|| !jobType || !position || !companyId){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        }

        const job = await Job.create({
           title, 
           description, 
           requirement:requirement.split(","), 
           salary:Number(salary), 
           location, 
           exprienceLevel:exprience, 
           jobType, 
           position, 
           company:companyId,
           created_by:userId
        });
        return res.status(200).json({
            message:"Job created successfully",
            job,
            success:true
        })

    } catch (error) {
       console.log(error) 
    }
}

const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query =({
            $or:[
                {title:{$regex:keyword, $options:"i"}},
                {description:{$regex:keyword, $options:"i"}},
            ]
        })

        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({createdAt: -1})

        if(!jobs){
            return res.status(404).json({
                message:"Jobs not found",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
       console.log(error) 
    }
}

const getJobById = async (req, res) => {

    try {
         const jobId = req.params.id;
    const job = await Job.findById(jobId).populate('application');
    if(!job){
        return res.status(404).json({
        message:"Jobs not found",
        success:false
            })
    }
    return res.status(200).json({
        job,
        success:true
    })
    } catch (error) {
        console.log(error)
    }
   
}

const getAdminJobs = async (req, res) =>{
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by:adminId}).populate({
            path:'company'
        });

        if(!jobs){
        return res.status(404).json({
        message:"Jobs not found",
        success:false 
        })
    }

    return res.status(200).json({
        jobs,
        success:true
    })
    } catch (error) {
        console.log(error)
    }
   
}

const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const adminId = req.id;

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        // Make sure only the creator can delete
        if (job.created_by.toString() !== adminId) {
            return res.status(403).json({
                message: "You are not authorized",
                success: false
            });
        }

        await Job.findByIdAndDelete(jobId);

        return res.status(200).json({
            message: "Job deleted successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = ({
    postJob,
    getAllJobs,
    getJobById,
    getAdminJobs,
    deleteJob
})
