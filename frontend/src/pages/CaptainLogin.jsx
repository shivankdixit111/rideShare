import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userDataContext } from '../contexts/userContext'
import { toast } from 'react-toastify';


const captainLogin = () => {
  const { setCaptainToken } = useContext(userDataContext);
  const navigate = useNavigate();
  const [Captain, setCaptain] = useState({ 
      email: "",
      password: "", 
  })
  const handleInput = (e)=>{
    const name = e.target.name, value = e.target.value;
    setCaptain({...Captain, [name] : value})
  }
  const handleSubmit = async(e)=>{
     e.preventDefault(); 

     console.log('backend url is ', import.meta.env.VITE_BACKEND_URL);
 

     const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/captain/login`, {
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
          email: "",
          password: "", 
        }) 
        toast.success(`${'Login successful'}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark", 
        }); 
        navigate("/captain-home")
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
      <form onSubmit = {handleSubmit} className='h-1/2'>
           <div className='gap-2 flex flex-col mb-5'>
              <h3 className='text-1xl font-bold '>What's our captain's email</h3> 
              <input 
                 type="email"
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
          <button className='w-full bg-black text-white rounded h-9 flex mt-5 justify-center items-center'> Login </button>
          <h5 className='text-center mt-2'>New here? <Link to="/captain-signup" className='text-blue-700'>Create new Account</Link></h5>
      </form>
      
      <Link to="/login" className='w-full bg-green-500 text-white rounded h-9 flex justify-center mb-30 items-center'> Sign in as a User</Link>
     </div>
  )
}

export default captainLogin