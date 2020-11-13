const { Router } = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const router = Router();

// router.get('/register', authController.register_get);
router.post('/register', authController.register_post);
// router.get('/login', authController.login_get);
router.post('/login',  passport.authenticate('local', { session : false }), authController.login_post);
router.get('/logout',  passport.authenticate('jwt', { session : false }), authController.logout_get);


module.exports = router;