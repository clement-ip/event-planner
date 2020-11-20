const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');


const app = express();

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

// Port
const port = process.env.PORT || 5000;

// Configure AtlasDB
const { atlasURI } = require('./config/keys');
mongoose.connect(atlasURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => app.listen(port))
    .then(() => console.log(`DB connect and running server on port ${ port }`))
    .catch((err) => console.log(err));


app.use(authRoutes);

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
