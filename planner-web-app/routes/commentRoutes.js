const { Router } = require('express');
const passport = require('passport');
const commentController = require('../controllers/commentController');

const router = Router();

// Need to add passport jwt once front end is successful
router.get('/comment/:eventID', commentController.commentid_get);
router.post('/comment', commentController.commentid_post);
router.delete('/comment/:commentID', commentController.commentid_delete);
router.get('/comment/:commentID/replies', commentController.commentid_replies_get)

module.exports = router;