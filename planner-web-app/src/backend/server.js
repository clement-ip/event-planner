const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Comment = require('../components/models/comment')
const port = process.env.PORT || 5000

const app = express();
const cors = require('cors');
const comment = require('../components/models/comment');
const Event = require('../components/models/Event');
const profile = require('../components/models/profile');
const hosting_events = require('../components/models/hosting_events');
const http = require('http').createServer(app);
const io = require('socket.io')(http);


app.use(bodyParser.urlencoded({
    extended: true
 }));

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send({ message: "Home" });
  });

app.get('/comment', cors(), (req, res) => {
    comment.find({}, function(err,result) {
      if (err) {
        res.send(err);
      }
      else {
        res.send(result);
      }
    })
});

app.post('/comment', (req, res) => {
    const data = req.body;
    const newComment = new Comment(data);
    newComment.save((error) => {
      if (error) {
        res.status(500).json({msg: 'Error'});
      }
      else {
        res.json({
          msg: 'Received data: ', data
        })
      }
    })
});

app.get('/getAll', (req, res) =>{

    Event.find({ })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error)=>{
            console.log("error");
        })

});

app.get('/events', cors(), (req, res) => {
    Event.find({}, function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
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

app.post('/save',(req, res) => {
    console.log('Body:', req.body);
    const data = req.body;
    const newEvent = new Event(data);
    //.save
    newEvent.save((error) => {
        if (error) {
            res.status(500).json({msg: "Server error when attempting to save."})
            return;
        }
        return res.json({
            msg: "We received the data"
        });
    });
});

// Profile stuff
app.get('/profile', (req, res) =>{

  profile.find({ })
      .then((data) => {
          console.log('Data: ', data);
          res.json(data);
      })
      .catch((error)=>{
          console.log("error");
      })

});

app.get('/hosting_events', (req, res) =>{
  hosting_events.find({ })
      .then((data) => {
          console.log('Data: ', data);
          res.json(data);
      })
      .catch((error)=>{
          console.log("error");
      })

});

mongoose.connect("mongodb+srv://470User:CMPT470@470cluster.tajiy.mongodb.net/userdata?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("Mongoose is connected")
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


