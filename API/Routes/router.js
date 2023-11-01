const EXPRESS = require("express");
const USERROUTE = require("./userRoute");
const POSTROUTE = require("./postRoute");



var ROUTER=EXPRESS.Router();

ROUTER.use("/user",USERROUTE)
ROUTER.use("/post",POSTROUTE)


module.exports=ROUTER;


