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
    host_email: {
      type: String,
    },
    host_name: {
      type: String,
      required: true,
    },
    tags: String,  //change to [String] and maybe implement react-tag-input
    start_date_time: {
      type: Date,
      required: true,
    },
    end_date_time: {
      type: Date,
      required: true,
    },
    hostID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: false
    },
    attendee_IDs:{
        type:Array,
        required: false,
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