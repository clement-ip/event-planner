const express = require('express')

const router = express.Router();
const cors = require('cors')
const Event = require('../models/Event');

router.use(cors());
router.get('/getAll', (req, res) =>{

    Event.find({ })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error)=>{
            console.log("error");
        })

});

//test route
router.get('/name',(req, res) => {
    const data = {
        username: 'corey',
        age: 23
    };
    res.json(data);
})

router.post('/save',(req, res) => {
    console.log('Body:', req.body);
    const data = req.body;
    const newEvent = new Event(data);
    //.save
    newEvent.save((error) => {
        if (error) {
            res.status(500).json({msg: "Server error when attempting to save."})
            return;
        }
        return res.json({
            msg: "We received the data"
        });
    });
});

module.exports = router;