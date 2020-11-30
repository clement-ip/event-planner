const Comment = require('../model/Comment');

// Get all comments under specific event ID
module.exports.commentid_get = (req, res) => {
    console.log('Trying to get comment by eventID');
    const eventId = req.params.id;
    // Need to error handle better 
    Comment.find({ eventId }, function(err,result) {
        if (err)
            res.status(500).send(err);
        else 
            res.status(200).send(result);
      })
}

module.exports.commentid_post = (req, res) => {
    console.log('Trying to save comment')
    const data = req.body;

    const newComment = new Comment(data);
    newComment.save(err => {
        if(err)
            res.status(500).json({ msg : 'Error'});
        else
            res.status(200).json({ msg : 'Recieved data: ', data });
    })
}