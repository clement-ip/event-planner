const User = require('../model/User');
const passport = require('passport');
const passportConfig = require('../config/passport');
const JWT = require('jsonwebtoken');
const { secretOrKey } = require('../config/keys');


const signToken = userID => {
    return JWT.sign({
        iss: "CCEEH",
        sub: userID
    }, secretOrKey, { expiresIn: "1h"}) ;
}

module.exports.register_get = (req, res) => {
    res.send("register_get");
}

module.exports.register_post = (req, res) => {
    const { name, email, password } = req.body;
    User.findOne({email}, (err, user) => {
        if(err)
            res.status(500).json({message : {masgBody : "Error1 has occured", msgError : true}});
        if(user)
            res.status(400).json({message : {masgBody : "Email is already taken", msgError : true}});
        else {
            const newUser = new User({ name, email, password});
            newUser.save(err => {
                if(err)
                    res.status(500).json({message : {masgBody : "Error has occured", msgError : true}});
                else
                    res.status(201).json({message : {masgBody : "Account successfully created", msgError : false}});
            });
        }
    })
}

module.exports.login_get = (req, res) => {
    res.send("login_get");
}

module.exports.login_post = (req, res) => {
    /*
        passport.authenticate in authRoutes.js takes the req and res and adds onto them
        like req.isAuthenticated() and req.user
    */
    if(req.isAuthenticated()) {
        const { _id, email } = req.user; 
        const token = signToken(_id);
        res.cookie('access_token', token, {httpOnly : true, sameSite : true});
        res.status(200).json({isAuthenticated : true, user: { email }});
    }
}

module.exports.logout_get = (req, res) => {
    res.clearCookie('access_token');
    res.json({ user: { email : "" }, success : true});
}

