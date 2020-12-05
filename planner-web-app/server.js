const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Event = require('./model/Event');
const profileRoutes = require('./routes/profilePageRoutes');

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
mongoose.connect(atlasURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then((result) => http.listen(port))
    .then(() => console.log(`DB connect and running server on port ${ port }`))
    .catch((err) => console.log(err));

// Routes
app.use(authRoutes);
app.use(commentRoutes);
app.use(eventRoutes);
app.use(profileRoutes);

app.get('/test', (req, res) => {
    // res.json('pls work');
    res.status(301);
    res.redirect('https://expressjs.com/');
});

io.on('connection', (socket) => {
    console.log('A user has connected');
    socket.on('Comment', (msg) => {
      io.emit('Comment', msg);
    });
    socket.on('DeleteComment', (msg) => {
        io.emit('DeleteComment', msg);
      });
});


