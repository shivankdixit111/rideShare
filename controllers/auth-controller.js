const { response } = require("../app");
const BlackListToken = require("../models/blackListToken-model");
const Captain = require("../models/captain-model");
const User = require("../models/user-model"); 


const user_register = async(req, res, next)=>{
   try{
        const {fullname, email, password, phoneNo} = req.body;   
        const userExist = await User.findOne({email});
        if(userExist) {
            return res.status(400).json({message: "User already exist with this email"})
        }
        const user =  await User.create({fullname, email, password, phoneNo});
        await user.save(); //hashing of password will be done on userModel on pre() method
        return res.status(200).json({
            user : user,
            token : await user.generateToken(),
            userId: user._id
        }) 
   } catch(error) {
         return res.status(400).json({message: "Server Error.."})
   }
}
const user_login = async(req, res, next)=>{
    try{
        const {email, password} = req.body;  
        const userExist = await User.findOne({email});
        if(!userExist) {
            return res.status(400).json({message: "Invalid credentials"})
        } 
        const isPasswordValid = await userExist.comparePassword(password);
        if(!isPasswordValid) {
            return res.status(400).json({message: "Invalid email or password"})
        }
        return res.status(200).json({
            user : userExist,
            token : await userExist.generateToken(),
            userId: userExist._id
        })
   } catch(error) {
         return res.status(400).json({message: "Server Error.."})
   }
}

const user_logout = async(req, res, next)=>{
     const user = req.user;
     await BlackListToken.create({token: req.userToken})
     return res.status(200).json({message: "User logged out successfully!!"})
}

const get_user_profile = async(req, res, next)=>{
   try{
      const user = req.user;
      return res.status(200).json({user})
   } catch(error) {
      return res.status(400).json({message: "Server Error.."})
   }
}

const captain_register = async(req, res, next)=>{
   try{
      const {fullname, email, password, phoneNo, vehicle} = req.body;
      const captainExist = await Captain.findOne({email: email})
      if(captainExist) {
        return res.status(400).json({message: "Captain already exist with this email!"})
      }
      const captain = await Captain.create({fullname, email, password, phoneNo, vehicle});
      await captain.save();
      return res.status(200).json({
        captain: captain,
        token: await captain.generateToken(),
        captainId: captain._id,
      })
   } catch(error) {
      return res.status(400).json({message: "Server Error.."})
   }
}

const captain_login = async(req, res, next)=>{
    try{
       const {email, password} = req.body;
       const captainExist = await Captain.findOne({email: email})
       if(!captainExist) {
          return res.status(400).json({message: "Invalid credentials"})
       }
       const isPasswordValid = await captainExist.comparePassword(password)
       if(isPasswordValid) {
         return res.status(200).json({
            captain: captainExist,
            token: await captainExist.generateToken(),
            captainId: captainExist._id
         })
       }
    } catch(error) {
         return res.status(400).json({message: "Server Error.."})
    } 
}
const captain_logout = async(req, res, next)=>{
    try {
       //mark current captain token blacklisted
       await BlackListToken.create({token: req.captainToken})
       return res.status(200).json({message: "Captain logged out successfully!!"})
    } catch(error) {
        return res.status(400).json({message: "Server Error.."})
    }
}
const get_captain_profile = async(req, res, next)=>{
    try{ 
        const captain = req.captain;
        return res.status(200).json({captain})
    } catch(error) {
         return res.status(400).json({message: "Server Error.."})
    }
}

module.exports = { user_register, user_login, user_logout ,get_user_profile,
                   captain_register, captain_login, captain_logout,
                    get_captain_profile
                 }