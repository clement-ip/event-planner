const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Event = require('./model/Event');
const profileRoutes = require('./routes/profilePageRoutes');
const path = require("path");
const multer = require("multer");

const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const crypto = require("crypto");

const authRoutes = require('./routes/authRoutes');
const commentRoutes = require('./routes/commentRoutes');
const eventRoutes = require('./routes/eventRoutes');


// App
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, "frontend/build")));

app.use(cookieParser());
app.use(express.json());

// Cors
const corsOptions = {
    //origin : 'http://localhost:3000',
    origin : 'http://35.247.19.51',
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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build/index.html"));
})


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



let gfs;

const conn = mongoose.createConnection(atlasURI);

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("images");
  console.log("Connection Successful");
});

// Create storage engine
const storage = new GridFsStorage({
  url: atlasURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: "images"
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

// @route POST /upload
// @desc  Uploads file to DB
app.post("/upload", upload.single("img"), (req, res, err) => {
  res.json({file:req.file});
  // if (err) throw err
  // res.status(201).send()
  res.send(req.files);
  // res.redirect("/");
  console.log("success!");
});

app.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
      //check if files exist
      if (!files || files.length == 0) {
          return res.status(404).json({
              err: "No files exist"
          })
      }
      // files exist
      return res.json(files)
  })
})

app.get('/files/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      //check if files exist
      if (!file || file.length == 0) {
          return res.status(404).json({
              err: "No files exist"
          })
      }
      //file exist
      return res.json(file)
  })
})

// @route GET /image/:filename
// @desc  Display Image
app.get("/image/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists"
      });
    }

    // Check if image
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      // Read output to browser
      gfs.openDownloadStreamByName(file.filename).pipe(res)
      // const readstream = gfs.createReadStream(file.filename);
      // readstream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image"
      });
    }
  });
});

// @route DELETE /files/:id
// @desc  Delete file
app.delete("/files/:id", (req, res) => {
  gfs.remove({ _id: req.params.id, root: 'imageUpload' }, (err, gridStore) => {
      if (err) {
          return res.status(404).json({ err: err })
      }
      // res.redirect("/")
  })
})
var session = require('express-session')
app.set('trust proxy',1);

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))