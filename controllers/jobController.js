const Job = require('../models/JobModel');

module.exports.create = async ( req, res ) => {
    try {
        console.log(req.user)
        req.body.employer = req.user.userId
        const job = await Job.create(req.body);
        
        res.status(200).json({ job })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message})
    }
}