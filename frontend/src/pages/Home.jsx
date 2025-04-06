import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
     <div className='bg-red-400 h-screen flex flex-col justify-end w-full overflow-hidden'> 
         <div className='bg-white'>
             <div className='mb-5'>
               <h3 className='text-2xl text-center font-bold m-4'>Get Started With RideShare</h3>
               <div className='flex items-center justify-center'>
                  <Link to="/login" className = 'cursor-pointer bg-black text-white w-[85%] h-12 flex justify-center items-center mb-10 mt-2 overflow-x-hidden rounded'>Continue</Link>
               </div>
             </div>
         </div>
     </div>
  )
}

export default Home