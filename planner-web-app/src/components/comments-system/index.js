const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Comment = require('./models/comment');
const port = process.env.PORT || 5000

const app = express();
const cors = require('cors');
const comment = require('./models/comment');
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

mongoose.connect("***REMOVED***?retryWrites=true&w=majority", {
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
