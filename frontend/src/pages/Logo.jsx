import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div className='absolute h-5 w-5 z-[100] rounded-full right-0 top-0 p-5 m-2 border-3 border-black flex items-center justify-center hover:bg-white'
      onClick={()=> navigate("/")}
    >
     <h3 className=' font-bold text-2xl'>R</h3>
  </div>
  )
}

export default Logo