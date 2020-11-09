let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    about:{
        type: String,
        required: false
    },
    interests:{
        type: String,
        required: false
    },
    occupation:{
        type: String,
        required: false
    },
    skills:{
        type: String,
        required: false
    },
    organization:{
        type: String,
        required: false
    },
    job_title:{
        type: String,
        required: false
    },
});

module.exports = Profile = mongoose.model('profile', profileSchema);