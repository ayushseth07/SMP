"use strict";

var userName = localStorage.getItem("Authorization");
var socket = io();

function sendMessage() {
  var messageInput = document.getElementById("messageInput");
  var message = messageInput.value;
  var username = userName;
  socket.emit('setUsername', username);
  socket.emit("message", message);
  messageInput.value = "";
}

socket.on("message", function (message) {
  var post = document.getElementById("post");
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