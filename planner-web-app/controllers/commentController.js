const Comment = require('../model/Comment');

// Get all comments under specific event ID
module.exports.commentid_get = (req, res) => {
    console.log('Trying to get comment by eventID');
    const eventID = req.params.eventID;
    // Need to error handle better 
    Comment.find({ eventID }, function(err,result) {
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

    Comment.deleteOne({_id:commentID}, function(err, result){
        if (err)
            res.status(500).json({ message : { msgBody : "Error has occured", msgError : true }, data : null});
        else
            res.status(200).send({ message : { msgBody : "Successfully deleted comment ID " + commentID, msgError : false }, data : result});
        })
}