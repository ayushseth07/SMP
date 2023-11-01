const JWT = require('jsonwebtoken');

async function displayChatRoom (req, res) {
    res.render('chatRoom');
}

async function displayPrivateChat(req, res){
    res.render('privateChat');
}

async function displayCreatePost(req, res) {
    res.render('createPost');
}

async function displayLogin(req, res) {
    res.render('login');
}

async function displayForgotPassword(req, res){
    res.render('forgetPassword');
}
async function displayPost(req, res) {
    res.render('post');
}

async function displayuserProfile(req,res){
    res.render('userProfile');
}

async function displayInputUserData(req,res){ 
    res.render('inputUserData');
 }
async function displayResestPassword(req, res) {
    // console.log(req.params)
    const { token } = req.params;
    const SECRETKEY = 'your_secret_key';

    try {
        const DECODEDTOKEN = JWT.verify(token, SECRETKEY);
        const EMAIL = DECODEDTOKEN.email;
        const USER = {
            email: EMAIL,
        };
        res.status(200).render('resetPassword', { USER });
    } catch (error) {
        console.error('Error decoding token:', error);
        res.status(400).send('Invalid or expired token');
    }
}

async function displayAllPosts(req, res) {
    res.render('allPosts');
}

async function displayUserInfo(req,res){
   res.render('userInfo');
}

module.exports = {
    displayChatRoom,
    displayPrivateChat,
    displayCreatePost,
    displayLogin,
    displayForgotPassword,
    displayResestPassword,
    displayPost,
    displayAllPosts,
    displayuserProfile,
    displayUserInfo,
    displayInputUserData
}