require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { appNotFound } = require('./middleware/appNotFound')
const jobseekerRoute = require('./routes/jobseekerRoute')
const employerRoute = require('./routes/employerRoute')
const jobRoute = require('./routes/jobRoute')
const applicationRoute = require('./routes/applicationRoute')

const cookieParser = require('cookie-parser')



// connect to database
const StartDb = async() => {
    await mongoose.connect('mongodb://localhost:27017/unemployment', {
        family: 4
    })
}

// middleware
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use('/seeker', jobseekerRoute)
app.use('/employer', employerRoute)
app.use('/job', jobRoute)
app.use('/application', applicationRoute)



app.use(appNotFound)


app.listen(3000, () => {
    console.log('listening on port 3k')
})

StartDb()