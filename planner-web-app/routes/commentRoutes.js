const { Router } = require('express');
const passport = require('passport');
const commentController = require('../controllers/commentController');

const router = Router();

// Need to add passport jwt once front end is successful
router.get('/comment/:eventID', passport.authenticate('jwt', { session : false }), commentController.commentid_get);
router.post('/comment', passport.authenticate('jwt', { session : false }), commentController.commentid_post);
router.delete('/comment/:commentID', passport.authenticate('jwt', { session : false }), commentController.commentid_delete);
router.get('/comment/:commentID/replies', passport.authenticate('jwt', { session : false }), commentController.commentid_replies_get)

module.exports = router;