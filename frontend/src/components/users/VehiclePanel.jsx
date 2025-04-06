import React from 'react'
import { IoMdPerson } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import {vehicles} from '../../assets/vehicleType'




const VehiclePanel = ({setPanelOpen, setVehiclePanel, setConfirmRidePanel, setVehicle, setRide, setRideRequestTrigger}) => { 
  return ( 
       <> 

        <h3 className='text-center mt-[-10px] mb-2 shadow-sm px-10 py-2 rounded' onClick={()=> {setVehiclePanel(false); setRide({});}}><IoIosArrowDown /></h3> 
        <h1 className='font-bold text-xl'>Choose Your Vehicle</h1>

        <div className='grid grid-cols-2 gap-4 pl-4 pr-4 pt-2 shadow-lg bg-blue-50 rounded mx-auto'>
            {vehicles.map((vehicle, idx) => (

                <div className=' bg-white pt-2 pb-6 flex flex-col gap-2 pl-4 pr-4 shadow-gray-400 shadow-2xl rounded mt-3'
                    onClick = {()=> {setConfirmRidePanel(true), setVehicle(vehicle.type), setRideRequestTrigger((prev)=> prev+1), setRide({})}} key={idx}>
                    <img className='w-22 h-22 object-cover' src={vehicle.image} alt="" />
                    <h3 className='flex justify-between'>{vehicle.type} </h3>
                    <div className='flex flex-col text-gray-600 hover:text-black'> 
                        <p className='flex items-center justify-between mr-6 text-sm'>Capacity<IoMdPerson /> : 1</p> 
                        <p className='flex justify-center items-center text-sm'>ETA <IoLocation className='text-gray-500 ' /> : 5 mins away</p>   
                        <p className='text-sm'>Price : &#8377; {vehicle.price}</p>
                    </div>   
                </div> 
            ))}
        </div>
       
        
        </>
  )
}

export default VehiclePanel