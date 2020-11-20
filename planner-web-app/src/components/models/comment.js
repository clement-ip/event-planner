const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var currentDate = new Date();
const splitDate = currentDate.toString().split(" ");
const time = Array(splitDate[4].split(":")[0], splitDate[4].split(":")[1]).join(":");
const newSplitDate = Array(splitDate[0], splitDate[1], splitDate[2], splitDate[3], time);
const joinedDate = newSplitDate.join(" ");

const commentSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    message: {
        type: String
    },
    time : { 
        type : String, 
        default: joinedDate
    }
});

module.exports = Comment = mongoose.model('comment', commentSchema);