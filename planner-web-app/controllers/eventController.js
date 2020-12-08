const Event = require('../model/Event');

module.exports.getSingleEvent = (req, res) => {
    Event.findById(req.params.id, (err, eventData) => {
        if(err)
            res.status(500).json({ message : {
                    msgBody : "Error has occurred", msgError : true },
                    eventData : null
                });
        else
            res.status(200).json({ message : {
                    msgBody : "Successfully retrieved event", msgError : false },
                    eventData
                });
    });
}

module.exports.getAllEvents = (req, res) => {
    Event.find({}, (err, eventsData) => {
        if(err)
            res.status(500).json({ message : {
                    msgBody : "Error has occurred", msgError : true },
                    eventsData : null
                });
        else
            res.status(200).json({ message : {
                    msgBody : "Successfully retrieved event", msgError : false },
                    eventsData
                });
    });
}

module.exports.saveEvent = (req, res) => {
    const eventData = req.body;
    const newEvent = new Event(eventData);
    newEvent.save((err, data) => {
        if(err)
            res.status(500).json({ message : {
                    msgBody : "Error has occurred", msgError : true}
                });
        else
            res.status(200).json({ message : {
                    msgBody : "Event successfully saved,"+ newEvent._id, msgError : false, newEvent_ID: newEvent._id}
                });
    })
}

module.exports.deleteEvent = (req, res) => {
    Event.deleteOne({ _id : req.body.id }, (err, response) => {
        if(err)
            res.status(500).json({ message : {
                    msgBody : "Error has occurred", msgError : true }
                });
        else
            res.status(200).json({ message : {
                    msgBody : "Event successfully deleted", msgError : false }
                });
    })
}

module.exports.searchEvent = (req, res) => {
    Event.search({ query_string: { query: req.params.name }}, (err, response) => {
        if(err)
            res.status(500).json({ message : {
                    msgBody : "Error has occurred", msgError : true },
                    eventsData : null
                });
        else
            var data = response.hits.hits;
            res.status(200).json({ message : {
                    msgBody : "Successfully retrieved event", msgError : false },
                    data
                });
    });
}

module.exports.getAllEvents = (req, res) => {
    Event.find({}, (err, eventsData) => {
        if(err)
            res.status(500).json({ message : {
                    msgBody : "Error has occurred", msgError : true },
                    eventsData : null
                });
        else
            res.status(200).json({ message : {
                    msgBody : "Successfully retrieved event", msgError : false },
                    eventsData
                });
    });
}

module.exports.editEvent = (req, res) => {
    console.log("new event", req.body);
    Event.updateOne({_id: req.body.eventID},
        {
            $set: {
                host_name: req.body.host_name,
                description: req.body.description,
                host_email: req.body.host_email,
                host_id: req.body.host_id,
                name: req.body.name,
                start_date_time: req.body.start_date_time,
                end_date_time: req.body.end_date_time
            }
        }, (err, response) => {
            if (err)
                res.status(500).json({
                    message: {
                        msgBody: "Error has occurred", msgError: true
                    }
                });
            else
                res.status(200).json({
                    message: {
                        msgBody: "Event successfully updated", msgError: false
                    }
                });
        });
}

module.exports.addAttendeeToEvent = (req, res) =>{
    console.log(req.body);
    Event.findOneAndUpdate({_id: req.body.event_id}, {$addToSet: {attendee_id : req.body.user_id} }, (err,result)=>{
        if (err) {
            return res.status(500).json({ status:'Error',
                msg:"Unable to add attendee to event.",
                error:err.message
            });
        }
        else if (!result) {
            console.log('Bad Request: Invalid Access.')
            return res.status(401).json({ status:'Error',
                msg:"Bad Request: Invalid Access.",
            });
        }
        console.log('Attendee successfully Added to an Event!')
        return res.status(200).send({
                status:'Succeeded',
                msg: "Successfully added Attendee to event data",
                data: result
            }
        );
    });
}