const Profile = require('../model/Profile');
const passport = require('passport');
const { findOneAndDelete } = require('../model/Profile');

module.exports.profile_get = (req, res) => {
    Profile.findOne({userID: req.params.id}, function(err, result) {
      if (err) {
        return res.status(500).json({status:'Error', msg:"Error: Cannot grab profile.",
                                        error:err.message
                });
      }
      else {
        return res.status(200).send({
                    msg: "Successfully gotten profile data",
                    data: result
               });
      }
    })
}

module.exports.profile_edit = (req, res) => {
    const filter = {userID: req.body.userID, email:req.body.email};
    console.log(req.body)
    console.log('User ', filter.email, ' ', filter.userID , ' requesting to edit their page.');

    Profile.findOneAndUpdate(filter, {$set:req.body}, {new:true}, (err,result)=>{
        if (err) {
            return res.status(500).json({ status:'Error',
                msg:"Unable to edit profile info.",
                error:err.message
            });
        }
        else if (!result) {
            console.log('Bad Request: Invalid Access.')
            return res.status(401).json({ status:'Error',
                msg:"Bad Request: Invalid Access.",
            });
        }
        console.log('User ', filter.email, ' ', filter.userID , ' successfully Edited their page!')
        return res.status(200).send({
            msg: "Successfully gotten profile data",
            data: result
        }
        );
    })
}

module.exports.profile_create = (req,res) =>{
    console.log('Profile Page Creation:', req.body);
    const newProfile = new Profile(req.body, {_id: false});

    newProfile.save((err, data) => {
        if (err) {
            return res.status(500).json({status: "Error", 
                msg: "Server error when attempting to create profile.",
                error: err.message
            });
        }
        return res.status(200).send(data);
    });
}

module.exports.profile_delete = (req,res) =>{
    const filter = {userID: req.body.userID, email:req.body.email};
    console.log('User ', filter.email, filter.userID, ' requesting to delete their page.');

    findOneAndDelete(filter,(err, data) => {
        if (err) {
            return res.status(500).json({
                status: "Error",
                msg: "Server error when attempting to delete profile.",
                error: err.message
            });
        }
        return res.status(200).send(data);
    });
}