const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    message: {
        type: String
    },
    time : { 
        type : Date, 
        default: Date.now
    }
});

module.exports = Comment = mongoose.model('comment', commentSchema);