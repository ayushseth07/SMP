const userController = require("../Controller/userController");
const postController = require("../Controller/postController");
const Express = require("express");
var router=Express.Router();

router.get("/register",userController.getSignup)
router.get("/verify",userController.getVerify)
router.get("/login",userController.getLogin)
router.post("/register", userController.signup)
router.post("/verify",userController.verify);
router.post("/resendOTP",userController.resendOTP);
router.post("/login",userController.login);
router.post("/resetPassword",userController.isAuthenticated,userController.resetPassword);
router.get("/reset-password/:token",userController.displayResetPassword)
router.get("/sendResetLink",userController.isAuthenticated,userController.sendResetLink)
router.post("/forgetPassword",userController.forgetPassword)
router.post("/searchuser",userController.searchUser)
router.post("/userInfo",userController.isAuthenticated,userController.getUserInfo)
router.post("/addUserData",userController.isAuthenticated,userController.addUserData)
router.post('/logout', userController.logout);




module.exports=router;