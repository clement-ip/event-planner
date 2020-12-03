const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Event = require('./model/Event');

const authRoutes = require('./routes/authRoutes');
const commentRoutes = require('./routes/commentRoutes');
const eventRoutes = require('./routes/eventRoutes');


// App
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(cookieParser());
app.use(express.json());

// Cors
const corsOptions = {
    origin : 'http://localhost:3000',
    credentials : true
}
app.use(cors(corsOptions));


// Port
const port = process.env.PORT || 5000;

// Configure AtlasDB
const { atlasURI } = require('./config/keys');
mongoose.connect(atlasURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => http.listen(port))
    .then(() => console.log(`DB connect and running server on port ${ port }`))
    .catch((err) => console.log(err));

// Routes
app.use(authRoutes);
app.use(commentRoutes);
app.use(eventRoutes);


app.get('/test', (req, res) => {
    // res.json('pls work');
    res.status(301);
    res.redirect('https://expressjs.com/');
});

// app.get('/getAllEvents', (req, res) =>{
//     console.log('IN THE GET CALL');
//     Event.find({ })
//         .then((data) => {
//             console.log('Data: ', data);
//             res.status(200).json(data);
//         })
//         .catch((error)=>{
//             console.log("Error: ", error);
//         })
// });

// app.post('/saveEvent',(req, res) => {
//     console.log('Body:', req.body);
//     const data = req.body;
//     const newEvent = new Event(data);

//     newEvent.save((error, data) => {
//         if (error) {
//             res.status(500).json({msg: "Server error when attempting to save."})
//             return;
//         }
//         return res.status(200).json({
//             msg: "We received the data"
//         });
//     });
// });

// app.delete('/deleteEvent', (req,res)=>{
//     console.log('DELETE REQ');
//     console.log(req.body);
//     console.log(req.body.id);
//     Event.deleteOne({_id:req.body.id}, function(err, result){
//         if(!err){
//             res.status(200).json(result);
//             console.log("Deleted event")
//         }
//         else{
//             res.status(500).json({msg: "Server error when attempting to delete."})
//             console.log("error",err)
//         }
//     });
//     // comment.deleteOne({eventId:req.body.id}, function(err){
//     //     if(!err){
//     //         console.log("Deleted comments associated with event")
//     //     }
//     //     else{
//     //         console.log("Error: ",err)
//     //     }
//     // });
// });

// app.get('/getSingleEvent/:id', (req, res) =>{
//     console.log(req.params.id);
//     Event.findById(req.params.id)
//         .then((data) => {
//             console.log('Data: ', data);
//             res.status(200).json(data);
//         })
//         .catch((error)=>{
//             console.log("error");
//             //res.redirect('/404');
//         })
// });

io.on('connection', (socket) => {
    console.log('A user has connected');
    socket.on('Comment', (msg) => {
      io.emit('Comment', msg);
    });
    socket.on('DeleteComment', (msg) => {
        io.emit('DeleteComment', msg);
      });
});
