const EXPRESS = require("express");
const ROUTER= require("./Routes/router");
const PORT = process.env.port || 8080;
const BODYPARSER = require("body-parser");
const SERVER = EXPRESS();
const CORS = require('cors');
const SESSION = require('express-session');


SERVER.use(CORS());

SERVER.use(BODYPARSER.json());
SERVER.use(EXPRESS.static(__dirname + '/public'));

SERVER.use(
  SESSION({
      secret: 'your-secret-key',
      resave: false, 
      saveUninitialized: false, 
      cookie: { secure: false }
    })
  );
SERVER.use(ROUTER) 


SERVER.listen(PORT, function() {
    console.log("SERVER is listening on port :", PORT);
});
