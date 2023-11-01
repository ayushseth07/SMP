"use strict";

var userName;
var authorization;
var email;
document.addEventListener("DOMContentLoaded", function getName() {
  return regeneratorRuntime.async(function getName$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userName = localStorage.getItem("name");
          authorization = localStorage.getItem("Authorization");

          if (userName) {
            socket.emit('setUsername', {
              userName: userName,
              authorization: authorization
            });
            document.getElementById("publicChatHeading").innerHTML = "Welcome" + " " + userName;
          }

          return _context.abrupt("return", userName);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});

function sendMessage() {
  var messageInput, message;
  return regeneratorRuntime.async(function sendMessage$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          messageInput = document.getElementById("messageInput");
          message = messageInput.value;
          socket.emit("message", message);
          messageInput.value = "";

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}

socket.on("message", function (message) {
  var post = document.getElementById("post1");
  var messageElement = document.createElement("div");
  var currentTime = new Date();
  var formattedTime = "".concat(currentTime.getHours(), " : ").concat(currentTime.getMinutes(), " : ").concat(currentTime.getSeconds());
  messageElement.innerText = message + " Time: " + formattedTime;
  post.appendChild(messageElement);
});
socket.on("setUsername", function (message) {
  var post = document.getElementById("post");
  var messageElement = document.createElement("div");
  messageElement.innerText = message;
  post.appendChild(messageElement);
});