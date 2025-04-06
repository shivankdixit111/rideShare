import React from 'react'
import { MdWatchLater, MdKeyboardArrowDown } from "react-icons/md"; 

const LocationSearchPanel = (props) => {
  return (
    <div className='h-[40%] pb-2 bg-orange-200' >
       <h3 className='text-2xl text-gray-700 hover:text-gray-950  font-serif font-bold ml-2 mt-4 mb-6 text-center'>Find a trip</h3>
        <div className='relative'>
            <input 
                className='w-[85%] h-10 mb-3 bg-[#eee] mx-7 rounded-2xl pl-12 shadow
                focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent'
                type="text" 
                placeholder='Add a pick-up location'
                onClick = {()=> props.setPanelOpen(true)}
                value = {props.pickUp}
                onChange={(e)=> props.setPickUp(e.target.value)}
            />
            <div className='absolute top-2.5 left-9 h-5 w-5 bg-orange-600 rounded-full'></div>
        </div>
        <div className='relative'>
            <input 
                className='w-[85%] h-10 mb-3 bg-[#eee] mx-7 rounded-2xl pl-12 shadow
                focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent'
                type="text" 
                placeholder = 'Enter your destination'
                onClick = {()=> props.setPanelOpen(true)}
                value = {props.destination}
                onChange={(e)=> props.setDestination(e.target.value)}
            />
            <div className='absolute top-2.5 left-9 h-5 w-5 bg-green-600 rounded-full'></div>
        </div>
     
      <div className='flex pl-7'>
          <button 
            className='flex bg-[#eee] h-10 w-[45%] rounded-4xl items-center justify-around mr-6'
              onClick = {()=> props.setPanelOpen(false)}
            >
              <MdWatchLater className='text-md text-orange-400'/> 
                Leave Now
              <MdKeyboardArrowDown className='text-md'/>
          </button>
          {props.panelOpen ? 
            <button className='bg-green-600 text-white h-10 w-[40%] items-center justify-center flex rounded-4xl
               bg-gradient-to-r from-orange-500 to-orange-600 hover:brightness-105'
                onClick={()=> {props.setVehiclePanel(true); props.setPanelOpen(false)}}
            >
              Find Trip
            </button> : <></>
          }
      </div>
    </div>
  )
}

export default LocationSearchPanel