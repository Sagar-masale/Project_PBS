import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import './index.css'
import RegisterContextProvider from './Components/Context/RegisterContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RegisterContextProvider>
    <App />
    </RegisterContextProvider>
  </React.StrictMode>
)
