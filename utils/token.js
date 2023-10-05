const jwt = require('jsonwebtoken')


const createToken = (id) => {
    try {
        return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: '3d'
        })
    } catch (error) {
        console.log(error)
    }
}

const attachCookiesToRes = (employer, res) => {
const token = createToken(employer._id);
res.cookie('jwt', token, {
    maxAge: 3 * 24 * 60 * 60 * 500 * 2,
    signed: true,
    httpOnly: true
} )
}


module.exports = {
    attachCookiesToRes
}