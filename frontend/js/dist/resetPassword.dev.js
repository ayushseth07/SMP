"use strict";

document.getElementById('reset-password-button').addEventListener("click", function (e) {
  e.preventDefault();
  var newPassword = document.getElementById("newPassword").value;
  var confirmPassword = document.getElementById("confirmPassword").value;

  if (newPassword == null || confirmPassword == null) {
    alert("All fields are required");
  } else {
    var authorization = localStorage.getItem("Authorization");
    saveNewPassword(authorization);
  }

  function saveNewPassword(authorization) {
    var response, errorData, _errorData, _errorData2;

    return regeneratorRuntime.async(function saveNewPassword$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(fetch("http://localhost:8080/user/resetPassword?authToken=".concat(authorization), {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                newPassword: newPassword,
                confirmPassword: confirmPassword
              })
            }));

          case 3:
            response = _context.sent;

            if (!(response.status === 200)) {
              _context.next = 8;
              break;
            }

            window.location.href = "http://localhost:3000/login";
            _context.next = 26;
            break;

          case 8:
            if (!(response.status === 400)) {
              _context.next = 15;
              break;
            }

            _context.next = 11;
            return regeneratorRuntime.awrap(response.json());

          case 11:
            errorData = _context.sent;
            alert(errorData.error);
            _context.next = 26;
            break;

          case 15:
            if (!(response.status === 404)) {
              _context.next = 22;
              break;
            }

            _context.next = 18;
            return regeneratorRuntime.awrap(response.json());

          case 18:
            _errorData = _context.sent;
            alert(_errorData.error);
            _context.next = 26;
            break;

          case 22:
            _context.next = 24;
            return regeneratorRuntime.awrap(response.json());

          case 24:
            _errorData2 = _context.sent;
            console.log(_errorData2.error);

          case 26:
            _context.next = 31;
            break;

          case 28:
            _context.prev = 28;
            _context.t0 = _context["catch"](0);
            console.error("Error: " + _context.t0);

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 28]]);
  }
});