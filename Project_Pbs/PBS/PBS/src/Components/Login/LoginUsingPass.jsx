import React, { useState, useEffect, useContext } from 'react';
import Loading from '../PageLoader/Loading';
import ForgotPassword from './ForgotPassword';
import toast, { Toaster } from 'react-hot-toast';
// Profile Context
import ProfileContext from '../Context/ProfileContext'
import axios from 'axios';
import './LoginUsingOtp.css';
import './LoginUsingPass.css';
import RegisterContext from '../Context/RegisterContext';



function LoginUsingPass() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const [isLoginContainerVisible, setIsLoginContainerVisible] = useState(true);
  const [isForgotPassBoxVisible, setIsForgotPassBoxVisible] = useState(false);
  const [showForgotText, setShowForgotText] = useState(false);
  

  // setProfile Context
  const {setRegisterErrStatus, setLoginNotify} = useContext(RegisterContext)
  const {setUserData} = useContext(ProfileContext)
 
  const [isLoading, setIsLoading] = useState(false); 

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
      const response = await axios.get('http://localhost:8000/api/v1/users/current-user', {
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

    const response = await axios.post('http://localhost:8000/api/v1/users/refresh-token', { refreshToken });
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
      const response = await axios.post('http://localhost:8000/api/v1/users/login', payload);
  
      if (response.data.success) {
        const { accessToken, refreshToken } = response.data.data;
  
        
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
  
        
        setAccessToken(accessToken);
        setLoginNotify(response.data.data);
  
        setEmailOrPhone('');
        setPassword('');
     
        fetchUserProfile();
  
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
        alert('An unexpected error occurred. Please try again.');
        setRegisterErrStatus('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false); // Stop the loading spinner regardless of success or failure
    }
  };



  const toggleClass = (selector, className) => {
    document.querySelector(selector).classList.toggle(className);
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
    toggleClass('.LoginPassBox', 'LoginPassBoxShow');
    setShowForgotText(false);
    setEmailOrPhone('');
    setPassword('');
    setIsForgotPassBoxVisible(false);
  };

  const ShowLoginOtpBox = () => {
    toggleClass('.LoginPassBox', 'LoginPassBoxShow');
    toggleClass('.LoginOtpBox', 'LoginOtpBoxShow');
    setShowForgotText(false);
    setEmailOrPhone('');
    setPassword('');
  };
  
  const ShowSignUpBox = () => {
    toggleClass('.LoginPassBox', 'LoginPassBoxShow');
    toggleClass('.SignUpBox', 'SignUpBoxShow');
    setShowForgotText(false);
    setEmailOrPhone('');
    setPassword('');
  };

  return (
   <>
   <Toaster position="top-right" reverseOrder={false} />
   {isForgotPassBoxVisible  && (
    <ForgotPassword 
   
    closeForgotEmailBox={close_Forgot_Box}
    onResetSuccess={() => {
      setIsLoginContainerVisible(true); 
      setIsForgotPassBoxVisible(false); 
      setShowForgotText(false);
      toast.success("Password reset successfully. Please log in with your new password.",{duration:3000});
    }} 
  />
  
    )}

   {isLoading && <Loading />}
   {isLoginContainerVisible && (
   <div className="Login-Main-Container">
      <div className=" pass-Container">
        <div className="LeftSide-Block-Login rounded-l-lg bg-white">
          <span
            className="material-symbols-outlined Close-Login-Box-Arrow-Phn relative cursor-pointer"
            onClick={CloseLoginBox}
          >
            close
          </span>
          <h1 className="LoginName text-3xl mt-6">Login</h1>

          <div className="Top-Side mt-8">
            <span className="TypeLogin1" onClick={ShowLoginOtpBox}>
              <span className="UseOtp cursor-pointer">Using OTP</span>
            </span>
            <span className="TypeLogin2 TypeLogin1-Otp   TypeLogin2-Pass">
              <span className="UseOtp cursor-pointer">Using Password</span>
            </span>
          </div>

          <div className="Input-Username flex justify-center mt-8">
            <form onSubmit={userLogin} className="FormUser">
              <input
                type="text"
                name="emailOrNum"
                required
                placeholder="Enter Your Mobile Number / Email"
                className="Input-User focus:ring-0"
                onChange={(e) => setEmailOrPhone(e.target.value)}
                value={emailOrPhone}
              />
              <input
                type="password"
                name="password"
                required
                placeholder="Enter Password"
                className="Input-User focus:ring-0 mt-9"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {showForgotText && (
                       <span className="changeUserPass ml-auto mt-2 text-[#4f3267] font-medium text-[16px] cursor-pointer" 
                       onClick={forgotUserPass}>
                         Forgot Password ?
                         </span>
              )}     
              <div className="CheckBoxes mt-10 flex flex-col gap-2">
                <span className="CheckBox-Gap flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="checkbox  focus:ring-0 w-5 h-5"
                  />
                  <span className="Remember">Remember Me</span>
                </span>
                <span className="CheckBox-Gap flex items-start gap-3">
                  <input
                    type="checkbox"
                    required
                    className="checkbox  focus:ring-0 w-5 h-5"
                  />
                  <span className="Remember text-wrap text focus:ring-0">
                    By continuing, I agree to{' '}
                    <span className="Conditions font-bold border-b-2 cursor-pointer">
                      Terms & Conditions
                    </span>{' '}
                    &{' '}
                    <span className="Policy  font-bold border-b-2 cursor-pointer">
                      Privacy Policy
                    </span>
                  </span>
                </span>
              </div>

              <input
                type="submit"
                value="Login"
                className="Login-Button mt-10 text-white rounded-md cursor-pointer duration-200 Button-Submit"
              />
            </form>
          </div>

          <span className="NewUser mt-10">
            New User?{' '}
            <span
              onClick={ShowSignUpBox}
              className="New-SignUp underline cursor-pointer"
            >
              Sign Up Now
            </span>
          </span>
        </div>

        <div className="RightSide-Block-Login justify-center align-middle ">
          <span
            className="material-symbols-outlined Close-Login-Box-Arrow-pass absolute cursor-pointer"
            onClick={CloseLoginBox}
          >
            close
          </span>
          <img
            src="./LoginImgs/LoginImg1.png"
            alt="Login visual"
            className="w-full loginImage rounded-r-lg"
          />
        </div>
      </div>
    </div>
   )}

   </>
  );
}

export default LoginUsingPass;
