import React from 'react' 
import { IoLocation } from "react-icons/io5";
 

const Riding = () => {
  return (
   <div className='h-screen'>
        <img className=' object-cover h-1/2 w-full cursor-pointer' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" /> 
        <div className='flex gap-2 h-1/2 flex-col'> 
            <div className='flex justify-around'>
                <img className='w-22 h-22 object-contain' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_537/v1569352630/assets/4b/28f11e-c97b-495a-bac1-171ae9b29362/original/BlackSUV.png" alt="" />
                <div>
                    <h3>Shivank</h3>
                    <h5>UP32 PB 1629</h5>
                    <p>TVS Raider</p>
                </div>
            </div>

            <form action="" className='' onSubmit={(e)=> e.preventDefault()}>
                {locations.map((ele,idx)=>(  
                    <div className='m-2 border-0.5 border-gray-400 rounded pt-1 pb-1'>
                    <div className='flex'>  <div className='h-8 w-8 rounded-full bg-[#eee] flex items-center justify-center ml-6 mt-1'> <IoLocation className='text-1xl'/> </div> <h3 className='ml-6 flex items-center'>{ele.place}</h3> </div>
                    <p className='ml-20 text-sm'>{ele.address}</p>
                    </div> 
                ))}
                {/* cash  */}
                <div className='m-2 border-0.5 border-gray-400 rounded pt-1 pb-1'>
                    <div className='flex'>  <div className='h-8 w-8 rounded-full bg-[#eee] flex items-center justify-center ml-6 mt-1'> <IoLocation className='text-1xl'/> </div> <h3 className='ml-6 flex items-center'>199</h3> </div>
                    <p className='ml-20 text-sm'>Cash</p>
                </div>  
        
                <button className='bg-green-600 w-[90%] h-10 text-center rounded-2xl'>Make the payment</button>
            </form>
        </div>
   </div>
  )
}

export default Riding