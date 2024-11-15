import React, { useState } from 'react';
import './LoginUsingOtp.css';
import './LoginUsingPass.css';
import axios from 'axios';

function LoginUsingPass() {

  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()

  const userLogin = (e) =>{
    e.preventDefault()
    axios.post('http://localhost:8000/api/v1/users/login?email=sagar@.com&password=sag@123&userName=one',{ accessToken, refreshToken})
    .then(result => console.log(result))
    .catch(err => console.log(err));
    
    
  }











  const toggleClass = (selector, className) => {
    document.querySelector(selector).classList.toggle(className);
  };

  const CloseLoginBox = () => {
    toggleClass('.LoginPassBox', 'LoginPassBoxShow');
  };

  const ShowLoginOtpBox = () => {
    toggleClass('.LoginPassBox', 'LoginPassBoxShow');
    toggleClass('.LoginOtpBox', 'LoginOtpBoxShow');
  };

  const ShowSignUpBox = () => {
    toggleClass('.LoginPassBox', 'LoginPassBoxShow');
    toggleClass('.SignUpBox', 'SignUpBoxShow');
  };

  return (
    <div className="Login-Main-Container">
      <div className="Login-Pass-Container">
        <div className="LeftSide-Block-Login rounded-l-lg bg-white h-auto">
        <span
            className="material-symbols-outlined Close-Login-Box-Arrow-Phn relative cursor-pointer"
            onClick={CloseLoginBox}
          >
            close
          </span>
          <h1 className="LoginName text-3xl text-red-800 mt-6">Login</h1>

          <div className="Top-Side mt-8">
            <span className="TypeLogin1" onClick={ShowLoginOtpBox}>
              <span className="UseOtp cursor-pointer">Using OTP</span>
            </span>
            <span className="TypeLogin2 TypeLogin2-Pass">
              <span className="UseOtp cursor-pointer">Using Password</span>
            </span>
          </div>

          <div className="Input-Username flex justify-center mt-8">
            <form 
            onSubmit={userLogin}
            className="FormUser" 
            >
              <input
                type="text"
                name="email"
                required
                placeholder="Enter Your Mobile Number / Email"
                className="Input-User focus:ring-0"
              />
              <input
                type="password"
                name="password"
                required
                placeholder="Enter Password"
                className="Input-User  focus:ring-0 mt-9"
              />
              <div className="CheckBoxes mt-10 flex flex-col gap-2">
                <span className="CheckBox-Gap flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="checkbox text-red-900 focus:ring-0 w-5 h-5"
                  />
                  <span className="Remember">Remember Me</span>
                </span>
                <span className="CheckBox-Gap flex items-start gap-3">
                  <input
                    type="checkbox"
                    required
                    className="checkbox text-red-900 focus:ring-0 w-5 h-5"
                  />
                  <span className="Remember text-wrap text focus:ring-0">
                    By continuing, I agree to{' '}
                    <span className="Conditions text-red-800 font-bold border-b-2 cursor-pointer">
                      Terms & Conditions
                    </span>{' '}
                    &{' '}
                    <span className="Policy text-red-800 font-bold border-b-2 cursor-pointer">
                      Privacy Policy
                    </span>
                  </span>
                </span>
              </div>

              <input
                type="submit"
                value="Submit"
                className="mt-10 text-white bg-red-800  rounded-md cursor-pointer hover:bg-red-950 duration-200 Button-Submit"
              />
            </form>
          </div>

          <span className="NewUser mt-10">
            New User?{' '}
            <span
              onClick={ShowSignUpBox}
              className="New-SignUp underline cursor-pointer text-red-900"
            >
              Sign Up Now
            </span>
          </span>
        </div>

        <div className="RightSide-Block-Login  justify-center align-middle w-64">
          <span
            className="material-symbols-outlined Close-Login-Box-Arrow absolute cursor-pointer"
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
  );
}

export default LoginUsingPass;
