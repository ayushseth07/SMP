"use strict";

var _this = void 0;

document.addEventListener('DOMContentLoaded', function () {
  var logoutLink = document.querySelector('a[href="/logout"]');
  logoutLink.addEventListener('click', function _callee(event) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            event.preventDefault();

            _this.localStorage.removeItem('Authorization');

            window.location.href = '/login';

          case 3:
          case "end":
            return _context.stop();
        }
      }
    });
  });
});