const { Schema, default: mongoose } = require('mongoose');
const { isEmail } = require('validator')
const bcrypt = require('bcrypt');


const EmployerSchema = new Schema({
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
    nationality: {
        type: String,
        required: [true, 'please select a country']
    },
    address: {
        type: String,
        required: [true, 'please enter a valid address']
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: '${VALUE} is not a valid/supported gender'
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
    position: {
        type: String,
        enum: {
            values: ['c-level', 'senior management', 'middle management', 'junior level'],
            message: '{VALUE} is not supported'
        },
        required: [true, 'please choose position']
    },
    companyName: {
            type: String,
            required: [true, 'please enter company name']
    },
    countryCode: {
        type: String,
        required: [true, 'please enter a country code']
    },
    typeOfEmployer: {
        type: String,
        enum: {
            values: ['direct employer', 'recruitment agency'],
            message: '${VALUE} is not supported'
        },
        required: [true, 'please choose an employment type']
    },
    numOfEmployees: {
        type: String,
        required: [true, 'please provide number of employee']
    }
})

EmployerSchema.pre('save', async function() {
    try {
        if(!this.isModified('password')) return;
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt)
    } catch (error) {
        console.log(error);
    }
})

EmployerSchema.methods.comparePassword = async function(employerPassword) {
    try {
        const isValidPassword = await bcrypt.compare(employerPassword, this.password);
        if(!isValidPassword) {
            throw new Error('invalid password')
        }
        return true
    } catch (error) {
        console.log(error)
    }
}


module.exports = mongoose.model('Employer', EmployerSchema)