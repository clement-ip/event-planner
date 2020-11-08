


const mongoose = require('mongoose')


//schema
const Schema = mongoose.Schema;
const EventSchema = new Schema({
    name: String,
    description: String,
    start_date: Date,
    end_date: Date
});


//Model
const Event = mongoose.model("event", EventSchema);

module.exports = Event;