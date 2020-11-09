let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hostingEvents = new Schema({
    event_name:{
        type: String,
        required: true
    },
    organization_name:{
        type: String,
        required: true
    },
    topic:{
        type: String,
        required: true
    },
    about_event:{
        type: String,
        required: false
    },
    contact_email:{
        type: String,
        required: true
    },
    contact_phone_num:{
        type: String,
        required: false
    },
    duration:{
        type: String,
        required: false
    },
    country:{
        type: String,
        required: false
    },
    city:{
        type: String,
        required: false
    },
    location:{
        type: String,
        required: true
    },
});

module.exports = Profile = mongoose.model('hosting_events', hostingEvents);