const POSTCONTROLLER = require("../Controller/postController");
const USERCONTROLLER = require("../Controller/userController");
const EXPRESS = require("express");
var ROUTER=EXPRESS.Router();
const PATH = require("path");

ROUTER.post("/addPost",USERCONTROLLER.isAuthenticated,POSTCONTROLLER.savePost);
ROUTER.get("/displayPost",USERCONTROLLER.isAuthenticated,POSTCONTROLLER.displayPost);
ROUTER.delete("/deletePost",USERCONTROLLER.isAuthenticated,POSTCONTROLLER.removePost);
ROUTER.get("/allPost",USERCONTROLLER.isAuthenticated,POSTCONTROLLER.getAllPost);
ROUTER.put("/editPost",USERCONTROLLER.isAuthenticated,POSTCONTROLLER.editPost);
ROUTER.post('/likePost/:post_id', USERCONTROLLER.isAuthenticated, POSTCONTROLLER.likePost);
ROUTER.post('/check-like/:post_id', USERCONTROLLER.isAuthenticated, POSTCONTROLLER.checkLikedPost);
ROUTER.post('/comments/:post_id', USERCONTROLLER.isAuthenticated, POSTCONTROLLER.displayPostComment);



ROUTER.get("/render",(req,res)=>{
    res.sendFile(PATH.join(__dirname, '../Views/displayPost.html'));
})
module.exports=ROUTER;