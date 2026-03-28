const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },

    description:{
        type:String,
        required: true
    },
    requirement:[{
        type:String,
        required: true
    }],
    salary:{
        type:Number,
        required: true
    },
    location:{
        type:String,
    },
    exprienceLevel:{
        type:Number,
        required:true
    },
    jobType:{
        type:String
    },
    position:{
        type:Number,
        required:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        reequired:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    application:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Application'
    }
]
},{timestamps:true})

module.exports = mongoose.model('Job', jobSchema);