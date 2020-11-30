const { Router } = require('express');
const passport = require('passport');
const commentController = require('../controllers/commentController');

const router = Router();

router.get('/comment/:id', commentController.commentid_get);
router.post('/comment/:id', commentController.commentid_post);


module.exports = router;