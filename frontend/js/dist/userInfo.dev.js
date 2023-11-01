"use strict";

document.addEventListener('DOMContentLoaded', function _callee() {
  var currentURL, url, emailParam, authToken, response, contentType, userInfo;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          currentURL = window.location.href;
          url = new URL(currentURL);
          emailParam = url.searchParams.get('email');
          authToken = localStorage.getItem('Authorization');

          if (!authToken) {
            _context.next = 31;
            break;
          }

          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(fetch("http://localhost:8080/user/userInfo?authToken=".concat(authToken, "&userInfo=").concat(emailParam), {
            method: 'POST',
            headers: {
              Authorization: authToken
            }
          }));

        case 8:
          response = _context.sent;

          if (!response.ok) {
            _context.next = 25;
            break;
          }

          contentType = response.headers.get('content-type');

          if (!(contentType && contentType.includes('application/json'))) {
            _context.next = 22;
            break;
          }

          _context.next = 14;
          return regeneratorRuntime.awrap(response.json());

        case 14:
          userInfo = _context.sent;
          document.getElementById('name').textContent = userInfo.data.name;
          document.getElementById('profile').textContent = userInfo.data.profile;
          document.getElementById('age').textContent = userInfo.data.age;
          document.getElementById('email').textContent = userInfo.data.email;
          document.getElementById('gender').textContent = userInfo.data.sex;
          _context.next = 23;
          break;

        case 22:
          console.error('Response is not JSON');

        case 23:
          _context.next = 26;
          break;

        case 25:
          console.error('Request failed');

        case 26:
          _context.next = 31;
          break;

        case 28:
          _context.prev = 28;
          _context.t0 = _context["catch"](5);
          console.error('Error: ' + _context.t0);

        case 31:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 28]]);
});