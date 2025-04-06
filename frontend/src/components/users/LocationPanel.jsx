import React, { useEffect, useState } from 'react'
import { IoLocation } from "react-icons/io5"; 
import { toast } from 'react-toastify';
 

const LocationPannel = (props) => { 
  const [predictions, setPredictions] = useState([]);
  const [p, setP] = useState(0);
  const [d, setD] = useState(0);

  const handleInput = async function(s){
     if(p) props.setPickUp(s);
     else if(d) props.setDestination(s);
  } 
 

  useEffect(()=>{
     setP(1);
     setD(0);
     const getSuggestions = (async()=>{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/maps/get_suggestions_of_search_data`,{
          method: "POST",
          headers: {
              'Content-Type' : 'application/json'
          }, 
          body: JSON.stringify({"searchData": props.pickUp})
        }) 
        let data = await response.json();  
 

        if(response.ok) {
          setPredictions(data.predictions);  
        } else {
          toast.error(`${data.message}`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark", 
            }); 
        }
     }) 
     if(props.pickUp.length) getSuggestions();
     props.setRide({});
  },[props.pickUp]);

  useEffect(()=>{
    setD(1);
    setP(0);
    const getSuggestions = (async()=>{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/maps/get_suggestions_of_search_data`,{
          method: "POST",
          headers: {
              'Content-Type' : 'application/json'
          }, 
          body: JSON.stringify({"searchData": props.destination})
        }) 
        let data = await response.json();  
        setPredictions(data.predictions);  
        props.setRide({});
    }) 
    if(props.destination.length) getSuggestions();
 },[props.destination]);
 

  return ( 
    <div>  
       {predictions?.map((s,idx) => (
          <div className='m-4 border-0.5 border-gray-400 rounded pt-1 pb-1' key={idx}> 
              <div className='flex' onClick={()=>handleInput(s)}>  
                <div className='h-8 w-8 rounded-full bg-[#eee] flex items-center justify-center ml-6 mt-1'> 
                  <IoLocation className='text-1xl'/> </div> <h5 className='ml-6 flex items-center'>{s}</h5> 
                </div> 
          </div> 
        ))}
    </div>
  )
}

export default LocationPannel