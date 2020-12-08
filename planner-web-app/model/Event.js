const mongoose = require('mongoose')
const mongoosastic = require('mongoosastic')
//schema
const Schema = mongoose.Schema;
const EventSchema = new Schema({
    name: {
      type: String,
      required: true, 
      es_indexed: true
    },
    description: {
      type: String,
      required: true,
    },
    // location_city: String,
    // location_country: String,
    // location_address: String,
    // requirements: String,
    host_email: {
      type: String,
    },
    // host_phone_number: String,
    // host_id: String,
    host_name: {
      type: String,
      required: true,
    },
    // host_organization: String,
    // tags: String,  //change to [String] and maybe implement react-tag-input
    start_date_time: {
      type: Date,
      required: true,
    },
    end_date_time: {
      type: Date,
      required: true,
    },
    sessionAccessKey: {
      type: String
    }
});

EventSchema.plugin(mongoosastic, {
    hosts: [
      'localhost:9200'
    ]
  });

//Model
const Event = mongoose.model("event", EventSchema);

module.exports = Event;