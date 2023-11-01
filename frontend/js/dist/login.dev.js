"use strict";

document.addEventListener("DOMContentLoaded", function _callee3() {
  var authToken, loginForm, forgotPasswordButton;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          authToken = localStorage.getItem('Authorization');

          if (authToken != "null" && authToken != null) {
            window.location.href = "/allPosts";
          } else {
            loginForm = document.getElementById("loginForm");
            loginForm.addEventListener("submit", function _callee(e) {
              var email, password, response, tokenData, name, _authToken, _tokenData, _name, _authToken2, errorData;

              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      e.preventDefault();
                      email = document.getElementById("email").value;
                      password = document.getElementById("password").value;
                      _context.prev = 3;
                      _context.next = 6;
                      return regeneratorRuntime.awrap(fetch("http://localhost:8080/user/login", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                          email: email,
                          password: password
                        })
                      }));

                    case 6:
                      response = _context.sent;
                      alert(response.status);

                      if (!(response.status === 201)) {
                        _context.next = 19;
                        break;
                      }

                      _context.next = 11;
                      return regeneratorRuntime.awrap(response.json());

                    case 11:
                      tokenData = _context.sent;
                      name = tokenData.name;
                      localStorage.setItem("name", name);
                      _authToken = tokenData.Authorization;
                      localStorage.setItem("Authorization", _authToken);
                      window.location.href = "/inputUserData";
                      _context.next = 34;
                      break;

                    case 19:
                      if (!(response.status == 200)) {
                        _context.next = 30;
                        break;
                      }

                      _context.next = 22;
                      return regeneratorRuntime.awrap(response.json());

                    case 22:
                      _tokenData = _context.sent;
                      _name = _tokenData.name;
                      localStorage.setItem("name", _name);
                      _authToken2 = _tokenData.Authorization;
                      localStorage.setItem("Authorization", _authToken2);
                      window.location.href = "/allPosts";
                      _context.next = 34;
                      break;

                    case 30:
                      _context.next = 32;
                      return regeneratorRuntime.awrap(response.json());

                    case 32:
                      errorData = _context.sent;
                      alert(errorData.error || "Login failed");

                    case 34:
                      _context.next = 39;
                      break;

                    case 36:
                      _context.prev = 36;
                      _context.t0 = _context["catch"](3);
                      console.error("Error: " + _context.t0);

                    case 39:
                    case "end":
                      return _context.stop();
                  }
                }
              }, null, null, [[3, 36]]);
            });
            forgotPasswordButton = document.getElementById("forgotPassword");
            forgotPasswordButton.addEventListener("click", function _callee2(e) {
              var email, response, errorData;
              return regeneratorRuntime.async(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      e.preventDefault();
                      email = document.getElementById("email").value;
                      _context2.prev = 2;
                      _context2.next = 5;
                      return regeneratorRuntime.awrap(fetch("/user/sendResetLink", {
                        method: "GET"
                      }));

                    case 5:
                      response = _context2.sent;

                      if (!(response.status === 200)) {
                        _context2.next = 10;
                        break;
                      }

                      alert("Password reset link sent to your email.");
                      _context2.next = 14;
                      break;

                    case 10:
                      _context2.next = 12;
                      return regeneratorRuntime.awrap(response.json());

                    case 12:
                      errorData = _context2.sent;
                      alert(errorData.error || "Failed to send reset link.");

                    case 14:
                      _context2.next = 19;
                      break;

                    case 16:
                      _context2.prev = 16;
                      _context2.t0 = _context2["catch"](2);
                      console.error("Error: " + _context2.t0);

                    case 19:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, null, null, [[2, 16]]);
            });
          }

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
});