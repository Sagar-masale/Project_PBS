import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import './index.css'
import RegisterContextProvider from './Components/Context/RegisterContextProvider.jsx'
import ProfileContextProvider from './Components/Context/ProfileContextProvider.jsx'
import CartContextProvider from './Components/Context/CartContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RegisterContextProvider>
    <ProfileContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </ProfileContextProvider>
    </RegisterContextProvider>
  </React.StrictMode>
)
