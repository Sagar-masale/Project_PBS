import React from 'react'
import ReactDOM from 'react-dom/client'
import NavBar from './Components/NavBar/NavBar.jsx'
import Footer from './Components/Footer/Footer.jsx'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
import RegisterContextProvider from './Components/Context/RegisterContextProvider.jsx'
import ProfileContextProvider from './Components/Context/ProfileContextProvider.jsx'
import CartContextProvider from './Components/Context/CartContextProvider.jsx'

const GlobalLayout = ({ children }) => (
  <>
    <NavBar />
    <div className="content">{children}</div>
    <Footer />
  </>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RegisterContextProvider>
    <ProfileContextProvider>
      <CartContextProvider>
      <BrowserRouter>  {/* Wrap App with BrowserRouter */}
            <GlobalLayout>
              <App />
            </GlobalLayout>
          </BrowserRouter>
      </CartContextProvider>
    </ProfileContextProvider>
    </RegisterContextProvider>
  </React.StrictMode>
)
