const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
const path = require("path");
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/union', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (error) => console.log("DB 연결 실패", error));
db.once('open', () => {
    console.log('DB 연결');
});

app.use('/', require('./controllers/union'));

module.exports = app;