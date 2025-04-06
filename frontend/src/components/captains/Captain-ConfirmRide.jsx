import React, { useContext, useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import { userDataContext } from '../../contexts/userContext'; 
import { BsCashStack } from "react-icons/bs";



const CaptainCofirmRide = (props) => {
  const { currentCaptain, captainAuthorizationToken  } = useContext(userDataContext)

  const [otp, setOtp] = useState("")
  const handleAccept = async()=>{ 
    if(props.ride.otp == otp) {
        props.setCaptainRidingPanel(true); 
        const sendData = { 
            "captainId" : currentCaptain._id,
            "rideId" : props.ride._id,
        }

        const response = await fetch('http://localhost:8080/api/ride/confirm', {
            method: "POST",
            headers: {
              'Authorization' : captainAuthorizationToken,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)
        })

        const data = await response.json();
        setOtp("")
 
        if(response.ok) { 
            props.setRide(data.rideData);
        }
    } else {
       alert("Invalid OTP")
    }
  }

  return (
    <>
      <h3 className='flex items-center justify-center mt-[-5px] mb-2 shadow-sm px-2 py-2 rounded' onClick={()=> props.setConfirmRidePanel(false)}><IoIosArrowDown /></h3> 
      <h1 className='flex items-center justify-center font-bold text-lg mb-2'>Confirm the Ride </h1> 
          
      <form action="" className='flex flex-col gap-1.5' onSubmit={(e)=> e.preventDefault()}>
             
          <div className='bg-white shadow-md shadow-gray-400 rounded mb-2 ml-1 mr-1'> 
            <div className='flex justify-between m-4 p-2 bg-white shadow-sm shadow-gray-500 rounded'>
                <div className='flex'>
                    <img src="https://img.freepik.com/premium-vector/futuristic-cityscape-with-selfdriving-cars-advanced-technology_1263357-35188.jpg?semt=ais_hybrid" alt="" className='h-15 w-15 rounded-full'/>
                    <h4 className='flex items-center text-center m-2'> {currentCaptain?.fullname.firstName + " " + currentCaptain?.fullname.lastName} </h4>
                </div>
                <div className='flex flex-col pr-4'>
                    <h4> &#8377; 295.20</h4>
                    <p className='text-center font-light text-gray-500'>Earned</p>
                </div>
            </div>

            <h4 className='font-semibold mt-6 mb-2 ml-3'>Ride Details</h4>
              {/* origin  */}
              <div className='flex items-start p-2 m-2'>
                <div className='mt-1 mr-3'>
                    <IoLocation className='text-gray-500' />
                </div>
                <div>
                    <p className='text-gray-500 text-sm'>Pickup</p>
                    <p className=''>{props.ride?.pickup}</p>
                </div>
              </div>

              {/* destination  */}
              <div className='flex items-start p-2 m-2'>
                  <div className='mt-1 mr-3'>
                      <IoLocation className='text-gray-500' />
                  </div>
                  <div>
                      <p className='text-gray-500 text-sm'>Destination</p>
                      <p className=''>{props.ride?.destination}</p>
                  </div>
              </div>

              {/* price  */}
              <div className='flex items-start p-2 m-2'>
                <div className='mt-1 mr-3'>
                  <BsCashStack className='text-gray-500' />
                </div>
                <div className='flex flex-col w-full'>
                    <p className='text-gray-500 text-sm'>Fare</p>
                    <div className='flex items-center justify-between'>
                      <p className=''>&#8377; {props.ride?.fare}</p>
                      <span className='text-gray-500 px-2 py-1 rounded shadow-sm'>Cash</span>
                    </div>
                </div>
              </div>

                  {/* otp  */}
              <div className='flex justify-center items-center m-2 mb-4'>
                  <input 
                    type="Number" 
                    placeholder='Enter OTP'
                    className='h-10 w-[90%] p-2 bg-gray-300 rounded'
                    value = {otp}
                    onChange={(e)=> setOtp(e.target.value)}
                  />
              </div>  
          </div>

            

            <div className='flex justify-between m-2'>
              <button className='bg-green-600 w-[40%] h-10 text-center rounded-2xl' onClick = {handleAccept} >
                Accept
              </button>
              <button className='bg-red-400 w-[40%] h-10 text-center rounded-2xl'  onClick={()=> props.setConfirmRidePanel(false)}>Ignore</button>
            </div>
        </form>
              
    </>
  )
}

export default CaptainCofirmRide