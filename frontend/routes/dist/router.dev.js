"use strict";

var Express = require("express");

var socialRoutes = require("./socialRoutes.js");

var router = Express.Router();
router.use("/", socialRoutes);
module.exports = router;