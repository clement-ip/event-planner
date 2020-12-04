const mongoose = require('mongoose')
const mongoosastic = require('mongoosastic')
//schema
const Schema = mongoose.Schema;
const EventSchema = new Schema({
    name: {type: String, es_indexed: true},
    description: String,
    location_city: String,
    location_country: String,
    location_address: String,
    requirements: String,
    host_email: String,
    host_phone_number: String,
    host_id: String,
    host_name: String,
    host_organization: String,
    tags: String,  //change to [String] and maybe implement react-tag-input
    start_date_time: Date,
    end_date_time: Date
});

EventSchema.plugin(mongoosastic, {
    hosts: [
      'localhost:9200'
    ]
  });

//Model
const Event = mongoose.model("event", EventSchema);

module.exports = Event;