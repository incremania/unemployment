const Jobseeker = require('../models/JobseekerModel')
const { attachCookiesToRes } = require('../utils/token')


module.exports.register = async ( req, res ) => {
    try {
        const jobseeker = await Jobseeker.create(req.body);
        attachCookiesToRes(jobseeker, res)
        res.status(201).json({ jobseeker })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message})
    }
}

module.exports.login = async ( req, res ) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ error: 'please input your email and password'})
        }

        const jobseeker = await Jobseeker.findOne({ email });
        if(!jobseeker) {
            return res.status(404).json({ error: 'user not found'})
        }
        const validUser = await jobseeker.comparePassword(password)
        if(!validUser) {
            return res.status(401).json({ error: 'incorrect password'})
        }
        attachCookiesToRes(jobseeker, res)
        res.status(200).json({ jobseeker })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message})
    }
}

