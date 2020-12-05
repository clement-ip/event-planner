const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Credits: https://stackoverflow.com/a/13899011
function tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }

var currentDate = new Date();
const splitDate = currentDate.toString().split(" ");
const time = Array(splitDate[4].split(":")[0], splitDate[4].split(":")[1]).join(":");
const newSplitDate = Array(splitDate[0], splitDate[1], splitDate[2], splitDate[3], tConvert(time));
const joinedDate = newSplitDate.join(" ");

const commentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    time : {
        type : String,
        default: joinedDate
    },
    eventID : {
        type: String,
        required: true
    },
    topLevel : {
        type: Boolean,
        required: true
    },
    replyLevel : {
        type: Boolean,
        required: true
    },
    topLevelID : {
        type: String,
        required: false
    }
});

module.exports = Comment = mongoose.model('comment', commentSchema);
// exports.commentSchema = commentSchema;
