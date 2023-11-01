const SOCIALCONTROLLER = require("../controller/socialController")
const EXPRESS = require("express");
var ROUTER=EXPRESS.Router();


ROUTER.get("/chatRoom", SOCIALCONTROLLER.displayChatRoom);
ROUTER.get("/private-chat", SOCIALCONTROLLER.displayPrivateChat);
ROUTER.get("/create-post", SOCIALCONTROLLER.displayCreatePost);
ROUTER.get("/login", SOCIALCONTROLLER.displayLogin);
ROUTER.get("/forgot-password", SOCIALCONTROLLER.displayForgotPassword);
ROUTER.get("/reset-password/:token", SOCIALCONTROLLER.displayResestPassword);
ROUTER.get("/post",SOCIALCONTROLLER.displayPost);
ROUTER.get("/allPosts", SOCIALCONTROLLER.displayAllPosts);
ROUTER.get("/userProfile", SOCIALCONTROLLER.displayuserProfile);
ROUTER.get("/userInfo", SOCIALCONTROLLER.displayUserInfo);
ROUTER.get("/inputUserData", SOCIALCONTROLLER.displayInputUserData);
ROUTER.post('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      res.redirect('/login');
    });
  });
  

module.exports=ROUTER;