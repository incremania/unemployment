const { Schema, default: mongoose } = require('mongoose');
const { isEmail } = require('validator')
const bcrypt = require('bcrypt');

const JobseekerSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'first name cannot be empty'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'last name cannot be empty'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'please enter your email'],
        validate: [isEmail, 'please enter a valid email address'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'please provide password'],
        minlength: [7, 'password must be greater than 6 characters']

    },
    dob: {
        type: String,
        required: [true, 'age cannot be empty']
    },
    nationality: {
        type: String,
        required: [true, 'please select a country']
    },
    location: {
        type: String,
        required: [true, 'please enter a valid location']
    },
    jobType: {
        type: String,
        enum: {
            values: ['fulltime', 'part time'],
            message: '{VALUE} is not a valid/supported gender'
        },
        required: [true, 'please choose a gender']
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: '{VALUE} is not a valid/supported gender'
        },
        required: [true, 'please choose a gender']
    },
    countryCode: {
        type: String,
        required: [true, 'please enter a country code']
    },
    phoneNumber: {
        type: String,
        required: [true, 'please enter your phone number']
    },
    highestQualifiication: {
        type: String, 
        required:[true, 'please enter Qualification']
    },
    yearsOfExperience: {
        type: String,
        required: [true, 'please choose years of experience']
    },
    cv: {
        type: String,
        required: [true, 'please upload cv to proceed']
    }
})

JobseekerSchema.pre('save', async function() {
    try {
        if(!this.isModified('password')) return;
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt)
    } catch (error) {
        console.log(error);
    }
})

JobseekerSchema.methods.comparePassword = async function(jobSeekerPassword) {
    try {
        const isValidPassword = await bcrypt.compare(jobSeekerPassword, this.password);
        if(!isValidPassword) {
            throw new Error('invalid password')
        }
        return true
    } catch (error) {
        console.log(error)
    }
}


module.exports = mongoose.model('Jobseeker', JobseekerSchema)