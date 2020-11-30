const { Router } = require('express');
const passport = require('passport');
const commentController = require('../controllers/commentController');

const router = Router();

// Need to add passport jwt once front end is successful
router.get('/comment/:id', commentController.commentid_get);
router.post('/comment', commentController.commentid_post);


module.exports = router;