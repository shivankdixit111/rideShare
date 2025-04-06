const mongoose = require('mongoose')
const User = require('./user-model')
const Captain = require('./captain-model')

const RideSchema = new mongoose.Schema({
    user: {
       type: mongoose.Types.ObjectId,
       ref: User,
       required: true     
    },
    captain: {
        type: mongoose.Types.ObjectId,
        ref: Captain
    },
    pickup: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    fare: {
        type: Number,
        required: true,
    },
    vehicleType: {
        type: String,
        required: true,
    },
    otp: {
       type: Number,
       required: true
    }, 
    status: {
        type: String,
        enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
        default: "pending"
    },
    duration: String,
    distance: Number,
    paymentID: String,
    orderID: {
       type: String,
    },
    signature: {
        type: String,
    }
})

const Ride = new mongoose.model('Ride', RideSchema)
module.exports = Ride;