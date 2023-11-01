"use strict";

var express = require("express");

var http = require("http");

var path = require("path");

var Port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);

var session = require('express-session');

var router = require("./routes/router");

var cors = require('cors');

var _require = require('./sockets.js'),
    socketEstablisher = _require.socketEstablisher;

app.use(cors());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));
socketEstablisher(server);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/js', express["static"]('js'));
app.use('/css', express["static"]('css'));
app.use(router);
server.listen(Port, function () {
  console.log("Server is listening on port ".concat(Port));
});