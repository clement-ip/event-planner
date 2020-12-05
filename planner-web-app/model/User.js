const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password : {
        type: String,
        required: true,
        minlength: 6
    },
});

userSchema.pre('save', function(next){
    // If password is modified no need to hash
    // if(this.isModified('password'))
    //     return next();
    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            if(err)
                return next(err);
            this.password = hash;
            next();
        });
    })
});

userSchema.methods.comparePassword = function(password,cb){
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if(err)
            return cb(err);
        else
            if(!isMatch)
                return cb(null, isMatch);
            return cb(null, this);
    })
}

const User = mongoose.model('user', userSchema);

module.exports = User;
