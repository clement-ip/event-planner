const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { secretOrKey } = require('./keys');
const User = require('../model/User');

// Extract JWT cookies from request
const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies){
        token = req.cookies['access_token'];
    }
    return token
}

// Authorizing protected routes using JWT tokens
passport.use(new JwtStrategy({
    jwtFromRequest : cookieExtractor,
    secretOrKey : secretOrKey
}, (payload, done) => {
    // Search user by primary key found in payload subject
    User.findById({_id : payload.sub}, (err, user) => {
        if(err)
            return done(err, false)
        if(user)
            return done(null, user);
        else
            return done(null, false);
    });
}));


// Local strategy used to authenticate users when logging in with email and password
passport.use(new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password'
}, (username, password, done) => {
    console.log(username)
    User.findOne({ email : username}, (err, user)=> {
        // Something went wrong with database
        if(err)
            return done(err);
        // if no user with that email exists
        if(!user)
            return done(null, false);
        // Check if password is correct
        return user.comparePassword(password, done);
    });
}));