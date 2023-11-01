"use strict";

document.getElementById("close-button").addEventListener("click", function () {
  document.getElementById("right-div").style.display = "none";
});
document.addEventListener('DOMContentLoaded', function _callee() {
  var toggleButton, activeUsersList, receiverEmail, currentUserName, openPrivateChatWithUser, chatDataDisplay, sendPrivateMessage;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          sendPrivateMessage = function _ref3() {
            var messageInput, message;
            return regeneratorRuntime.async(function sendPrivateMessage$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    messageInput = document.getElementById("messageInput");
                    message = messageInput.value;
                    socket.emit("privateMessage", {
                      message: message,
                      receiverEmail: receiverEmail
                    });
                    openPrivateChatWithUser(currentUserName, receiverEmail);
                    socket.on("privateMessage", function (data) {
                      openPrivateChatWithUser(currentUserName, data.receiverEmail);
                    });
                    messageInput.value = "";

                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            });
          };

          chatDataDisplay = function _ref2(email) {
            socket.emit("loadChats", email);
            socket.on("chatsLoaded", function (chats) {
              var post = document.getElementById("post");
              post.innerHTML = "";
              var currentDay = null;
              chats.forEach(function (chat) {
                console.log(chat);
                var messageElement = document.createElement("div");
                var messageDate = new Date(chat.time);
                var formattedTime = messageDate.toLocaleTimeString();
                var formattedDate = messageDate.toLocaleDateString();

                if (formattedDate !== currentDay) {
                  currentDay = formattedDate;
                  var dayHeader = document.createElement("div");
                  dayHeader.textContent = currentDay;
                  dayHeader.classList.add("day-header");
                  post.appendChild(dayHeader);
                }

                var messageContent = document.createElement("div");
                messageContent.innerHTML = chat.message + "<br>" + formattedTime;
                messageContent.classList.add(chat.sender === email ? "message-sent" : "message-received");
                messageElement.appendChild(messageContent);
                post.appendChild(messageElement);
              });
            });
          };

          openPrivateChatWithUser = function _ref(userName, email) {
            console.log(userName);
            document.getElementById("right-div").style.display = "block";
            var modal = document.getElementById("privateChatModal");
            var modalContent = document.getElementById("privateChatContent");
            modalContent.textContent = "Chatting with ".concat(userName);
            modal.style.display = "block";
            chatDataDisplay(email);
          };

          toggleButton = document.querySelector(".toggle-active-users");
          toggleButton.addEventListener("click", function () {
            var parentDiv = this.parentElement;
            var userList = parentDiv.querySelector("ul");
            var activeUserList = document.getElementById("users-list-container");

            if (userList.style.display === "none" || userList.style.display === "") {
              activeUserList.style.height = "30vh";
              userList.style.display = "block";
            } else {
              activeUserList.style.height = "5vh";
              userList.style.display = "none";
            }
          });
          activeUsersList = document.getElementById("activeUsersList");
          socket.on("activeUsersList", function (data) {
            var users = data;
            console.log(data[0]);
            activeUsersList.innerHTML = "";
            users.forEach(function (user) {
              var currentUserEmail = user[0];
              var userName = user[1].name;
              var userElement = document.createElement("li");
              userElement.innerHTML = userName + "<span class='count-span'></span>";
              userElement.id = currentUserEmail;
              userElement.addEventListener("click", function () {
                document.getElementById("private-chat-container").style.display = "block";
                receiverEmail = userElement.id;
                openPrivateChatWithUser(userName, receiverEmail);
              });
              userElement.classList.add("active-user");
              activeUsersList.appendChild(userElement);
            });
          });

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
});