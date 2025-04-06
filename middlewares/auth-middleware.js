const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user-model');
const BlackListToken = require('../models/blackListToken-model');
const Captain = require('../models/captain-model');
 

const verifyUser = async(req, res, next)=>{
    try{
       const token = req.header('Authorization').split(' ')[1]; //token = Bearer token  take only token
       if(!token) {
          return res.status(400).json("Unauthorized")
       }  
       const isItBlackListedToken = await BlackListToken.findOne({token: token})
       if(isItBlackListedToken) { 
           return res.status(400).json("Unauthorized User")
       }
       const decodedUserInJwt = await jwt.verify(token, process.env.JWT_SECRET_KEY) 
       const currentUser = await User.findOne({email: decodedUserInJwt.email}).select({password: 0}) 
       req.user = currentUser;
       req.userToken = token;
       req.userId = currentUser._id;
       next(); 
    } catch(error) { 
        next();
    }
}
const verifyCaptain = async(req, res, next)=>{
    try{
        const token = req.header('Authorization').split(' ')[1]; //token = Bearer token   only take token
        if(!token) {
            return res.status(400).json("Unauthorized")
        }
        const decodedCaptain = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        const currentCaptain = await Captain.findOne({_id: decodedCaptain.captainId}).select({password: 0}) 
        req.captain = currentCaptain;
        req.captainId = currentCaptain._id;
        req.captainToken = token;
        next();
    } catch(error) {
        return res.status(400).json({message: "Server error"})
    }
}

module.exports = {verifyUser, verifyCaptain}