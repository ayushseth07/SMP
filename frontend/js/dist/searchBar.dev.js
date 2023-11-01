"use strict";

var searchInput = document.getElementById("searchInput");
var userList = document.getElementById("searchUserList");
searchInput.addEventListener('input', function _callee() {
  var searchTerm, response, users, userListContainer;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userList.innerHTML = "";
          showUserList();
          searchTerm = searchInput.value;
          _context.next = 5;
          return regeneratorRuntime.awrap(fetch("http://localhost:8080/user/searchuser?search=".concat(searchTerm), {
            method: 'POST'
          }));

        case 5:
          response = _context.sent;

          if (!(response.status == 200)) {
            _context.next = 13;
            break;
          }

          _context.next = 9;
          return regeneratorRuntime.awrap(response.json());

        case 9:
          users = _context.sent;

          if (Array.isArray(users.foundUsers)) {
            userListContainer = document.createElement('ul');
            userListContainer.className = "user-list"; // Add a class for styling

            users.foundUsers.forEach(function (user) {
              var userListItem = document.createElement('li');
              userListItem.className = "user-list-item"; // Add a class for styling

              var userEmailLink = document.createElement('a');
              userEmailLink.href = "http://localhost:3000/userInfo?email=".concat(user.email); // Link to the search user route

              userEmailLink.textContent = "".concat(user.name);
              userListItem.appendChild(userEmailLink);
              userListContainer.appendChild(userListItem); // Add a click event listener to the list item

              userListItem.addEventListener('click', function () {// You can handle the click event here, if needed
                // For example, you can highlight the selected user, etc.
              });
            });
            userList.appendChild(userListContainer);
          } else {
            userList.innerHTML = "No such user found."; // Display a message when no users are found
          }

          _context.next = 14;
          break;

        case 13:
          if (response.status == 204) {
            userList.innerHTML = "No such user found."; // Display a message when no users are found
          }

        case 14:
        case "end":
          return _context.stop();
      }
    }
  });
});
document.addEventListener('mousedown', function (event) {
  // Check if the click is outside of search input and user list
  if (!searchInput.contains(event.target) && !userList.contains(event.target)) {
    hideUserList();
  }
});

function showUserList() {
  userList.style.display = "block";
}

function hideUserList() {
  userList.style.display = "none";
}