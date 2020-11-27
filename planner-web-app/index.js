const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000

const app = express();
const cors = require('cors');
const comment = require('./src/components/models/comment');
const Event = require('./src/components/models/Event');
const profile = require('./src/components/models/profile');
const hosting_events = require('./src/components/models/hosting_events');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require("path");

app.use(express.static(path.join(__dirname, "build")));

app.use(bodyParser.urlencoded({
    extended: true
 }));

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());

app.get('/comment/:id', (req, res) => {
  const id = req.params.id;
  comment.find({eventId: id}, function(err,result) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.status(200).send(result);
    }
  })
});

app.post('/comment/:id', (req, res) => {
  const data = req.body;
  const id = req.params.id;
 
  data.eventId = id; //add something

  // const mongooseObject = commentsCollectionMap[id];
  const newComment = new comment(data);
  newComment.save((error) => {
    if (error) {
      res.status(500).json({msg: 'Error'});
    }
    else {
      res.status(200).json({
        msg: 'Received data: ', data
      })
    }
  })
});

app.get('/getAllCalEvents', (req, res) =>{

  Event.find({ })
      .then((data) => {
          // console.log('Data: ', data);
          res.status(200).json(data);
      })
      .catch((error)=>{
          console.log("Error: ", error);
      })

});

app.get('/events', (req, res) => {
  Event.find({}, function(err, result) {
      if (err) {
          res.status(500).send(err);
      }
      else {
          res.status(200).send(result);
      }
  })
});

//test route
app.get('/name',(req, res) => {
  const data = {
      username: 'corey',
      age: 23
  };
  res.json(data);
})

app.post('/saveCalEvent',(req, res) => {
  console.log('Body:', req.body);
  const data = req.body;
  const newEvent = new Event(data);
  
  newEvent.save((error, data) => {
      if (error) {
          res.status(500).json({msg: "Server error when attempting to save."})
          return;
      }
      // commentsCollectionMap[data.id] = mongoose.model("Comments_" + data.id, comment.commentSchema);
      // commentsCollectionMap[data.id].createCollection().then(function(collection) {
      //   console.log('Collection is created!');
      // })
      // .catch(error => console.log(error.message));
      return res.status(200).json({
          msg: "We received the data"
      });
  });
});

app.delete('/deleteCalEvent', (req,res)=>{
   console.log('DELETE REQ');
   console.log(req.body);
   console.log(req.body.id);
   Event.deleteOne({_id:req.body.id}, function(err){
       if(!err){
           console.log("Deleted event")
       }
       else{
           console.log("Error: ",err)
       }
   });
   comment.deleteOne({eventId:req.body.id}, function(err){
    if(!err){
        console.log("Deleted comments associated with event")
    }
    else{
        console.log("Error: ",err)
    }
});
});

// Profile stuff
app.get('/profile', (req, res) =>{

  profile.find({ })
    .then((data) => {
        console.log('Data: ', data);
        res.status(200).json(data);
    })
    .catch((error)=>{
        console.log("Error: ", error);
    })

});

app.get('/hosting_events', (req, res) =>{
hosting_events.find({ })
    .then((data) => {
        console.log('Data: ', data);
        res.status(200).json(data);
    })
    .catch((error)=>{
        console.log("Error: ", error);
    })

});

// if (process.env.NODE_ENV === 'production') {
//   // Exprees will serve up production assets
//   app.use(express.static(path.join(__dirname, 'build')));

//   // Express serve up index.html file if it doesn't recognize route
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
//   });
// }

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
})

mongoose.connect("mongodb+srv://470User:CMPT470@470cluster.tajiy.mongodb.net/userdata?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("Mongoose is connected");
})

io.on('connection', (socket) => {
  console.log('A user has connected');
  socket.on('Comment', (msg) => {
    io.emit('Comment', msg);
  });
});

http.listen(port, () => {
  console.log(`Listening on *:${port}`);
});


