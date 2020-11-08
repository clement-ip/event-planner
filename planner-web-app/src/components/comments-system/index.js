const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 5000

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
 }));

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send({ message: "We did it!" });
  });
  
app.post('/post', (req, res) => {
    res.json({ name: req.body.name, message: req.body.message });
})

app.listen(port, () => console.log("Backend server live on " + port));