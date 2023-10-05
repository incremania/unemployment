const { Schema, default: mongoose } = require('mongoose');

const ApplicationSchema = new Schema({
   job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
   },
   jobSeeker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jobseeker',
    required: true
   },
   cv: {
    type: String,
    required: true,
   }
},
{timestamps: true}
)



module.exports = mongoose.model('Application', ApplicationSchema)