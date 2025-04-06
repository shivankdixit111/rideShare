import { Children, createContext, useEffect } from 'react'
import { io } from 'socket.io-client'

export const socketDataContext = createContext();

const socket = io(`${import.meta.env.VITE_BACKEND_URL}/`)

const socketContext = ({children})=>{

    useEffect(()=>{
        console.log("Socket connected status:", socket.connected);

        socket.on('connect' , ()=>{
           console.log('Connected to server') 
        })
        socket.on('disconnect', ()=>{
           console.log('Disconnected from the server')
        })
    },[socket])
     
    return (
        <div>
            <socketDataContext.Provider  value={{ socket }}>
                {children}
            </socketDataContext.Provider>
        </div>
    )
}

export default socketContext