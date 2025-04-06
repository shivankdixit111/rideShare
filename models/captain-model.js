const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const captainSchema = new mongoose.Schema({
    fullname: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
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
    vehicle: {
        color: {
            type: String,
            required: true,
        },
        plate: {
            type: String,
            requird: true,
        },
        capacity: {
            type: Number,
            required: true,
        },
        vehicleType: {
            type: String,
            required: true,
        }
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],  // GeoJSON format requires "Point"
            required: true,
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [longitude, latitude] 
            index: '2dsphere',
        }
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
})

captainSchema.methods.generateToken = async function(){
    try{
       const captain = this;
       const token = await jwt.sign(
         {
            captainId: captain._id
         },
         process.env.JWT_SECRET_KEY,
         {
            expiresIn: '30d'
         }
       ) 
       return token;
    } catch(error) {
        return res.status(400).json({message: "Server error"})
    }
}

captainSchema.methods.comparePassword = async function(password) {
    try{
        return bcrypt.compare(password, this.password);
    } catch(error) {
        return res.status(400).json({message: "Server error"})
    }
}
//hashing the password
captainSchema.pre('save', async function(next){
    try{
       if(!this.isModified('password')) return next(); //if user password is not modified then return next()
       const salt = 10;
       this.password = await bcrypt.hash(this.password, salt);
       next();
    } catch(error) {
        return res.status(400).json({message: "Server error"})
    }
})

const Captain = mongoose.model('Captain', captainSchema);
module.exports = Captain;