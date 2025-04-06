import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userDataContext } from '../contexts/userContext'
import { toast } from 'react-toastify'; 


const captainSignUp = () => { 
  const { setCaptainToken } = useContext(userDataContext);
  const navigate = useNavigate();
  const [Captain, setCaptain] = useState({
    fullname: {
      firstName: "",
      lastName: "",
     },
     email: "",
     password: "",
     phoneNo: "",
     vehicle: {
       color: "",
       plate: "",
       capacity: "",
       vehicleType: ""
     }
  })
  
  const handleInput = (e)=>{
    const name = e.target.name, value = e.target.value;
    if(name == "firstName"  || name == "lastName") {
       setCaptain({...Captain, fullname: {...Captain.fullname, [name] : value}})
    } else if(name == "email" || name == "password" || name == "phoneNo") {
       setCaptain({...Captain, [name] : name=="phoneNo" ? Number(value) : value})
    } else {
       setCaptain({...Captain, vehicle: {...Captain.vehicle, [name] : name=="capacity" ? Number(value) : value}})
    }
  }

  const handleSubmit = async(e)=>{
     e.preventDefault(); 

     const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/captain/register`, {
        method: "POST",
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(Captain)
     })
     const data = await response.json(); 
     if(response.ok) {
        setCaptainToken(data.token);
        setCaptain({ 
          fullname: {
            firstName: "",
            lastName: "",
           },
           email: "",
           password: "",
           phoneNo: "",
           vehicle: {
             color: "",
             plate: "",
             capacity: "",
             vehicleType: ""
           }
        })
         toast.success(`${'SignUp successful'}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark", 
          }); 
        navigate("/captain-login")
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


  return (
    <div className='w-10/12 mx-auto mt-20 h-screen flex flex-col justify-between overflow-hidden'>
        <form onSubmit={handleSubmit} className='h-1/2 '>
           <div className='gap-2 flex flex-col mb-5'>
              <h3 className='text-1xl font-bold '>What's our Captain's name</h3> 
              <div>
                  <input 
                    type="text"
                      className='bg-[#eee] h-9 w-49/100 mr-2 p-2 text-sm  font-medium'
                      placeholder='First Name'
                      name = "firstName"
                      value = {Captain.fullname.firstName}
                      onChange = {handleInput}
                  />
                  <input 
                    type="text"
                      className='bg-[#eee] h-9 w-48/100 p-2 text-sm font-medium'
                      placeholder='Last Name'
                      name = "lastName"
                      value = {Captain.fullname.lastName}
                      onChange = {handleInput}
                  />
              </div>
            </div>

            <div className='gap-2 flex flex-col mb-5'>
              <h3 className='text-1xl font-bold '>What's our captain's email</h3> 
              <input 
                 type="text"
                  className='bg-[#eee] h-9 w-full p-2 text-sm font-medium'
                  placeholder='example@gmail.com'
                  name = "email"
                  value = {Captain.email}
                  onChange = {handleInput}
              />
            </div>
            <div className='gap-2 flex flex-col mb-5'>
              <h3 className='text-1xl font-bold '>Enter Password</h3> 
              <input 
                 type="text"
                  className='bg-[#eee] h-9 w-full p-2 text-sm font-medium'
                  placeholder='Enter your password'
                  name = "password"
                  value = {Captain.password}
                  onChange = {handleInput}
              />
            </div>
            <div className='gap-2 flex flex-col mb-5'>
              <h3 className='text-1xl font-bold '>Enter PhoneNo</h3> 
              <input 
                 type="text"
                  className='bg-[#eee] h-9 w-full p-2 text-sm font-medium'
                  placeholder='Enter PhoneNo'
                  name = "phoneNo"
                  value = {Captain.phoneNo}
                  onChange = {handleInput}
              />
            </div>
            <div className='mb-2'>
            <h3 className='text-1xl font-bold '>Vehicle</h3> 
                <div className='mb-2'>
                    <input 
                      type="text"
                        className='bg-[#eee] h-9 w-49/100 mr-2 p-2 text-sm  font-medium'
                        placeholder='Color'
                        name = "color"
                        value = {Captain.vehicle.color}
                        onChange = {handleInput}
                    />
                    <input 
                      type="text"
                        className='bg-[#eee] h-9 w-48/100 p-2 text-sm font-medium'
                        placeholder='Plate'
                        name = "plate"
                        value = {Captain.vehicle.plate}
                        onChange = {handleInput}
                    />
                </div>
                <div>
                    <input 
                      type="number"
                        className='bg-[#eee] h-9 w-49/100 mr-2 p-2 text-sm  font-medium'
                        placeholder='Capacity'
                        name = "capacity"
                        value = {Captain.vehicle.capacity}
                        onChange = {handleInput}
                    />
                    <select type="text" className='bg-[#eee] h-9 w-48/100 p-2 text-sm font-medium' placeholder='Vehicle Type'
                      name = "vehicleType"
                      value = {Captain.vehicle.vehicleType} 
                      onChange = {handleInput}
                    >
                      {Captain.vehicle.vehicleType == "" ? <option value="">Select Vehicle</option> : <option value="" disabled>Select Vehicle</option>}
                      <option value="Electric Bike">Electric Bike</option>
                      <option value="Petrol Bike">Petrol Bike</option>
                      <option value="Electric Scooty">Electric Scooty</option>
                      <option value="Petrol Scooty">Petrol Scooty</option> 
                    </select>
                </div>
            </div>
            <button className='w-full bg-black text-white rounded h-9 flex mt-5 justify-center items-center'> Register </button> 
            <h5 className='text-center mt-2'>Already have a account? <Link to="/captain-login" className='text-blue-700'>Login here</Link></h5>
        </form>
        
        <Link to="/login" className='w-full bg-green-500 text-white rounded h-9 flex justify-center mb-0.5 items-center'> Sign in as a User</Link>
    </div>
  )
}

export default captainSignUp