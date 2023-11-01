"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var pg = require("pg");

require('dotenv').config();

var client = new pg.Client({
  host: process.env.host,
  user: process.env.user,
  port: process.env.port,
  password: process.env.password,
  database: process.env.database
});
client.connect();
var activeUsers = new Map();

var jwt = require('jsonwebtoken');

function socketEstablisher(server) {
  var SocketIo, io, connectedUsers, disconnectedUsers;
  return regeneratorRuntime.async(function socketEstablisher$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          SocketIo = require("socket.io");
          io = SocketIo(server, {
            cors: {
              origin: "https://localhost",
              methods: ["GET", "POST"]
            }
          }); // const { sendToRMQueue } = require('./services/sendToRMQueue');

          connectedUsers = 0;
          disconnectedUsers = 0;
          io.on("connection", function (socket) {
            var userName;
            var senderEmail;
            socket.on('setUsername', function (data) {
              try {
                userName = data.userName;
                var decodedToken = jwt.verify(data.authorization, 'your_secret_key');
                senderEmail = decodedToken.email;
                activeUsers.set(senderEmail, {
                  socketId: socket.id,
                  name: data.userName
                });
                io.emit("activeUsersList", Array.from(activeUsers));
                var user = Array.from(activeUsers).find(function (_ref) {
                  var _ref2 = _slicedToArray(_ref, 2),
                      _ = _ref2[0],
                      userData = _ref2[1];

                  return userData.socketId === socket.id;
                });

                if (user) {
                  connectedUsers++;
                }

                io.emit("userCount", connectedUsers);
              } catch (e) {
                io.emit("session-expired", null);
              }
            });
            socket.on("disconnect", function () {
              var user = Array.from(activeUsers).find(function (_ref3) {
                var _ref4 = _slicedToArray(_ref3, 2),
                    _ = _ref4[0],
                    userData = _ref4[1];

                return userData.socketId === socket.id;
              });

              if (user) {
                var email = user[0];
                activeUsers["delete"](email);
                disconnectedUsers++;
                connectedUsers--;
              }

              io.emit("userCount", connectedUsers);
              io.emit("activeUsersList", Array.from(activeUsers.values()).map(function (user) {
                return user.name;
              }));
            });
            socket.on("message", function (message) {
              if (message.trim() !== "") {
                var user = Array.from(activeUsers).find(function (_ref5) {
                  var _ref6 = _slicedToArray(_ref5, 2),
                      _ = _ref6[0],
                      userData = _ref6[1];

                  return userData.socketId === socket.id;
                });

                if (user) {
                  var messageWithUsername = "".concat(userName, ": ").concat(message);
                  io.emit("message", messageWithUsername);
                }
              }
            });
            socket.on("privateMessage", function _callee(info) {
              var receiverEmail, message, user, messageWithUsername, currentTime, query;
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      receiverEmail = info.receiverEmail;
                      message = info.message;
                      user = activeUsers.get(receiverEmail);

                      if (message.trim() !== "") {
                        if (user) {
                          messageWithUsername = "".concat(message);
                          currentTime = new Date().toISOString();
                          query = {
                            text: "INSERT INTO chats (sender, receiver, message, time) VALUES ($1, $2, $3, $4)",
                            values: [senderEmail, receiverEmail, messageWithUsername, currentTime]
                          };
                          client.query(query).then(function (result) {
                            console.log("Data inserted successfully");
                          })["catch"](function (error) {
                            console.error("Error inserting data:", error);
                          });
                          io.to(user.socketId).emit("privateMessage", {
                            messageWithUsername: messageWithUsername,
                            receiverEmail: receiverEmail
                          });
                        }
                      }

                    case 4:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            });
            socket.on("loadChats", function (receiverEmail) {
              var query = {
                text: "\n                    SELECT *\n                    FROM chats\n                    WHERE (sender = $1 AND receiver = $2)\n                    OR (sender = $2 AND receiver = $1)\n                    ORDER BY time ASC\n                ",
                values: [senderEmail, receiverEmail]
              };
              client.query(query).then(function (result) {
                var chats = result.rows;
                socket.emit("chatsLoaded", chats);
              })["catch"](function (error) {// console.error("Error fetching chat records:", error);
              });
            });
            socket.on("updateNotification", function (data) {
              var currentTime = new Date().toISOString();
              var decodedToken = jwt.verify(data.authToken, 'your_secret_key');
              senderEmail = decodedToken.email;

              if (data.event == "like") {
                var query = {
                  text: "INSERT INTO notifications (sender, receiver, event, time, status,postid) VALUES ($1, $2, $3, $4,$5,$6) RETURNING *",
                  values: [senderEmail, data.likedPostEmail, "like", currentTime, "unread", data.postId]
                };
                client.query(query).then(function _callee2(result) {
                  var user, sender, emailParts, username;
                  return regeneratorRuntime.async(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return regeneratorRuntime.awrap(activeUsers.get(result.rows[0].receiver));

                        case 2:
                          user = _context2.sent;
                          sender = result.rows[0].sender;
                          emailParts = sender.split('@');
                          username = emailParts[0]; // sendToRMQueue(result.rows);

                          io.to(user.socketId).emit("notification-received", {
                            username: username
                          });

                        case 7:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  });
                })["catch"](function (error) {// console.error("Error inserting notification:", error);
                });
              } else {
                var deleteQuery = {
                  text: "DELETE FROM notifications WHERE sender = $1 AND receiver = $2 AND postid = $3",
                  values: [senderEmail, data.likedPostEmail, data.postId]
                };
                client.query(deleteQuery);
              }
            });
            socket.on("addComment", function (data) {
              // console.log(data)
              var currentTime = new Date().toISOString();
              var decodedToken = jwt.verify(data.authToken, 'your_secret_key');
              senderEmail = decodedToken.email;
              var query = {
                text: "INSERT INTO commentTable (sender, receiver,time,postid,value) VALUES ($1, $2, $3, $4,$5) RETURNING *",
                values: [senderEmail, data.likedPostEmail, currentTime, data.postId, data.inputValue]
              };
              client.query(query).then(function _callee3(result) {
                return regeneratorRuntime.async(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        socket.emit("displayComment", result.rows[0]);

                      case 1:
                      case "end":
                        return _context3.stop();
                    }
                  }
                });
              })["catch"](function (error) {
                socket.emit("displayComment", "Error adding comment");
              });
            });
          });

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
}

module.exports = {
  socketEstablisher: socketEstablisher
};