import React, {useContext, useEffect, useRef, useState} from 'react'
import LocationPanel from '../components/users/LocationPanel'
import {socketDataContext} from '../contexts/socketContext'
import {userDataContext} from '../contexts/userContext'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import VehiclePanel from '../components/users/VehiclePanel';
import ConfirmRidePanel from '../components/users/ConfirmRidePanel'; 
import LookingForDriver from '../components/users/LookingForDriver'; 
import DriverOnTheWay from '../components/users/DriverOnTheWay';
import Loading from './Loading'; 
import LocationSearchPanel from '../components/users/LocationSearchPanel';
import { toast } from 'react-toastify'
 
const UserHome = () => {
  const [pickUp, setPickUp] = useState("")
  const [destination, setDestination] = useState("")
  const [vehicle, setVehicle] = useState("")
  const [rideRequestTrigger, setRideRequestTrigger] = useState(0)
  const [ride, setRide] = useState({});
  const [otp, setOtp] = useState({});
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const DriverOnTheWayRef = useRef(null);
  const lookingForDriverRef = useRef(null);
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [driverOntTheWay, setDriverOnTheWay] = useState(false);
  const [lookingForDriver, setLookingForDriver] = useState(false);

  const { currentUser, userAuthorizationToken, isUserLoading} = useContext(userDataContext)
  const { socket } = useContext(socketDataContext) 
 
  const rideHandlerRef = useRef(null);

  useEffect(()=>{
     socket.emit("join", {userType: "User", userId: currentUser?._id }) 

     const rideHandler =  (ride)=>{ 
        setRide(ride);
        setLookingForDriver(true); 
     }  
 
     socket.on('confirm-ride', rideHandler); // add new listener
  

  return ()=> {
    socket.off('confirm-ride', rideHandler)
  }
 
  },[currentUser, socket])
 
  
 
  useGSAP(()=>{ 
    if(panelOpen) {
      gsap.to(panelRef.current, {
          height: '67%'
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%'
      })
    }
  },[panelOpen]);


  useGSAP(()=>{ 
    gsap.to(vehiclePanelRef.current, {
       // height: "50% ", 
       height: vehiclePanel ? "95%" : "0%",
       opacity: vehiclePanel ? 1 : 0,
       duration: 0.5,
    }) 
}, [vehiclePanel])


useGSAP(()=>{ 
  gsap.to(confirmRidePanelRef.current, { 
     height: confirmRidePanel ? "98%" : "0%",
     opacity: confirmRidePanel ? 1 : 0,
     duration: 0.5,
  }) 
}, [confirmRidePanel])

useGSAP(()=>{ 
  gsap.to(lookingForDriverRef.current, { 
     height: lookingForDriver ? "100%" : "0%",
     opacity: lookingForDriver ? 1 : 0,
     duration: 0.5,
  }) 
}, [lookingForDriver])

useGSAP(()=>{ 
  gsap.to(DriverOnTheWayRef.current, { 
     height: driverOntTheWay ? "100%" : "0%",
     opacity: driverOntTheWay ? 1 : 0,
     duration: 0.5,
  }) 
}, [driverOntTheWay])
 

// creating a ride
 useEffect(()=>{  
   if(vehicle === "") return;
    const rideData = {
      origin: pickUp,
      destination: destination,
      vehicleType: vehicle,
    } 
 
    console.log('Ride is being prepared')
    const createRide = async()=>{
       const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/maps/get_origin_to_destination`, {
         method: "POST",
         headers: {
           'Content-Type': 'application/json',
           'Authorization': userAuthorizationToken,
         },
         body: JSON.stringify(rideData)
       }) 
       const data = await response.json(); 
 

       if(response.ok) {
          setRide(data.newRide); 
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
    }
    createRide();
 },[rideRequestTrigger]) 
 

  return (
    <>
    <div className='h-screen relative overflow-y-hidden w-screen' > 
        <img className='z-[30] object-cover h-[70%] w-full cursor-pointer' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" /> 

        <div className='h-screen top-0 absolute flex flex-col justify-end w-screen'>
          <LocationSearchPanel setPanelOpen={setPanelOpen} panelOpen={panelOpen}  setPickUp={setPickUp} setDestination={setDestination} 
             destination={destination}  pickUp={pickUp} setVehiclePanel={setVehiclePanel} 
          />

          <div className='w-full h-0 bg-orange-200' ref={panelRef}>
            <LocationPanel pickUp={pickUp} destination = {destination} setPickUp={setPickUp} setDestination={setDestination} vehiclePanel={vehiclePanel}  setVehiclePanel={setVehiclePanel}
              setPanelOpen={setPanelOpen}  setRide={setRide}
            />
          </div>

          <div className=' fixed overflow-hidden w-screen z-2 h-0.5 mb-3 bg-orange-200 gap-2 flex flex-col justify-center items-center'
             ref = {vehiclePanelRef} 
          >  
              <VehiclePanel setRide={setRide} setVehiclePanel={setVehiclePanel} setConfirmRidePanel={setConfirmRidePanel} setVehicle={setVehicle} setRideRequestTrigger={setRideRequestTrigger}/>
          </div>

          <div className=' fixed overflow-hidden w-screen z-5 h-[1%] p-1 mb-4 bg-orange-200 gap-2 flex flex-col justify-center items-center'
             ref = {confirmRidePanelRef}
          >
              <ConfirmRidePanel confirmRidePanel={confirmRidePanel} setConfirmRidePanel = {setConfirmRidePanel} vehicle={vehicle} setVehicle={setVehicle} setLookingForDriver = {setLookingForDriver} ride={ride}
               />
          </div>

          <div className=' fixed overflow-hidden w-screen z-5 h-1 p-1 mb-4 bg-orange-200 gap-2 flex flex-col justify-center items-center'
             ref = {lookingForDriverRef}
          >
              <LookingForDriver  
                setLookingForDriver={setLookingForDriver}  setDriverOnTheWay = {setDriverOnTheWay} ride={ride}
              />
          </div>

          <div className=' fixed overflow-hidden w-screen z-5 h-[0%] p-1 mb-4 bg-orange-200 gap-2 flex flex-col justify-center items-center'
             ref = {DriverOnTheWayRef}
          >
              <DriverOnTheWay
                  setDriverOnTheWay = {setDriverOnTheWay} ride={ride}
              />
          </div>

        </div>
       
    </div>
   
    </>
  )
}

export default UserHome
