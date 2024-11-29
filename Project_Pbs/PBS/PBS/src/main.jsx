import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import './index.css'
import RegisterContextProvider from './Components/Context/RegisterContextProvider.jsx'
import ProfileContextProvider from './Components/Context/ProfileContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RegisterContextProvider>
    <ProfileContextProvider>
      <App />
    </ProfileContextProvider>
    </RegisterContextProvider>
  </React.StrictMode>
)
