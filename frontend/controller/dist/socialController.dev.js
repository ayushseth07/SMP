"use strict";

var jwt = require('jsonwebtoken');

function displayChatRoom(req, res) {
  return regeneratorRuntime.async(function displayChatRoom$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.render('chatRoom');

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

function displayPrivateChat(req, res) {
  return regeneratorRuntime.async(function displayPrivateChat$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res.render('privateChat');

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function displayCreatePost(req, res) {
  return regeneratorRuntime.async(function displayCreatePost$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res.render('createPost');

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function displayLogin(req, res) {
  return regeneratorRuntime.async(function displayLogin$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          res.render('login');

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function displayForgotPassword(req, res) {
  return regeneratorRuntime.async(function displayForgotPassword$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          res.render('forgetPassword');

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function displayPost(req, res) {
  return regeneratorRuntime.async(function displayPost$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          res.render('post');

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function displayuserProfile(req, res) {
  return regeneratorRuntime.async(function displayuserProfile$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          res.render('userProfile');

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
}

function displayInputUserData(req, res) {
  return regeneratorRuntime.async(function displayInputUserData$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          res.render('inputUserData');

        case 1:
        case "end":
          return _context8.stop();
      }
    }
  });
}

function displayResestPassword(req, res) {
  var token, secretKey, decodedToken, email, user;
  return regeneratorRuntime.async(function displayResestPassword$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          // console.log(req.params)
          token = req.params.token;
          secretKey = 'your_secret_key';

          try {
            decodedToken = jwt.verify(token, secretKey);
            email = decodedToken.email;
            user = {
              email: email
            };
            res.status(200).render('resetPassword', {
              user: user
            });
          } catch (error) {
            console.error('Error decoding token:', error);
            res.status(400).send('Invalid or expired token');
          }

        case 3:
        case "end":
          return _context9.stop();
      }
    }
  });
}

function displayAllPosts(req, res) {
  return regeneratorRuntime.async(function displayAllPosts$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          res.render('allPosts');

        case 1:
        case "end":
          return _context10.stop();
      }
    }
  });
}

function displayUserInfo(req, res) {
  return regeneratorRuntime.async(function displayUserInfo$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          res.render('userInfo');

        case 1:
        case "end":
          return _context11.stop();
      }
    }
  });
}

module.exports = {
  displayChatRoom: displayChatRoom,
  displayPrivateChat: displayPrivateChat,
  displayCreatePost: displayCreatePost,
  displayLogin: displayLogin,
  displayForgotPassword: displayForgotPassword,
  displayResestPassword: displayResestPassword,
  displayPost: displayPost,
  displayAllPosts: displayAllPosts,
  displayuserProfile: displayuserProfile,
  displayUserInfo: displayUserInfo,
  displayInputUserData: displayInputUserData
};