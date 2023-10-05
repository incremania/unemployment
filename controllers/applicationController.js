const Application = require('../models/ApplicationModel');
const Job = require('../models/JobModel')
module.exports.create = async (req, res ) => {
    try {
        const { job, cv } = req.body
        if(!job) {
            return res.status(404).json({ error: "no job in the body"})
   
        }
        const foundJob = await Job.findOne({ _id: job})
        if(!foundJob) {
            return res.status(404).json({ error: "no job found"})
        }
        console.log(req.body.jobSeeker)
      
        const application = await Application.create({
            job: foundJob._id,
            cv,
            jobSeeker: req.user.userId
        })

        res.status(201).json({ application })


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message})
    }
}