"use strict";

socket.on("userCount", function (count) {
  var userCountElement = document.getElementById("userCount");
  userCountElement.innerText = ": ".concat(count);
});