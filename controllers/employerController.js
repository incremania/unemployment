const Employer = require('../models/EmployerModel')
const { attachCookiesToRes } = require('../utils/token')


module.exports.register = async ( req, res ) => {
    try {
        const employer = await Employer.create(req.body);
        attachCookiesToRes(employer, res)
        res.status(201).json({ employer })  

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message})
    }
}

module.exports.login = async ( req, res ) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ error: 'please input your email'})
        }

        const employer = await Employer.findOne({ email });
        if(!employer) {
            return res.status(404).json({ error: 'user not found'})
        }
        const validUser = await employer.comparePassword(password)
        if(!validUser) {
            return res.status(401).json({ error: 'incorrect password'})
        }
        attachCookiesToRes(employer, res)
        res.status(200).json({ employer })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message})
    }
}


