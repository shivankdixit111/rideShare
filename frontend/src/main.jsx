import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import  UserContext from './contexts/userContext.jsx'
import {ToastContainer} from 'react-toastify'
import SocketContext from './contexts/socketContext.jsx'
 
createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <UserContext>
      <SocketContext>
        <App />
         <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark" 
              toastClassName="toastBody"
            />
      </SocketContext>
    </UserContext>
  // </StrictMode>,
)
