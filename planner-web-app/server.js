const express = require('express')
const mongoose = require('mongoose')
const path = require('path')


//const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://470User:CMPT470@470cluster.tajiy.mongodb.net/userdata?retryWrites=true&w=majority";
//const client = new MongoClient(uri, { useNewUrlParser: true });
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require('cors');
const routes = require('./routes/api');


/*
client.connect(err => {
    const collection = client.db("userdata").collection("events");
    // perform actions on the collection object

    console.log("db connected")
    client.close();
});
*/

mongoose.connect(process.env.MONGODB_URI || uri),{
    useNewUrlParser: true,
    useUnifiedTopology: true
}


mongoose.connection.on('connected', ()=>{
    console.log('mongoose is connected');
});

app.use(express.json());
app.use(express.urlencoded({extended: false}))


//
// //schema
// const Schema = mongoose.Schema;
// const EventSchema = new Schema({
//     name: String,
//     description: String,
//     start_date: Date,
//     end_date: Date
// });
//
//
// //Model
// const Event = mongoose.model("event", EventSchema);


// Save data test.
const testData = {
    name: "meeting 1",
    description: "meeting 1 notes",
    start_date: Date.now(),
    end_date: Date.now()
};


// const newEvent = new Event(testData); //instance
//
// newEvent.save((error)=>{
//     if(error){
//         console.log("broke");
//     }
//     else{
//         console.log("saved")
//     }
// });

// app.get('/api', (req, res) =>{
//
//     Event.find({ })
//         .then((data) => {
//             console.log('Data: ', data);
//             res.json(data);
//         })
//         .catch((error)=>{
//             console.log("error");
//         })
//
// });
//
// app.get('/api/name',(req, res) => {
//     const data = {
//         username: 'corey',
//         age: 23
//     };
//     res.json(data);
// })



app.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, "/client/build/index.html"))
});

app.use('/api',routes)
//app.use(express.static(path.join(__dirname,"/client/build/")));
if(process.env.NODE_ENV === "production"){
    app.use(express.static('/client/build'));
}

app.use(cors());
app.listen(PORT, console.log('server is starting up at',PORT));