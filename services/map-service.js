const Captain = require("../models/captain-model");
 

const get_origin_to_dest = async(origin, destination)=>{
   try { 
        const response = await fetch(`https://maps.gomaps.pro/maps/api/directions/json?destination=${destination}&origin=${origin}&key=${process.env.GO_MAPS_API_KEY_1}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        }); 
        let data = await response.json();
        data = data.routes[0].legs[0];  
        return data; 
   } catch(error) {
      return res.status(400).json("error in api fetch")
   }
}

const getSuggestions = async(searchData) => {
    try{ 
        const response = await fetch(`https://maps.gomaps.pro/maps/api/place/queryautocomplete/json?input=${searchData}&key=${process.env.GO_MAPS_API_KEY_1}`,{
            method: "GET",
            headers: {
                'Content-Type' : 'applicaton/json'
            }
        })
        const predictions = []
        let data = await response.json(); 
        for(let p of data.predictions) predictions.push(p.description); 
        return predictions;
    } catch(error) {
        console.log(error)
        return res.status(400).json("error in api fetch")
    }
}
const get_origin_to_destination_fare = async(distance, vehicleType)=>{
      let price = 0;
      if(vehicleType=="auto") price = Math.floor(distance*15);
      else if(vehicleType=="moto") price = Math.floor(distance*8);
      else price = Math.floor(distance*20); //car
      return price;
}

const get_nearby_captains = async(ltd, lng)=>{ 
    try{  
      const radiusInKm = 10;
        const radiusInRadians = radiusInKm / 6378.1; // Earth's radius in km

        const Captains = await Captain.find({
            "location.coordinates": {
                $geoWithin: {
                    $centerSphere: [[lng, ltd], radiusInRadians] // lng first, then ltd
                }
            }
        });
 
        return Captains; 

   } catch(error) {     
        return res.status(400).json({message: "Server Error"})
   }
}
 

module.exports = {get_origin_to_dest, getSuggestions, get_origin_to_destination_fare, get_nearby_captains};