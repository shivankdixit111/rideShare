import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import { BsCashStack } from "react-icons/bs";
import Loading from '../../pages/Loading';
import {vehicles} from '../../assets/vehicleType' 

const ConfirmRidePanel = ({confirmRidePanel, setConfirmRidePanel, setLookingForDriver, ride, vehicle, setVehicle}) => { 
   
  if(confirmRidePanel===true) { 
     if(!ride || '{}'=== JSON.stringify(ride)) {
      return (
        <>
          <h3 className='text-center mb-2 z-10 fixed top-0 shadow-sm px-10 py-2 rounded' onClick={()=> {setConfirmRidePanel(false);}}><IoIosArrowDown /></h3> 
          <Loading /> 
          <div className='mt-25 text-gray-600 text-sm'>
              <p>Please wait while we prepare your ride...</p> 
          </div>
        </>
      ); 
    }
  } 
  
  let imgUrl = ".ij.png"
  for(let vh of vehicles) { 
     if(vh.type === vehicle) {
       imgUrl = vh.image; 
       break
     }
  } 
 

  return (
    <>
      <h3 className='text-center mb-2 shadow-sm px-10 py-2 rounded' onClick={()=> {setConfirmRidePanel(false); }}><IoIosArrowDown /></h3> 
      <h1 className='font-bold text-xl'>Confirm Your Ride </h1>
             
          
      <form action="" className='flex flex-col gap-2 items-center mt-6' onSubmit={(e)=> e.preventDefault()}>
          <div className='bg-white shadow-md shadow-gray-400 p-3 rounded mb-2'>

              <div className='flex justify-around mt-2'>
                <img className='w-22 h-22 object-cover bg-transparent' src={imgUrl} alt="" />
                <div className='bg-blue-200 rounded h-14 p-2 items-center flex justify-center my-auto'> <h4 className='flex items-center justify-center text-black'>Otp : {ride?.otp}</h4></div>
              </div>

               <h4 className='font-semibold mt-6 mb-2 ml-3'>Ride Details</h4>
               <div className='flex items-start p-2 m-2'>
                  <div className='mt-1 mr-3'>
                     <IoLocation className='text-gray-500' />
                  </div>
                  <div>
                     <p className='text-gray-500 text-sm'>Pickup</p>
                     <p className=''>{ride?.pickup}</p>
                  </div>
               </div>
               <div className='flex items-start p-2 m-2'>
                  <div className='mt-1 mr-3'>
                     <IoLocation className='text-gray-500' />
                  </div>
                  <div>
                     <p className='text-gray-500 text-sm'>Destination</p>
                     <p className=''>{ride?.destination}</p>
                  </div>
               </div>
               <div className='flex items-start p-2 m-2'>
                  <div className='mt-1 mr-3'>
                    <BsCashStack className='text-gray-500' />
                  </div>
                  <div className='flex flex-col w-full'>
                     <p className='text-gray-500 text-sm'>Fare</p>
                     <div className='flex items-center justify-between'>
                        <p className=''>&#8377; {ride?.fare}</p>
                        <span className='text-gray-500 px-2 py-1 rounded shadow-sm'>Cash</span>
                     </div>
                  </div>
               </div>
          </div>
 

          {/* btn  */} 
          <button onClick={()=> { setLookingForDriver(true); }} className='bg-green-600 py-2 w-full text-center rounded-2xl'>
                Confirm
          </button> 
        </form>
              
    </>
  )
}

export default ConfirmRidePanel