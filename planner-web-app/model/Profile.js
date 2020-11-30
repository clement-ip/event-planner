const mongoose = require('mongoose');

const profilePageSchema = new mongoose.Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type:String,
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
    portfolio:{
        type: Object,
        required: false,
    },
    attendingEvents:{
        type: Array,
        required: false,
    },
    hostingEvents:{
        type: Array,
        required: false,
    },
    profilePicture:{
        type: String,
        data: Buffer,
        required: false,
    }
});

const Profile = mongoose.model('profile', profilePageSchema);
module.exports = Profile;