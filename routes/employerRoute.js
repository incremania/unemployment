const express = require('express');
const router = express.Router();
const employerController = require('../controllers/employerController')

router
.post('/register', employerController.register )
.post('/login', employerController.login )


module.exports = router;
