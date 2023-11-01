"use strict";

document.addEventListener('DOMContentLoaded', function _callee() {
  var authToken, response, contentType, userInfo;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          authToken = localStorage.getItem('Authorization');

          if (!authToken) {
            _context.next = 28;
            break;
          }

          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(fetch("http://localhost:8080/user/userInfo?authToken=".concat(authToken, "&userInfo=", null), {
            method: 'POST',
            headers: {
              Authorization: authToken
            }
          }));

        case 5:
          response = _context.sent;

          if (!response.ok) {
            _context.next = 22;
            break;
          }

          contentType = response.headers.get('content-type');

          if (!(contentType && contentType.includes('application/json'))) {
            _context.next = 19;
            break;
          }

          _context.next = 11;
          return regeneratorRuntime.awrap(response.json());

        case 11:
          userInfo = _context.sent;
          document.getElementById('name').textContent = userInfo.data.name;
          document.getElementById('profile').textContent = userInfo.data.profile;
          document.getElementById('age').textContent = userInfo.data.age;
          document.getElementById('email').textContent = userInfo.data.email;
          document.getElementById('gender').textContent = userInfo.data.sex;
          _context.next = 20;
          break;

        case 19:
          console.error('Response is not JSON');

        case 20:
          _context.next = 23;
          break;

        case 22:
          console.error('Request failed');

        case 23:
          _context.next = 28;
          break;

        case 25:
          _context.prev = 25;
          _context.t0 = _context["catch"](2);
          console.error('Error: ' + _context.t0);

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 25]]);
});