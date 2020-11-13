const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');


const app = express();

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
