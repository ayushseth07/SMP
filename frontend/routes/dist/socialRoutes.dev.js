"use strict";

var socialController = require("../controller/socialController");

var Express = require("express");

var router = Express.Router();
router.get("/chatRoom", socialController.displayChatRoom);
router.get("/private-chat", socialController.displayPrivateChat);
router.get("/create-post", socialController.displayCreatePost);
router.get("/login", socialController.displayLogin);
router.get("/forgot-password", socialController.displayForgotPassword);
router.get("/reset-password/:token", socialController.displayResestPassword);
router.get("/post", socialController.displayPost);
router.get("/allPosts", socialController.displayAllPosts);
router.get("/userProfile", socialController.displayuserProfile);
router.get("/userInfo", socialController.displayUserInfo);
router.get("/inputUserData", socialController.displayInputUserData); // router.post('/logout', (req, res) => {
//     req.session.destroy((err) => {
//       if (err) {
//         console.error('Error destroying session:', err);
//       }
//       res.redirect('/login');
//     });
//   });

module.exports = router;