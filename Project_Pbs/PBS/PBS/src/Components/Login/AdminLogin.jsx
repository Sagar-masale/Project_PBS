import React from 'react'
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './AdminLogin.css';
import AdminContext from '../Context/AdminContext';


function AdminLogin() {

    const [emailOrPhoneAdmin, setEmailOrPhoneAdmin] = useState('');
    const [passwordAdmin, setPasswordAdmin] = useState('');
    const [accessTokenAdmin, setAccessTokenAdmin] = useState('');


    const {setAdminData, setAdminLoginNotify} = useContext(AdminContext);




    const toggleClass = (selector, className) => {
        document.querySelector(selector).classList.toggle(className);
      };
    
    const CloseLoginBox=()=>{
        toggleClass('.AdminLoginBox','AdminLoginBoxShow');
    }

    const  fetchAdminProfile = async () => {
      try {
        const accessTokenAdmin = localStorage.getItem('accessTokenAdmin');
        if (!accessTokenAdmin) {
          throw new Error('No access token found. Please log in again.');
        }
  
        // Make the API request with the Authorization header
        const response = await axios.get('http://localhost:8000/api/v1/admins/current-admin', {
          headers: {
            Authorization: `Bearer ${accessTokenAdmin}`,
          },
        });
        
        // Log the admin data
        // console.log('admin Profile:', response.data);
        console.log('admin', response);
        
        setAdminData(response.data)
        
        
  
        // Update state with fetched data
       
        
        
        
  
      } catch (error) {
        if (error.response?.status === 401) {
          console.warn('Access token expired. Attempting to refresh...');
          const success = await refreshAccessTokenAdmin();
          if (success) {
            fetchAdminProfile();  // Retry after refreshing
          } else {
           // alert('Session expired. Please log in again.');
          }
        } else {
          console.error('Error fetching profile:', error);
          //alert('Failed to fetch user data. Please try again.');
        }
      }
    };

    
  
    // Fetch user data when the component mounts
    useEffect(() => {
      fetchAdminProfile();
    }, [accessTokenAdmin]);

    const refreshAccessTokenAdmin = async () => {
      try {
        const refreshTokenAdmin = localStorage.getItem('refreshTokenAdmin');
        if (!refreshTokenAdmin) throw new Error('No refresh token found');
    
        const response = await axios.post('http://localhost:8000/api/v1/admins/refresh-token-admin', { refreshTokenAdmin });
        if (response.data?.success) {
          const { accessTokenAdmin, refreshTokenAdmin: newRefreshTokenAdmin } = response.data.data || {};
    
          localStorage.setItem('accessTokenAdmin', accessTokenAdmin);
          localStorage.setItem('refreshTokenAdmin', newRefreshTokenAdmin);
          setAccessTokenAdmin(accessTokenAdmin);  // Update state
    
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error refreshing token:', error);
        localStorage.clear();  // Clear tokens on error
        setAccessTokenAdmin('');    // Reset state
        return false;
      }
    };
    
      // Check for access token when the component mounts
      useEffect(() => {
        const storedAccessTokenAdmin = localStorage.getItem('accessTokenAdmin');
        if (storedAccessTokenAdmin) {
          setAccessTokenAdmin(storedAccessTokenAdmin);
        }
      }, []);






    const AdminLogin = async (e) => {
      e.preventDefault();
      // setRegisterErrStatus("");
      // setIsLoading(true); // Start loading spinner
  
      try {
        // Email and phone number validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let payload = {};
  
        if (emailRegex.test(emailOrPhoneAdmin)) {
          payload.adminEmail = emailOrPhoneAdmin; // Valid email
        } else if (/^\d{10}$/.test(emailOrPhoneAdmin)) {
          payload.adminPhoneNumber = emailOrPhoneAdmin; // Valid phone number
        } else {
          alert("Please enter a valid email or phone number.");
          // setIsLoading(false);
          return;
        }
  
        payload.adminPassword = passwordAdmin;
  
        // API Call
        const response = await axios.post(
          "http://localhost:8000/api/v1/admins/login-admin",
          payload
        );
  
        if (response.data.success) {
          const { accessToken, refreshToken } = response.data.data;
          CloseLoginBox()
          // Store tokens
          localStorage.setItem("accessTokenAdmin", accessToken);
          localStorage.setItem("refreshTokenAdmin", refreshToken);
  
          setAccessTokenAdmin(accessToken);
          setAdminLoginNotify(true);
          
  
          // Redirect to dashboard
          // window.location.href = "/admin/dashboard";
        } else {
          // setRegisterErrStatus(response.data.message || "Login failed.");
        }
      } catch (err) {
        console.error("Error:", err.response?.data?.message || err.message);
        // setRegisterErrStatus(err.response?.data?.message || "An error occurred.");
      } finally {
        // setIsLoading(false); // Stop loading spinner
      }
    };

 
 

  return (
    <div className="Login-Main-Container">
      
    <div className="Login-Pass-Container">
      <div className="LeftSide-Block-Login rounded-l-lg bg-white h-full">
      <span
            className="material-symbols-outlined Close-Login-Box-Arrow-Phn  relative cursor-pointer"
            onClick={CloseLoginBox}
          >
            close
          </span>
        <h1 className="LoginName text-3xl">Admin</h1>
        <div className="Top-Side mt-8">
          <span className="TypeLogin1 AdminLogin-TypeOtp">
            <span className="UseOtp cursor-not-allowed">Using OTP</span>
          </span>
          <span className="w-full AdminLogin-TypePass">
            <span className="UseOtp cursor-pointer">Using Password</span>
          </span>
        </div>

        <div className="Input-Username mt-8 w-full">
          <form onSubmit={AdminLogin} className="FormUser" method='post'>
            <div className="SetInputFeilds_Admin flex flex-col gap-9 w-full">
            <input
              onChange={(e)=>setEmailOrPhoneAdmin(e.target.value)}
              type="text"
              name="emailOrNum"
              required
              placeholder="Enter Your Mobile Number / Email*"
              className="Input-User focus:ring-0"
            />
            <input
              onChange={(e)=>setPasswordAdmin(e.target.value)}
              type="password"
              name="adminPassword"
              required
              placeholder="Enter Password*"
              className="Input-User focus:ring-0"
            />
            </div>
            <div className="CheckBoxes flex flex-col w-full">
              <span className="CheckBox-Gap flex items-center gap-3">
                <input
                  // onChange={(e)=>setRemember(e.target.checked)}
                  type="checkbox"
                  className="checkbox focus:ring-0 w-5 h-5"
                />
                <span className="Remember">Remember Me</span>
              </span>
    
            </div>

            

            <button
              type='submit'  
              className="Login-Button text-white  w-44 h-12 rounded-md cursor-pointer  duration-200 mt-10"
            >
                Login
            </button>
          </form>
        </div>

 
      </div>

      <div className="RightSide-Block-Login  justify-center align-middle w-64">
        <span
          className="material-symbols-outlined Close-Login-Box-Arrow-Admin absolute cursor-pointer"
          onClick={CloseLoginBox}
        >
          close
        </span>
        <img
          src="./LoginImgs/LoginImg1.png"
          alt="Login visual"
          className="w-full h-full rounded-r-lg"
        />
      </div>
    </div>
  
  </div>
  )
}

export default AdminLogin
