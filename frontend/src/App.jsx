import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import UserSignUp from './pages/UserSignUp'
import UserLogin from './pages/UserLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import CaptainLogin from './pages/CaptainLogin'
import CaptainHome from './pages/CaptainHome'
import Logo from './pages/Logo'
import UserHome from './pages/UserHome'
import Riding from './pages/Riding'

const App = () => {
  return (
    <BrowserRouter> 
     <Logo/>
      <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/riding" element={<Riding/>}/>
         <Route path="/signup" element={<UserSignUp/>}/>
         <Route path="/login" element={<UserLogin/>}/>
         <Route path="/user-home" element={<UserHome/>}/>
         <Route path="/captain-signup" element={ <CaptainSignUp/> }/>
         <Route path="/captain-login" element={ <CaptainLogin/> }/>
         <Route path="/captain-home" element={ <CaptainHome/> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App