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
    },
    host_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: false
    },
    attendee_id:{
        type:Array,
        required: false,
    }
});

EventSchema.plugin(mongoosastic, {
    hosts: [
    //   'localhost:9200'
      `${process.env.REACT_APP_MONGOOSASTIC}`
    ]
  });

//Model
const Event = mongoose.model("event", EventSchema);

module.exports = Event;