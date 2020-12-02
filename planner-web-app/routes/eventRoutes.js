const { Router } = require('express');
const passport = require('passport');
const eventController = require('../controllers/eventController');

const router = Router();

router.get('/getSingleEvent/:id', eventController.getSingleEvent);
router.get('/getAllEvents', eventController.getAllEvents);
router.post('/saveEvent', eventController.saveEvent);
router.delete('/deleteEvent', eventController.deleteEvent);

module.exports = router;