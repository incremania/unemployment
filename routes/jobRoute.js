const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { authenticateUser } = require('../middleware/authenticateUser')
const { authorizeUser } = require('../middleware/authorizeUser')

router
.post('/create', authenticateUser, authorizeUser('employer'), jobController.create )
// .post('/login', employerController.login )


module.exports = router;


// {
//     "firstName": "smith",
//     "lastName": "will",
//     "cv": "string",
//     "yearsOfExperience": "string",
//     "phoneNumber": "string",
//     "gender": "male",
//     "highestQualifiication": "string",
//     "countryCode": "string",
//     // "jobType": "fulltime",
//     "jobType": "hybrid",
//     "email": "okiki3@mail.com",
//     "password": "okikiki",
//     "location": "string",
//     "nationality": "string",
//     "dob": "string",
//     "numOfEmployees": "string",
//     "address": "string",
//     "industry": "string",
//     "typeOfEmployer": "direct employer",
//     "companyName": "string",
//     "position": "c-level"

// }


// {
//     "companyName": "string",
//     "jobTitle": "string",
//     "jobDescription": "string",
//     "location": "string",
//     "salary": "string",
//     "industry": "string",
//     "jobType": "contract",
//     "educationLevel": "string",
//     "experienceLevel": "string",
//     "datePosted": "string",
//     "email": "okiki@mail.com",
//   "password": "okikiki"
// }