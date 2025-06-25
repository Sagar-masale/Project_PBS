import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from "../../Components/axiosInstance";
import Loading from '../PageLoader/Loading';
import ForgotPassword from './ForgotPassword';
import toast from 'react-hot-toast';
// Profile Context
import ProfileContext from '../Context/ProfileContext';
import axios from 'axios';
import './LoginUsingOtp.css';
import './LoginUsingPass.css';
import RegisterContext from '../Context/RegisterContext';
import { useNavigate } from 'react-router-dom';



function LoginUsingPass({onSwitchToSignup}) {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const [isLoginContainerVisible, setIsLoginContainerVisible] = useState(true);
  const [isForgotPassBoxVisible, setIsForgotPassBoxVisible] = useState(false);
  const [showForgotText, setShowForgotText] = useState(false);
  

  // setProfile Context
  const {setRegisterErrStatus, setLoginNotify} = useContext(RegisterContext)
  const { userData, setUserData } = useContext(ProfileContext);
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

    useEffect(() => {
        if (isLoading) {
          document.body.style.overflow = 'hidden'; // Disable scroll
        } else {
          document.body.style.overflow = ''; // Enable scroll
        }
    
        // Cleanup on unmount
        return () => {
          document.body.style.overflow = '';
        };
      }, [isLoading]);
 
  
  // State to store user data
  const  fetchUserProfile = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token found. Please log in again.');
      }

      // Make the API request with the Authorization header
      const response = await axiosInstance.get('https://backend-pbs-coo6.onrender.com/api/v1/users/current-user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      // Log the user data
      // console.log('User Profile:', response.data);
      

      // Update state with fetched data
      CloseLoginBox()
      setUserData(response.data.data)
      
      

    } catch (error) {
      if (error.response?.status === 401) {
        console.warn('Access token expired. Attempting to refresh...');
        const success = await refreshAccessToken();
        if (success) {
          fetchUserProfile();  // Retry after refreshing
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
    fetchUserProfile();
  }, []);

const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token found');

    const response = await axios.post('https://backend-pbs-coo6.onrender.com/api/v1/users/refresh-token', { refreshToken });
    if (response.data?.success) {
      const { accessToken, refreshToken: newRefreshToken } = response.data.data || {};

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', newRefreshToken);
      setAccessToken(accessToken);  // Update state

      return true;
    }
    return false;
  } catch (error) {
    console.error('Error refreshing token:', error);
    localStorage.clear();  // Clear tokens on error
    setAccessToken('');    // Reset state
    return false;
  }
};

  // Check for access token when the component mounts
  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  const userLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      // Email and phone number validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let payload = {};
  
      if (emailRegex.test(emailOrPhone)) {
        payload.email = emailOrPhone; // Valid email
      } else if (/^\d{10}$/.test(emailOrPhone)) {
        payload.phoneNumber = emailOrPhone; // Valid phone number
      } else {
        alert('Please enter a valid email or phone number.');
        setIsLoading(false); // Stop loading on validation failure
        return;
      }
  
      payload.password = password;
  
      // Simulate a delay for the loading state
      await new Promise((resolve) => setTimeout(resolve, 3000));
  
      // Send the login request
      const response = await axios.post('https://backend-pbs-coo6.onrender.com/api/v1/users/login', payload);
  
      if (response.data.success) {
        const { accessToken, refreshToken } = response.data.data;
  
        
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
  
        
        setAccessToken(accessToken);
        setLoginNotify(response.data.data);
  
        setEmailOrPhone('');
        setPassword('');
     
        await fetchUserProfile();
        navigate('/');

      } else {
        alert(response.data.message || 'Login failed. Please try again.');
        
        
      }
    } catch (err) {
      
  
      if (err.response) {
        console.log('Error:', err.response.data?.message || 'An error occurred');
        if (err.response.data.message === "Password is incorrect") {
          setShowForgotText(true);
          
        }else{
          CloseLoginBox();
          setShowForgotText(false);
        }
        
        setRegisterErrStatus(err.response.data?.message || 'An error occurred');
      } else {
        console.error('Unexpected Error:', err.message);
        // alert('An unexpected error occurred. Please try again.');
        CloseLoginBox();
        setRegisterErrStatus('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false); // Stop the loading spinner regardless of success or failure
    }
  };


  const forgotUserPass = () => {
    setIsForgotPassBoxVisible(true);
    setIsLoginContainerVisible(false);  
    
  };
  const close_Forgot_Box = () => {
    setIsForgotPassBoxVisible(false);
    setIsLoginContainerVisible(true);
    setShowForgotText(false);
  }



  const CloseLoginBox = () => {
    setShowForgotText(false);
    setEmailOrPhone('');
    setPassword('');
    setIsForgotPassBoxVisible(false);
  };




  return (
   <>
       {isForgotPassBoxVisible  && (
   <div className="Forgot_Pass_Container Login-Main-Container bg-gradient-to-br from-purple-100 via-white to-pink-100 pb-5 pt-5 min-h-screen flex items-center justify-center px-4">
    <ForgotPassword 
   
    closeForgotEmailBox={close_Forgot_Box}
    onResetSuccess={() => {
      setIsLoginContainerVisible(true); 
      setIsForgotPassBoxVisible(false); 
      setShowForgotText(false);
      toast.success("Password reset successfully. Please log in with your new password.",{duration:3000});
    }} 
  />
  
   </div>
    )}

   {isLoading && <Loading />}
   {isLoginContainerVisible && (
<div className="Login-Main-Container bg-gradient-to-br from-purple-100 via-white to-pink-100 pb-5 pt-5 min-h-screen flex items-center justify-center px-4">
  <div className="pass-Container w-full max-w-lg">
    <div className="LeftSide-Block-Login relative rounded-l-lg bg-white p-6 shadow-lg">

      <Link to={'/'}>
        <span
          className="material-symbols-outlined absolute top-4 right-6 text-3xl text-gray-700 hover:text-black cursor-pointer z-50"
          onClick={CloseLoginBox}
        >
          close
        </span>
      </Link>

      <h1 className="LoginName text-2xl md:text-3xl font-semibold text-[#4f3267] mt-6 text-center">Login</h1>

      <div className="Top-Side mt-8 flex justify-between text-sm md:text-base">
        <span className="TypeLogin1 cursor-not-allowed">
          <span className="UseOtp cursor-not-allowed">Using OTP</span>
        </span>
        <span className="TypeLogin2 TypeLogin1-Otp TypeLogin2-Pass">
          <span className="UseOtp cursor-pointer text-[#4f3267] font-medium">Using Password</span>
        </span>
      </div>

      <div className="Input-Username flex justify-center mt-8">
        <form onSubmit={userLogin} className="FormUser w-full flex flex-col gap-6 text-sm md:text-base">

          <input
            type="text"
            name="emailOrNum"
            required
            placeholder="Enter Your Mobile Number / Email"
            className="Input-User focus:ring-0 p-3 border border-gray-300 rounded-md"
            onChange={(e) => setEmailOrPhone(e.target.value)}
            value={emailOrPhone}
          />

          <input
            type="password"
            name="password"
            required
            placeholder="Enter Password"
            className="Input-User focus:ring-0 p-3 border border-gray-300 rounded-md mt-2"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          {showForgotText && (
            <span
              className="changeUserPass ml-auto text-[#4f3267] font-medium text-sm md:text-base cursor-pointer"
              onClick={forgotUserPass}
            >
              Forgot Password?
            </span>
          )}

          <div className="CheckBoxes mt-6 flex flex-col gap-3 text-sm md:text-base text-gray-700">
            <span className="CheckBox-Gap flex items-center gap-3">
              <input
                type="checkbox"
                className="w-5 h-5 cursor-pointer accent-[#4F3267] appearance-auto"
              />
              <span className="Remember">Remember Me</span>
            </span>
            <span className="CheckBox-Gap flex items-start gap-3">
              <input
                type="checkbox"
                required
                className="w-5 h-5 cursor-pointer accent-[#4F3267] appearance-auto"
              />
              <span className="Remember text-wrap focus:ring-0">
                By continuing, I agree to{' '}
                <span className="Conditions font-bold border-b-2 cursor-pointer">
                  Terms & Conditions
                </span>{' '}
                &{' '}
                <span className="Policy font-bold border-b-2 cursor-pointer">
                  Privacy Policy
                </span>
              </span>
            </span>
          </div>

          <input
            type="submit"
            value="Login"
            className="Login-Button mt-6 text-white rounded-md cursor-pointer duration-200 Button-Submit bg-[#4F3267] hover:bg-[#3e2752] h-12 text-base"
          />
        </form>
      </div>

      <span className="NewUser mt-6 text-sm md:text-base block text-center">
        New User?{' '}
        <span
          onClick={onSwitchToSignup}
          className="New-SignUp underline cursor-pointer text-[#4F3267] font-medium"
        >
          Sign Up Now
        </span>
      </span>
    </div>
  </div>
</div>

   )}

   </>
  );
}

export default LoginUsingPass;
