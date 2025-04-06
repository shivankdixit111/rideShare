import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const CaptainRiding = (props) => {
  const navigate = useNavigate();
  const handleFinish = ()=>{ 
     props.setConfirmRidePanel(false);
     props.setRideAvailablePanel(false);
     props.setCaptainRidingPanel(false);
     props.setCaptainDetailsPanel(true);
  }
  return (
    <>
        <h3 className='flex items-center justify-center mt-[-5px] mb-2 shadow-sm px-2 py-2 rounded' onClick={()=> props.setCaptainRidingPanel(false)}><IoIosArrowDown /></h3> 
        <div className='flex justify-around mt-10'> 
            <h4>{props.ride?.distance} KM away</h4>
            <button className='bg-green-600 w-[40%] h-10 rounded-2xl' onClick={ handleFinish }>
                Complete
            </button>
        </div>
    </>
  )
}

export default CaptainRiding