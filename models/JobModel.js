const { Schema, default: mongoose } = require('mongoose');

const JobSchema = new Schema({
    companyName: {
        type: String,
        required: [true, 'please enter company name']
    },
    jobTitle: {
        type: String,
        required: [true, 'please provide job title']
    },
    jobDescription: {
        type: String,
        required: [true, 'please enter job description']
    },
    location:{
        type: String,
        required: 'please provide job location'
    },
    salary: {
        type: String,
        required: [true, 'please enter amount to be paid for the job']
    },
    industry: {
        type: String, 
        required: [true, 'please enter industry']
    },
    jobType: {
        type: String,
        enum: {
            values: ['full-time', 'part-time', 'contract', 'freelance'],
            message: '${VALUE} is not a valid/supported job type'
        },
        required: [true, 'please choose a gender']
    },
    experienceLevel: {
        type: String,
        required: [true, 'please enter the needed years of experience needed for theis job']
    },
    educationLevel: {
        type: String,
        required: [true, 'please input education level needed to apply']
    },
    datePosted: {
        type: String,
        required: true
    },
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employer',
        required: true
    },
    jobStatus: {
        type: String,
        enum: {
            values: ['hiring', 'closed'],
            message: '${VALUE} is not a valid job status'
        },
        default: 'hiring'
    }
},
{ timestamps: true}
)

JobSchema.pre('save', async function() {
    if(!this.isModified('datePosted')) return
    this.datePosted = this.createdAt
}) 

module.exports = mongoose.model('Job', JobSchema)