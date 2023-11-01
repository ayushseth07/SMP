const EXPRESS = require("express");
const SOCIALROUTES = require("./socialRoutes.js");


const ROUTER = EXPRESS.Router();
ROUTER.use("/",SOCIALROUTES)


module.exports=ROUTER;


