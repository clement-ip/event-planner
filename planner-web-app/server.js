const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const comment = require('./model/Comment');
const authRoutes = require('./routes/authRoutes');
const commentRoutes = require('./routes/commentRoutes');
const Event = require('./model/Event');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const corsOptions = {
    origin : 'http://localhost:3000',
    credentials : true
}
app.use(cors(corsOptions));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });


app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

// Port
const port = process.env.PORT || 5000;

// Configure AtlasDB
const { atlasURI } = require('./config/keys');
mongoose.connect(atlasURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => http.listen(port))
    .then(() => console.log(`DB connect and running server on port ${ port }`))
    .catch((err) => console.log(err));


app.use(authRoutes);
app.use(commentRoutes);

const User = require('./model/User');
// const userInput = {
//     name: "Hassan",
//     email: "shali3@sfu.ca",
//     password: "123456"
// }

// const user = new User(userInput);
// user.save((err,document) => {
//     if(err)
//         console.log(err)
//     console.log(document);
// })

app.get('/test', (req, res) => {
    // res.json('pls work');
    res.status(301);
    res.redirect('https://expressjs.com/');
});


// app.post('/comment/:id', (req, res) => {
//     const data = req.body;
//     const id = req.params.id;
   
//     data.eventId = id; //add something
  
//     // const mongooseObject = commentsCollectionMap[id];
//     const newComment = new comment(data);
//     newComment.save((error) => {
//       if (error) {
//         res.status(502).json({msg: 'Error'});
//       }
//       else {
//         res.status(200).json({
//           msg: 'Received data: ', data
//         })
//       }
//     })
//   });

app.get('/getAllEvents', (req, res) =>{
    console.log('IN THE GET CALL');
    Event.find({ })
        .then((data) => {
            console.log('Data: ', data);
            res.status(200).json(data);
        })
        .catch((error)=>{
            console.log("Error: ", error);
        })
});

app.post('/saveEvent',(req, res) => {
    console.log('Body:', req.body);
    const data = req.body;
    const newEvent = new Event(data);

    newEvent.save((error, data) => {
        if (error) {
            res.status(500).json({msg: "Server error when attempting to save."})
            return;
        }
        return res.status(200).json({
            msg: "We received the data"
        });
    });
});

app.delete('/deleteEvent', (req,res)=>{
    console.log('DELETE REQ');
    console.log(req.body);
    console.log(req.body.id);
    Event.deleteOne({_id:req.body.id}, function(err, result){
        if(!err){
            res.status(200).json(result);
            console.log("Deleted event")
        }
        else{
            res.status(500).json({msg: "Server error when attempting to delete."})
            console.log("error",err)
        }
    });
    // comment.deleteOne({eventId:req.body.id}, function(err){
    //     if(!err){
    //         console.log("Deleted comments associated with event")
    //     }
    //     else{
    //         console.log("Error: ",err)
    //     }
    // });
});

app.get('/getSingleEvent/:id', (req, res) =>{
    console.log(req.params.id);
    Event.findById(req.params.id)
        .then((data) => {
            console.log('Data: ', data);
            res.status(200).json(data);
        })
        .catch((error)=>{
            console.log("error");
            //res.redirect('/404');
        })
});

io.on('connection', (socket) => {
    console.log('A user has connected');
    socket.on('Comment', (msg) => {
      io.emit('Comment', msg);
    });
  });
  