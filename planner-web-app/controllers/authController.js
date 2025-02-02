const User = require('../model/User');
const passport = require('passport');
const passportConfig = require('../config/passport');
const JWT = require('jsonwebtoken');
const { secretOrKey } = require('../config/keys');

const API_ADDR = process.env.REACT_APP_NODE_ENV === 'production' ?
                    process.env.REACT_APP_CORS_API_ADDR_PRODUCTION :
                    process.env.REACT_APP_CORS_API_ADDR_DEV;

const signToken = userID => {
    return JWT.sign({
        iss: "CCEEH",
        sub: userID
    }, secretOrKey, { expiresIn: "1h" }) ;
}

module.exports.register_get = (req, res) => {
    res.json("register_get");
}

module.exports.register_post = (req, res) => {
    const { name, email, password } = req.body;
    User.findOne({email}, (err, user) => {
        if(err)
            res.status(500).json({message : {
                    msgBody : "Error has occurred", msgError : true }
                });
        if(user)
            res.status(400).json({message : {
                    msgBody : "Email is already taken", msgError : true }
                });
        else {
            const newUser = new User({ name, email, password});
            newUser.save(err => {
                if(err)
                    res.status(500).json({message : {
                        msgBody : "Error has occurred", msgError : true }
                    });
                else
                    res.status(201).json({message : {
                        msgBody : "Account successfully created", msgError : false }
                    });
            });
        }
    })
}

module.exports.login_get = (req, res) => {
    // res.json("login_get");
    //res.redirect('http://localhost:5000/');
    // res.redirect('http://35.247.19.51');
    res.redirect(`${API_ADDR}`)
}

module.exports.login_post = (req, res) => {
    /*
        passport.authenticate in authRoutes.js takes the req and res and adds onto them
        like req.isAuthenticated() and req.user
    */
    if(req.isAuthenticated()) {
        const { _id, email, name } = req.user;
        const token = signToken(_id);

        //res.cookie('access_token', token, { httpOnly : true, sameSite : true, domain : '35.247.19.51' });
        if (process.env.REACT_APP_CORS_API_ADDR_DEV === 'production') {
            res.cookie('access_token', token, { httpOnly : true, sameSite : true, domain : `${API_ADDR}` });
            res.status(200).json({ isAuthenticated : true, user : { email: email, userID:_id, name: name } });
        }
        else {
            res.cookie('access_token', token, { httpOnly : true, sameSite : true });
            res.status(200).json({ isAuthenticated : true, user : { email: email, userID:_id, name: name } });
        }

    }
}

module.exports.logout_get = (req, res) => {
    res.clearCookie('access_token');
    res.json({ user: { email : "" }, success : true});
}

// Sync up the backend and front end to get cookie if the browser is closed
module.exports.authenticated_get = (req, res) => {
    const { _id, email, name } = req.user;
    res.status(200).json({ isAuthenticated : true, user : { email: email, userID:_id, name: name } });
}

