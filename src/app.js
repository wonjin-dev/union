const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.set('views', process.cwd() + "/src/views");
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/src'));
app.use("/dist", express.static(path.join(__dirname, "../dist")));
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/union', {useNewUrlParser: true, useUnifiedTopology: true});

app.use('/', require('./controllers/union'));

module.exports = app;