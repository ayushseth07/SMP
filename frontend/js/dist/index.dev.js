"use strict";

var socket = io();
socket.on("session-expired", function (result) {
  localStorage.setItem('Authorization', null);
  window.location.href = "http://localhost:3000/login";
});
socket.on("notification-received", function (data) {
  alert(data.username + " liked your post");
});