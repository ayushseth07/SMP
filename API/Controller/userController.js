const { addUser } = require("../Services/addUser");
const { hashPassword } = require("../Services/hashPassword");
const { generateOTP, storeOTP } = require("../Services/generateOtp");
const { verifyUser } = require("../Services/otpVerify");
const path = require('path');
const {checkPassword} = require('../Services/checkPassword');
const {userExistsWithEmail} = require('../Services/userExists');
const jwt = require('jsonwebtoken');
const client = require('../Database/connection.js');
const {getUserByEmail} = require('../Services/getUserByEmail');
const {generateToken} = require('../Services/generateToken');
const {getUserName} = require('../Services/getUserName');
const {getUserInfoByEmail} = require('../Services/getUserInfoByEmail');
const {insertUserInfo} = require('../Services/insertUserInfo');
const {checkDataExistence} = require('../Services/checkDataExistence');
const {getUserImage} = require('../Services/getProfileImage');
const dbQuery = require('../Database/dbqueries.js');


function getSignup(req,res) { 
    res.sendFile( path.join(__dirname, '../Views/signup.html'));
 }

 function getVerify(req,res) { 
    res.sendFile( path.join(__dirname, '../Views/verify.html'));
 }
 
 function getLogin(req,res) { 
    res.sendFile( path.join(__dirname, '../Views/login.html'));
 }

 async function signup(req, res) {
    try {
      const data = req.body;
      data.password = await hashPassword(data.password);
 
      const userExists = await userExistsWithEmail(data.email);
      if (userExists) {
        res.status(409).json({ error: 'User with this email is already registered' });
        return;
      }
  
      const otp = await generateOTP();
      await storeOTP(data.email, otp);  
      await addUser(data.name, data.email, data.password);  
      res.status(201).json({ message: 'User registered' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to register user' });
    }
  }
  


  async function verify(req, res) {
    const data = req.body;

    const verifyResult = await verifyUser(data.email, data.otp);
    if (verifyResult === 'user-verified') {
        res.status(201).json({ message: 'User verified' })
    } else if (verifyResult === 'Invalid OTP') {
        res.status(401).json({ error: 'Invalid OTP' });
    } else {
        res.status(500).json({ error: 'OTP expired' });
    }
}
async function resendOTP(req, res) {
    const email = req.body.email;

    const otp = await generateOTP();
    await storeOTP(email, otp);
    if (otp == null) {
        return res.status(404).json({ error: 'No OTP available to resend' });
    }
    else {
        res.status(200).json({ message: otp });
    }
}

async function login(req, res) {

  const email = req.body.email;
  const password = req.body.password;
  const success = await checkPassword(email, password);
 
  if (success == "verify otp"){    
    res.status(400).json({ error: 'Not Verified',email:email});
  }
  else if (success == null) {
    res.status(404).json({ error: 'No such user exists' });
  } else {
    if (success) {
      const profileImageURL = await getUserImage(email);
      req.session.token = await generateToken(email);
      res.setHeader('Authorization', req.session.token);
      const user = await getUserByEmail(email); 
      const dataExists = await checkDataExistence(email);
      if(!dataExists){        
        res.status(201).json({  message: "Incomplete Profile", name:  user.name , Authorization: req.session.token});
      }else{
      res.status(200).json({ message: "Login successful", name:  user.name , Authorization: req.session.token,profileImageURL:profileImageURL  });}
    } else {
      res.status(401).json({ error: 'Incorrect password' });
    }
  }
}

async function isAuthenticated(req, res, next) {
 
  if(req.query.authToken){
    req.session.token = req.query.authToken;
  }
    if (req && req.session && req.session.token) {
      try {
        res.setHeader('Authorization',req.session.token);
        const decodedToken = jwt.verify(req.session.token, 'your_secret_key');
        const currentTimestamp = Math.floor(Date.now() / 1000);

        if (decodedToken.exp < currentTimestamp) {         
          return res.status(401).json({ message: "Token has expired. Please log in again." });
        } else{
          req.email = decodedToken.email; 
          next();
        }

      } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
      }
    } else {
      return res.status(401).json({ message: "Session Expired" });
    }

}


async function resetPassword(req, res) {
  const email = req.email;
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: 'New password and confirm password do not match' });
  }

  try {
    const hashedPassword = await hashPassword(newPassword);
    const values = [hashedPassword, email];
    const result = await client.query(dbQuery.updatePasswordQuery , values);

    if (result.rowCount === 1) {
      return res.json({ message: 'Password reset successfully' });
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Password reset failed' });
  }
}

async function displayResetPassword(req, res) {
  const { token } = req.params;
  req.session.token = token;
  const secretKey = 'your_secret_key';

  try {
    const decodedToken = jwt.verify(token, secretKey);
    const email = decodedToken.email;
    res.status(200).json({ email: email });
  } catch (error) {
    res.status(400).send('Invalid or expired token');
  }
};

async function sendResetLink(req, res) {
  res.send("http:localhost:8080/user/reset-password/"+ req.session.token)
}
async function forgetPassword(req, res) {
  const user = await getUserByEmail(req.body.email);
  console.log(user);

  if (!user) {
    // Handle the case where the user is not found
    return res.status(204).json({ message: "User not found" });
  }

  if (user.verified) {
    const token = await generateToken(req.body.email);
    req.session.token = token;
    const resetLink = "http://localhost:3000/reset-password/" + req.session.token;

    return res.status(200).json({ message: "Reset Link Sent", link: resetLink, token: req.session.token });
  } else {
    return res.status(203).json({ message: "User is not verified." });
  }
}

async function searchUser(req, res){
  const searchString = req.query.search;
  const foundUsers = await getUserName(searchString);
  if(foundUsers.length > 0){
    res.status(200).json({foundUsers:foundUsers});    
  } else {
    res.status(204).json({foundUsers:"No such user exists"});   
  }
}

async function getUserInfo(req, res) {
  let data ;
  if(req.query.userInfo == null|| req.query.userInfo == 'null' ){
    data = await req.email;
  }else{ data = await req.query.userInfo;}
  
  try {
    const result = await getUserInfoByEmail(data);
    res.status(200).json({ data: result });
  } catch (error) {

    if (error.message === 'No data found for the provided userid') {
      res.status(204).send('No data found for the provided userid');
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
}
async function logout(req, res){
 req.session.destroy();
  res.status(200).send('Logged out successfully');
}
async function addUserData(req, res) {
  const data = req.body;
  const email = req.email;
  try {
    await insertUserInfo(data, email, data.uploadedImageURL);
    res.status(200).json({ message: 'User data inserted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
module.exports = {
    signup,
    getSignup,
    getVerify,
    verify,
    resendOTP,
    login,
    getLogin,
    isAuthenticated,resetPassword,displayResetPassword,sendResetLink,forgetPassword,
    searchUser,
    getUserInfo,
    logout,
    addUserData

};


