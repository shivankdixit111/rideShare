 import React, { useEffect, useState } from 'react'
 import { createContext } from 'react'

 export const userDataContext = createContext();
 
 
 const userContext = ({children}) => { 
  const [userToken, setUserToken] = useState("")
  const [captainToken, setCaptainToken] = useState("")
  const [currentUser, setCurrentUser] = useState(null)
  const [currentCaptain, setCurrentCaptain] = useState(null)
  const userAuthorizationToken = `Bearer ${userToken}`
  const captainAuthorizationToken = `Bearer ${captainToken}`
  const [isUserLoading, setIsUserLoading] = useState(false)
  const [isCaptainLoading, setIsCaptainLoading] = useState(false)

  useEffect(()=>{
     setUserToken(localStorage.getItem("user-token"));
     setCaptainToken(localStorage.getItem("captain-token"))
  },[])

   useEffect(()=>{
      if(!userToken) return;

      const getCurrentUser = async function() {
         setIsUserLoading(true);
         try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/getProfile`, {
               method: 'GET',
               headers: {
                  'Authorization': userAuthorizationToken
               }
            })
            const data = await response.json(); 
            setCurrentUser(data.user) 
            localStorage.setItem("user-token", userToken)
         } catch(error) {
            console.log('error in user data fetching')
            setIsUserLoading(false);
         } finally {
            setIsUserLoading(false);
         }
      }
      getCurrentUser();
   },[userToken])

   useEffect(()=>{
      if(!captainToken) return;
      const getCurrentCaptain = async function() {
         setIsCaptainLoading(true);
         try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/captain/getProfile`, {
               method: 'GET',
               headers: {
                  'Authorization': captainAuthorizationToken
               }
            })
            const data = await response.json(); 
            setCurrentCaptain(data.captain) 
         } catch(error) {
            console.log('Error in Captain Data fetching ')
            setIsCaptainLoading(false);
         } finally {
            setIsCaptainLoading(false);
         }
      }
      getCurrentCaptain();
      localStorage.setItem("captain-token", captainToken);
   },[captainToken])

   return (
     <div>
        <userDataContext.Provider value = {{currentCaptain, currentUser, userAuthorizationToken, setUserToken, captainAuthorizationToken, setCaptainToken,
          isUserLoading, isCaptainLoading}}>
           {children}
        </userDataContext.Provider> 
     </div>
   )
 }
 
 export default userContext