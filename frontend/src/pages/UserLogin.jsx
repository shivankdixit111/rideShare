import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userDataContext } from '../contexts/userContext';
import { toast } from 'react-toastify';
 

const userLogin = () => {
   const {setUserToken} = useContext(userDataContext);
   const navigate = useNavigate()

   const [User, setUser] = useState({ 
        email: "",
        password: "", 
    });
    const handleSubmit = async(e)=>{ 
        e.preventDefault(); 
        
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, {
           method: 'POST',
           headers: {
              'Content-Type' : 'application/json'
           },
           body: JSON.stringify(User),
        })
        const data = await response.json(); 
        if(response.ok) {  
          setUserToken(data.token);
          setUser({ 
            email: "",
            password: "", 
          });
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
          navigate("/user-home")
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
  
    const handleInput = async (e)=>{ 
        const name = e.target.name, value = e.target.value; 
        setUser((prevUser) => ({...prevUser,  [name] : value})) 
    }


  return (
    <div className='w-10/12 mx-auto mt-20 h-screen flex flex-col justify-between overflow-hidden'>
        <form onSubmit={handleSubmit} className='h-1/2'>
            <div className='gap-2 flex flex-col mb-5'>
              <h3 className='text-1xl font-bold '>What's your email</h3> 
              <input 
                 type="text"
                  className='bg-[#eee] h-9 w-full text-sm p-2 font-medium'
                  placeholder='example@gmail.com'
                  name = "email"
                  value = {User.email}
                  onChange = {handleInput}
              />
            </div>
            <div className='gap-2 flex flex-col'>
              <h3 className='text-1xl font-bold '>Enter Password</h3> 
              <input 
                 type="text"
                  className='bg-[#eee] h-9 w-full text-sm p-2 font-medium'
                  placeholder='Enter your password'
                  name = "password"
                  value = {User.password}
                  onChange = {handleInput}
              />
            </div>
            <button className='w-full bg-black text-white rounded h-9 flex mt-5 justify-center items-center'> Login </button>
            <h5 className='text-center mt-2'>New here? <Link to="/signup" className='text-blue-700'>Create new Account</Link></h5>
        </form>
        
        <Link to="/captain-login" className='w-full bg-orange-600 text-white rounded h-9 flex justify-center mb-30 items-center'> Sign in as Captain</Link>
    </div>
  )
}

export default userLogin