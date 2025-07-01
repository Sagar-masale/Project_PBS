import React from 'react'
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './AdminLogin.css';
import AdminContext from '../Context/AdminContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';


function AdminLogin() {

    const [emailOrPhoneAdmin, setEmailOrPhoneAdmin] = useState('');
    const [passwordAdmin, setPasswordAdmin] = useState('');
    const [accessTokenAdmin, setAccessTokenAdmin] = useState('');


    const {setAdminData} = useContext(AdminContext);


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
        
        setAdminData(response.data)
        
        
  
        // Update state with fetched data
       
        
        
        
  
      } catch (error) {
        if (error.response?.status === 401) {
          const success = await refreshAccessTokenAdmin();
          if (success) {
            fetchAdminProfile();  // Retry after refreshing
          } else {
           // alert('Session expired. Please log in again.');
          }
        } else {
          //console.error('Error fetching profile:', error);
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
  
      try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let payload = {};
  
        if (emailRegex.test(emailOrPhoneAdmin)) {
          payload.adminEmail = emailOrPhoneAdmin; // Valid email
        } else if (/^\d{10}$/.test(emailOrPhoneAdmin)) {
          payload.adminPhoneNumber = emailOrPhoneAdmin; // Valid phone number
        } else {
          toast.error("Please enter a valid email or phone number.");
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
          // Store tokens
          localStorage.setItem("accessTokenAdmin", accessToken);
          localStorage.setItem("refreshTokenAdmin", refreshToken);
  
          setAccessTokenAdmin(accessToken);
          toast.success('Admin Loggedin successfull');

          window.location.href = "/AdminAcc";
        } else {
          toast.error(response.data.message);
        }
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      } finally {
        // setIsLoading(false); // Stop loading spinner
      }
    };

 
 

  return (
<div className="Login-Main-Container bg-gradient-to-br from-purple-100 via-white to-pink-100 min-h-screen flex  items-center justify-center px-4">
  <div className="Login-Pass-Container w-full max-w-lg flex-col bg-white rounded-lg shadow-lg p-6 relative">
    
    {/* Close Icon */}
    <Link to="/">
      <span className="material-symbols-outlined absolute top-4 right-4 text-2xl cursor-pointer">
        close
      </span>
    </Link>

    {/* Heading */}
    <h1 className="text-3xl font-semibold text-center text-[#4F3267]">Admin</h1>

    {/* Tabs */}
    <div className="flex justify-center  gap-5 w-full mt-8 border-b pb-2">
      <span className="text-gray-500 cursor-not-allowed">Using OTP</span>
      <span className="text-[#4F3267] cursor-pointer font-medium">Using Password</span>
    </div>

    {/* Form */}
    <form onSubmit={AdminLogin} className="mt-8 space-y-6" method="post">
      <input
        onChange={(e) => setEmailOrPhoneAdmin(e.target.value)}
        type="text"
        name="emailOrNum"
        required
        placeholder="Enter Your Mobile Number / Email*"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <input
        onChange={(e) => setPasswordAdmin(e.target.value)}
        type="password"
        name="adminPassword"
        required
        placeholder="Enter Password*"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      <div className="flex items-center gap-3">
       <input
          type="checkbox"
          className="w-5 h-5 cursor-pointer accent-[#4F3267] appearance-auto"
        />



        <span className="text-gray-600">Remember Me</span>
      </div>

      <button
        type="submit"
        className="w-full h-12 bg-[#4F3267] hover:bg-purple-700 text-white rounded-md transition duration-200"
      >
        Login
      </button>
    </form>
  </div>
</div>

  )
}

export default AdminLogin
