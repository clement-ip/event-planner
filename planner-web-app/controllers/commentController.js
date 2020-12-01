const Comment = require('../model/Comment');

// Get all comments under specific event ID
module.exports.commentid_get = (req, res) => {
    console.log('Trying to get comment by eventID');
    const eventID = req.params.eventID;
    // Need to error handle better 
    Comment.find({ eventID, replyLevel:false }, function(err,result) {
        if (err)
            res.status(500).json({ message : { msgBody : "Error has occured", msgError : true }, data : null});
        else 
            res.status(200).send({ message : { msgBody : "Successfully retrieved comments under Event ID " + eventID, msgError : false }, data : result});
      })
}

// Create a comment
module.exports.commentid_post = (req, res) => {
    console.log('Trying to save comment')
    const data = req.body;

    const newComment = new Comment(data);
    newComment.save(err => {
        if(err)
            res.status(500).json({ message : { msgBody : "Error has occured", msgError : true }});
        else
            res.status(200).json({ message : { msgBody : "Comment successfully created", msgError : false }});
    })
}

// Delete a comment
module.exports.commentid_delete = (req, res) => {
    console.log('Trying to delete comment')
    const commentID = req.params.commentID;
    console.log("CommentID: ", commentID);
    Comment.deleteMany({ $or: [{_id:commentID}, {topLevelID: commentID}]}, function(err, result){
        if (err)
            res.status(500).json({ message : { msgBody : "Error has occured", msgError : true }, data : null});
        else
            res.status(200).send({ message : { msgBody : "Successfully deleted comment ID " + commentID, msgError : false }, data : result});
        })
}

// Get replies of a comment
module.exports.commentid_replies_get = (req, res) => {
    console.log('Trying to get replies of a comment')
    const commentID = req.params.commentID;

    Comment.find({ topLevelID:commentID, replyLevel:true }, function(err,result) {
        if (err)
            res.status(500).json({ message : { msgBody : "Error has occured", msgError : true }, data : null});
        else
            res.status(200).send({ message : { msgBody : "Successfully retrieved replies of comment under comment ID " + commentID, msgError : false }, data : result});
      })
}