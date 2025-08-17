const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    fullname: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        }
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: Number,
        required: true,
    },
    socketId: String,
     online: {
      type: Boolean,
      default: false  
    },
    lastActive: {
        type: Date,
        default: Date.now,
    }
});

//hashing of password will be done on pre() method
userSchema.pre('save', async function(next){
   try{
        const salt = 10;
        const user = this;
        if(!user.isModified('password')) return next(); //avoid double hashing  ismodified() intially true and get's false after save() it gets true if passowrd is changed explicitly
        const hashed_password = await bcrypt.hash(user.password, 10);
        user.password = hashed_password
        next();
   } catch(error) {
        console.log(error)
   }
})

//token creation by jwt
userSchema.methods.generateToken = async function(){
    try{
        const user = this;
        const token = await jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '30d',
            }
        )
        return token;
    } catch(error) {
        console.log(error)
    }
}
//passwrod comparison
userSchema.methods.comparePassword = async function(password){
    try{
        const user = this;
        const isPasswordValid = await bcrypt.compare(password, user.password); 
        return isPasswordValid;
    } catch(error) {
        console.log(error);
    }
}

const User = mongoose.model('User', userSchema);
module.exports = User;