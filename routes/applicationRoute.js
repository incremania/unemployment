const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController')
const { authenticateUser } = require('../middleware/authenticateUser')
const { authorizeUser } = require('../middleware/authorizeUser')


router
.post('/create', authenticateUser, authorizeUser('jobseeker'),  applicationController.create )
// .post('/login', jobseekerController.login )


module.exports = router;
