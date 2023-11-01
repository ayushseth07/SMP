const EXPRESS = require("express");

const HTTP = require("http");
const PATH = require("path");
const PORT = process.env.PORT || 3000;

const APP = EXPRESS();
const SERVER = HTTP.createServer(APP);
const SESSION = require('express-session');
const ROUTER= require("./routes/router");
const CORS = require('cors');

const {SocketEstablisher} = require('./sockets.js');

APP.use(CORS());



APP.use(
    SESSION({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: false
    })
);
SocketEstablisher(SERVER)
APP.set('views', PATH.join(__dirname, 'views'));
APP.set('view engine', 'pug');
APP.use('/js', EXPRESS.static('js'));
APP.use('/css', EXPRESS.static('css'));
APP.use(ROUTER)



SERVER.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});

