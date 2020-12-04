const { Router } = require('express');
const passport = require('passport');
const eventController = require('../controllers/eventController');
const Event = require('../model/Event')

const router = Router();

Event.createMapping(function(err, mapping) {
    if (err) {
      console.log('error creating mapping (you can safely ignore this)');
      console.log(err);
    } else {
      console.log('mapping created!');
      console.log(mapping);
    }
  });

var stream = Event.synchronize();
var count = 0;
stream.on('data', function () {
  count++;
});
stream.on('close', function () {
   console.log("Indexed" + count + " documents");
});
stream.on('error', function (err) {
    console.log(err);
});

router.get('/getSingleEvent/:id', eventController.getSingleEvent);

router.get('/getAllEvents', eventController.getAllEvents);

router.post('/saveEvent', eventController.saveEvent);

router.delete('/deleteEvent', eventController.deleteEvent);

router.put('/editEvent', eventController.editEvent);

router.get('/search/:name', eventController.searchEvent);

module.exports = router;