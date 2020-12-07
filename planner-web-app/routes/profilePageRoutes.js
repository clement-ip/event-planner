const { Router } = require('express');
const profileController = require('../controllers/profilePageController');
const passport = require('passport');
// const cors = require('cors');

const router = Router();

// Get Another User's Profile Page
router.get('/profile/:id', passport.authenticate('jwt', { session : false }),
                profileController.profile_get);

// Edit User Profile Info
router.post('/profile/', passport.authenticate('jwt', { session : false }),
                profileController.profile_edit);

// Create User Profile Info
router.post('/profile_create', passport.authenticate('jwt', { session : false }),
                profileController.profile_create);

// Delete User Profile Info
router.post('/profile_delete', passport.authenticate('jwt', { session : false }),
                profileController.profile_delete);

router.put('/addEventToUser', passport.authenticate('jwt', { session : false }),
                    profileController.addEventToUserProfile);

module.exports = router;