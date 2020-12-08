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
                    msgBody : "Event successfully saved", msgError : false }
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
    Event.updateOne({_id: req.body.eventID},
        {
            $set: {
                host_name: req.body.host_name,
                description: req.body.description,
                location_city: req.body.location_city,
                location_country: req.body.location_country,
                location_address: req.body.location_address,
                requirements: req.body.requirements,
                host_email: req.body.host_email,
                host_phone_number: req.body.host_phone_number,
                host_id: req.body.host_id,
                host_organization: req.body.host_organization,
                tags: req.body.tags,
                start_date_time: req.body.start_date_time,
                end_date_time: req.body.end_date_time,
                sessionAccessKey: req.body.sessionAccessKey
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
        })
}