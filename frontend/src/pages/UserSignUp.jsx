import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userDataContext } from '../contexts/userContext'
import { useContext } from 'react'
import { toast } from 'react-toastify'
 
const userSignUp = () => { 
  const {setUserToken} = useContext(userDataContext)
  const navigate = useNavigate();

  const [User, setUser] = useState({
      fullname: {
       firstName: "",
       lastName: "",
      },
      email: "",
      password: "",
      phoneNo: "",
  });
  const handleSubmit = async(e)=>{ 
      e.preventDefault(); 
      
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`, {
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
          fullname: {
           firstName: "",
           lastName: "",
          },
          email: "",
          password: "",
          phoneNo : "",
        });
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
      if(name === "firstName" || name === "lastName"){ 
        setUser((prevUser) => ({...prevUser, fullname: {...prevUser.fullname, [name] : value}}))
      } else {
        setUser((prevUser) => ({...prevUser,  [name]: name=="phoneNo" ? Number(value) : value}))
      }
  }



  return (
    <div className='w-10/12 mx-auto mt-20 h-screen flex flex-col justify-between overflow-hidden'>
        <form onSubmit = {handleSubmit} className='h-1/2'>
           <div className='gap-2 flex flex-col mb-5'>
              <h3 className='text-1xl font-bold '>What's your name</h3> 
              <div>
                  <input 
                    type="text"
                      className='bg-[#eee] h-9 w-49/100 mr-2 p-2 text-sm  font-medium'
                      placeholder='First Name'
                      value = {User.fullname.firstName}
                      onChange = {handleInput}
                      name = "firstName"
                  />
                  <input 
                    type="text"
                      className='bg-[#eee] h-9 w-48/100 p-2 text-sm font-medium'
                      placeholder='Last Name'
                      value = {User.fullname.lastName}
                      onChange = {handleInput}
                      name = "lastName"
                  />
              </div>
            </div>

            <div className='gap-2 flex flex-col mb-5'>
              <h3 className='text-1xl font-bold '>What's your email</h3> 
              <input 
                 type="text"
                  className='bg-[#eee] h-9 w-full p-2 text-sm font-medium'
                  placeholder='example@gmail.com'
                  onChange = {handleInput}
                  value = {User.email}
                  name = "email"
              />
            </div>
            <div className='gap-2 flex flex-col mb-5'>
              <h3 className='text-1xl font-bold '>Enter Password</h3> 
              <input 
                 type="text"
                  className='bg-[#eee] h-9 w-full p-2 text-sm font-medium'
                  placeholder='Enter your password'
                  onChange = {handleInput}
                  value = {User.password}
                  name = "password"
              />
            </div>
            <div className='gap-2 flex flex-col'>
              <h3 className='text-1xl font-bold '>Enter PhoneNo</h3> 
              <input 
                 type="number"
                  className='bg-[#eee] h-9 w-full p-2 text-sm font-medium'
                  placeholder='Enter PhoneNo'
                  onChange = {handleInput}
                  value = {User.phoneNo}
                  name = "phoneNo"
              />
            </div>
            <button className='w-full bg-black text-white rounded h-9 flex mt-5 justify-center items-center'> Register </button> 
            <h5 className='text-center mt-2'>Already have a account? <Link to="/login" className='text-blue-700'>Login here</Link></h5>
        </form>
        
        <Link to="/captain-login" className='w-full bg-orange-600 text-white rounded h-9 flex justify-center mb-20 items-center'> Sign in as Captain</Link>
    </div>
  )
}

export default userSignUp