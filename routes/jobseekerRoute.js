const express = require('express');
const router = express.Router();
const jobseekerController = require('../controllers/jobseekerController')

router
.post('/register', jobseekerController.register )
.post('/login', jobseekerController.login )


module.exports = router;
