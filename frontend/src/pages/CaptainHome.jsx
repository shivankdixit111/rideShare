import React, {useContext, useEffect, useRef, useState} from 'react' 
import CaptainRideAvailable from '../components/captains/Captain-RideAvailable';
import CaptainCofirmRide from '../components/captains/Captain-ConfirmRide';
import FinishRide from '../components/captains/Finish-Ride';
import CaptainRiding from '../components/captains/Captain-Riding';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import CaptainDetails from '../components/captains/Captain-Details';
import { GoHomeFill } from "react-icons/go";
import {socketDataContext} from '../contexts/socketContext'
import {userDataContext} from '../contexts/userContext'
import Loading from './Loading';


const CaptainHome = () => { 


  const [captainDetailsPanel, setCaptainDetailsPanel] = useState(true);
  const [ride, setRide] = useState({})
  const [rideAvailablePanel, setRideAvailablePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [captainRidingPanel, setCaptainRidingPanel] = useState(false); 
  const captainDetailsRef = useRef(null);
  const rideAvailableRef = useRef(null); 
  const confirmRideRef = useRef(null);
  const captainRideRef = useRef(null);  
  
 

  const {currentCaptain, isCaptainLoading} = useContext(userDataContext)
  const {socket} = useContext(socketDataContext);

  const rideHandlerRef = useRef(null);

 
  useEffect(()=>{ 
    if(!currentCaptain?._id || !socket) return; 
  
    const handleConnect = () => { 
      socket.emit("join", {userType: "Captain", userId: currentCaptain._id});
    };
  
    // Handle both immediate connection and future connections
    if(socket.connected) {
      handleConnect();
    } else {
      socket.on('connect', handleConnect);
    }

      // Create a stable handler reference
      rideHandlerRef.current = (data) => { 
        setRide(data);
        setRideAvailablePanel(true);
        setCaptainDetailsPanel(false);
      };
  
      // Add the listener
      socket.on('new-ride', rideHandlerRef.current);
   
  
    const updateLocation = ()=> navigator.geolocation.getCurrentPosition(position=>{ 
      return socket.emit('update-location', {
        userId: currentCaptain._id, 
        location: {
          ltd: position.coords.latitude,
          lng: position.coords.longitude,
        }
      });
    });
  
   
   
  
    const locationInterval = setInterval(updateLocation, 30000);
    
    return ()=> {
      clearInterval(locationInterval); 
      socket.off('connect', handleConnect); // Clean up connect listener

      if (rideHandlerRef.current) {
        socket.off('new-ride', rideHandlerRef.current);
      }
    }
  },[currentCaptain, socket]); // Added socket to dependencies
 

  
  useGSAP(()=>{
    gsap.to(captainDetailsRef.current,{
       height: captainDetailsPanel ? "55%" : "0%"
    })
  },[captainDetailsPanel])

  useGSAP(()=>{
    gsap.to(rideAvailableRef.current,{
       height: rideAvailablePanel ? "95%" : "0%"
    })
  },[rideAvailablePanel])

  useGSAP(()=>{
    gsap.to(confirmRideRef.current,{
       height: confirmRidePanel ? "98%" : "0%"
    })
  },[confirmRidePanel])

  useGSAP(()=>{
    gsap.to(captainRideRef.current,{
       height: captainRidingPanel ? "98%" : "0%"
    })
  },[captainRidingPanel]) 

 
  
   
  return (
    <>
    <div className=' h-screen relative overflow-y-hidden' > 
        <img className='object-cover h-[70%] w-full cursor-pointer' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" /> 
        
        <div className='h-screen top-0 absolute flex flex-col justify-end w-screen'>
            <GoHomeFill className='top-2 right-2 text-2xl rounded-2xl'/>
            <div className='fixed h-[0%] w-screen z-10 bg-orange-200' ref={captainDetailsRef}>
                <CaptainDetails setCaptainDetailsPanel={setCaptainDetailsPanel} setRideAvailablePanel={setRideAvailablePanel}/>
            </div>
            <div className='fixed h-[0%] w-screen z-11 bg-orange-200' ref={rideAvailableRef}>
                <CaptainRideAvailable setCaptainDetailsPanel={setCaptainDetailsPanel} setConfirmRidePanel={setConfirmRidePanel} setRideAvailablePanel={setRideAvailablePanel}
                  ride = {ride}
                />
            </div>
            <div className='fixed h-[0%] w-screen z-12 bg-orange-200' ref={confirmRideRef}>
                <CaptainCofirmRide setCaptainRidingPanel={setCaptainRidingPanel} setConfirmRidePanel={setConfirmRidePanel}
                  ride = {ride} setRide={setRide}
                />
            </div>
            <div className='fixed h-[0%] w-screen z-13 bg-orange-200 ' ref={captainRideRef}>
                <CaptainRiding setCaptainRidingPanel={setCaptainRidingPanel} setRideAvailablePanel={setRideAvailablePanel}
                    setConfirmRidePanel={setConfirmRidePanel}   ride = {ride} setCaptainDetailsPanel={setCaptainDetailsPanel}
                />
            </div> 
       
        </div>
    </div>
   
    </>
  )
}

export default CaptainHome
