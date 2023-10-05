const jwt = require('jsonwebtoken');
const Employer = require('../models/EmployerModel');

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.signedCookies.jwt;
    if (!token) {
      return res.status(401).json({ error: 'Token not found' });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const employer = await Employer.findOne({ _id: payload.id });

    if (!employer) {
      req.user = { userId: payload.id, role: 'jobseeker' };
    } else {
      req.user = { userId: payload.id, role: 'employer' };
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  authenticateUser,
};
