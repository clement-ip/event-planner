const { Router } = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const cors = require('cors');

const router = Router();

router.get('/register', authController.register_get);
router.post('/register', authController.register_post);
router.get('/login', cors(), authController.login_get);
router.post('/login',  passport.authenticate('local', { session : false }), authController.login_post);
router.get('/logout',  passport.authenticate('jwt', { session : false }), authController.logout_get);
router.get('/authenticated',  passport.authenticate('jwt', { session : false }), authController.authenticated_get);


module.exports = router;