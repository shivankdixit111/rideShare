const Ride = require("../models/Ride");
const { distinct } = require("../models/user-model");
const mapService = require('../services/map-service');
const { sendMessageToSocketId } = require("../socket");

const confirmRide = async(req, res)=>{
    try { 
        const {rideId, captainId} = req.body;
        if(!rideId || !captainId) {
            return res.status(400).json({message: "rideId and captainId both are required"})
        }

        const rideData = await Ride.findByIdAndUpdate(rideId, 
            {
                status: "accepted",
                captain: captainId,
            },
            { new: true}
        ).populate({path: 'user', select: "-password"}).populate({path: 'captain', select: "-password"})
 

        sendMessageToSocketId(rideData.user.socketId, {
            event: 'confirm-ride',
            data: rideData
        })

       

        return res.status(200).json({rideData})

    } catch(error) {
        return res.status(400).json({message: "Server Error.."})
    }
}

module.exports = { confirmRide };