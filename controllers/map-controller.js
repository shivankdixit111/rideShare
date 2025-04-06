
const { search } = require('../app');
const Captain = require('../models/captain-model');
const Ride = require('../models/Ride');
const mapService = require('../services/map-service');
const { sendMessageToSocketId } = require('../socket');


const get_origin_to_destination = async(req, res, next)=>{
    try{
       let {origin, destination, vehicleType} = req.body; 
       let data = await mapService.get_origin_to_dest(origin, destination);
       let {start_location, end_location, distance, duration} =  data; 
       distance = Number(distance.value); // in meter
       distance /= 1000;
       duration = (duration.text); //in string (x hours y minutes)
       
       let fare = 0;
       if(vehicleType=="Electric Bike" || vehicleType=="Electric Scooty") fare = Math.ceil(distance*1.5);
       if(vehicleType=="Petrol Bike") fare = Math.ceil(distance*2.2); 
       if(vehicleType=="Petrol Scooty") fare = Math.ceil(distance*2);  
 
       const otp = Math.floor(Math.random()*1000000 + 1)
 
       
       //new ride
       const newRide = await Ride.create({pickup : origin, destination, fare, user:req.user, vehicleType, otp, distance, duration})
      
       
       //finding nearby captains within 10km radius
       const Captains = await mapService.get_nearby_captains(start_location.lat, start_location.lng)

      //  //sending Captains(which has same vehicle type required by user) a message regarding ride
       for(let captain of Captains) {   
         if(captain.vehicle.vehicleType == vehicleType) {  
            sendMessageToSocketId(captain.socketId, {
               event: 'new-ride',
               data: newRide
            })
         } 
      }
 
       return res.status(200).json({newRide})
    } catch(err) {
        return res.status(400).json({message: "Server Error.."})
    }
}

const get_suggestions_of_search_data = async(req, res, next)=>{
   try{
      const {searchData} = req.body; 
      const predictions = await mapService.getSuggestions(searchData); 
      return res.status(200).json({predictions})
   } catch(err) { 
     return res.status(400).json({message: "Server Error.."})
   }
}  



module.exports = { get_origin_to_destination, get_suggestions_of_search_data };