"use strict";

var forgotPasswordButton = document.getElementById("forgotPassword");
forgotPasswordButton.addEventListener("click", function _callee(e) {
  var email, response, data, errorData;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          e.preventDefault();
          email = document.getElementById("email").value;

          if (email) {
            _context.next = 6;
            break;
          }

          alert("Email is required");
          _context.next = 31;
          break;

        case 6:
          _context.prev = 6;
          _context.next = 9;
          return regeneratorRuntime.awrap(fetch("http://localhost:8080/user/forgetPassword", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: email
            })
          }));

        case 9:
          response = _context.sent;

          if (!(response.status === 200)) {
            _context.next = 18;
            break;
          }

          _context.next = 13;
          return regeneratorRuntime.awrap(response.json());

        case 13:
          data = _context.sent;
          localStorage.setItem("Authorization", data.token);
          console.log(data.link);
          _context.next = 26;
          break;

        case 18:
          if (!(response.status === 403)) {
            _context.next = 22;
            break;
          }

          window.location.href = "http://localhost:8080/user/verify";
          _context.next = 26;
          break;

        case 22:
          _context.next = 24;
          return regeneratorRuntime.awrap(response.json());

        case 24:
          errorData = _context.sent;
          alert(errorData.error || "Failed to send reset link.");

        case 26:
          _context.next = 31;
          break;

        case 28:
          _context.prev = 28;
          _context.t0 = _context["catch"](6);
          console.error("Error: " + _context.t0);

        case 31:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 28]]);
});