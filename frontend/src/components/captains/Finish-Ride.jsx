import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
 

const FinishRide = (props) => {
  return (
    <>
       <h3 className='flex items-center justify-center mt-[-5px] mb-2 shadow-sm px-2 py-2 rounded' onClick={()=> props.setFinishRidePanel(false)}><IoIosArrowDown /></h3> 
      <h1 className='flex items-center justify-center font-semibold text-1xl '>Finish the Ride </h1>
        <div className='flex justify-between ml-4 mr-4 bg-amber-300 rounded-2xl'>
            <div className='flex'>
                <img src="https://img.freepik.com/premium-vector/futuristic-cityscape-with-selfdriving-cars-advanced-technology_1263357-35188.jpg?semt=ais_hybrid" alt="" className='h-15 w-15 rounded-full'/>
                <h4 className='flex items-center text-center m-2'> Rohan Singh </h4>
            </div>
            <div className='flex flex-col pr-4'>
                <h4>295.20</h4>
                <p className='text-center font-light text-gray-500'>Earned</p>
            </div>
        </div>
          
      <form action="" className='' onSubmit={(e)=> e.preventDefault()}>
             
            {locations.map((ele,idx)=>(  
                <div className='m-2 border-0.5 border-gray-400 rounded pt-1 pb-1' key={idx}>
                <div className='flex'>  <div className='h-8 w-8 rounded-full bg-[#eee] flex items-center justify-center ml-6 mt-1'> <IoLocation className='text-1xl'/> </div> <h3 className='ml-6 flex items-center'>{ele.place}</h3> </div>
                <p className='ml-20 text-sm'>{ele.address}</p>
                </div> 
            ))}
            {/* cash  */}
            <div className='m-2 border-0.5 border-gray-400 rounded pt-1 pb-1'>
                <div className='flex'>  <div className='h-8 w-8 rounded-full bg-[#eee] flex items-center justify-center ml-6 mt-1'> <IoLocation className='text-1xl'/> </div> <h3 className='ml-6 flex items-center'>199</h3> </div>
                <p className='ml-20 text-sm'>Cash</p>
            </div>   
            
            <div className='flex justify-center items-center'>
               <button className='bg-green-600 w-[80%] h-10 text-center rounded-2xl '>Finish the Ride</button> 
            </div> 
        </form>
              
    </>
  )
}

export default FinishRide