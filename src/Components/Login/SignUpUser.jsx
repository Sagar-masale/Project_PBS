import React, { useState, useContext } from "react";
import "./SignUpUser.css";
import axios from "axios";
import RegisterContext from "../Context/RegisterContext";
import EmailAuth from "../AuthontiCations/EmailAuth";
import { Link } from "react-router-dom";
import {X} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import {Mail} from 'lucide-react'
function SignUpUser({onSwitchToLogin}) {
  const [email, setEmail] = useState("");
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [pbsCondition, setPbsCondition] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setRegisterStatus, setRegisterErrStatus, setNetworkErrStatus } = useContext(RegisterContext);

  const navigate = useNavigate();

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setIsEmailSubmitted(true); // Show EmailAuth component
  };

  const handleOtpVerified = () => {
    setIsEmailVerified(true);
  };

  const registerUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    axios
      .post("https://backend-pbs-coo6.onrender.com/api/v1/users/register", {
        fullName,
        phoneNumber,
        email,
        password,
        pbsCondition,
      })
      .then((response) => {
        if (response.data.success) {
          setRegisterStatus(response.data.success);
          closeEmailAuthBox();
          onSwitchToLogin();
          navigate('/');
          CloseSignUpBox();
        } else {
          alert(response.data.message || "Registration failed. Please try again.");
        }
      })
      .catch((err) => {
        if (err.response) {
          CloseSignUpBox();
          setRegisterErrStatus(err.response.data.message);
        } else if (err.request) {
          
          setNetworkErrStatus(err.request);
        } else {
          alert("An error occurred. Please try again.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };


  const closeEmailAuthBox = () => {
    setIsEmailSubmitted();
  }
  const CloseSignUpBox = () => {
    setIsEmailSubmitted(false);
    setIsEmailVerified(false);
    setEmail("");
  };



  return (
    
    <>
<div
  className="Login-Main-Container bg-gradient-to-br  w-full min-h-screen flex justify-center items-center px-4"
>


  <div className="SignUp-Pass-Container w-full max-w-lg  flex justify-center">

    {/* Email Verification Stage */}
        {!isEmailSubmitted ? (
          <div className="  ">
          
          <section class="flex justify-center items-center">
            <button
              onClick={onSwitchToLogin}
              className="ml-auto mb-10 group flex justify-center p-2 rounded-md drop-shadow-xl bg-gradient-to-r from-[#4f3267] to-[#432a58] text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
            >
              <X 
              width={20}
              height={20}
              />
              <span
                className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700"
              >
                x
              </span>
            </button>
          </section>

        
        <form onSubmit={handleEmailSubmit} className="flex flex-col items-center gap-4">
          <div className="input-wrapper rounded-lg px-4">
            <Mail className="text-purple-900"/>
            <input 
              type="email" 
              name="email" 
              required
              className="emailBox focus:ring-0" 
              placeholder="Enter Your Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          <button
            type="submit"
            className="px-4 py-2 text-sm sm:text-base font-medium bg-[#4f3267] text-white rounded-md shadow hover:bg-[#3d2657] transition-all duration-200"
          >
            Submit
          </button>

          </div>
        </form>
      </div>
      
        ) : !isEmailVerified ? (
      <div className="absolute top-0 left-0 w-full h-full  z-10 flex justify-center items-center">
        <EmailAuth
          enteredEmail={email}
          onOtpVerified={handleOtpVerified}
          closeEmailAuth={closeEmailAuthBox}
          decriptionOfEmailVerify="We've sent a one-time password (OTP) to your email. Enter it below to verify your account."
          decriptionOfEmailVerifyImp="If you don’t see it, check your spam folder and mark our emails as safe."
        />
      </div>
        ) : (
          <div className="LeftSide-Block-Login relative rounded-l-lg bg-white">
      <Link to={'/'}>
        <span
          className="material-symbols-outlined absolute top-4 right-4 text-2xl text-gray-700 hover:text-black cursor-pointer z-50"
        >
          close
        </span>
      </Link>
        <h1 className="text-2xl md:text-3xl font-semibold text-[#4F3267] mb-6 mt-5">Sign Up</h1>

        <form onSubmit={registerUser} className="flex flex-col gap-6 text-sm md:text-base">
          <input
            type="email"
            value={email}
            readOnly
            className="p-3 bg-gray-200 rounded-md cursor-not-allowed"
          />
          <input
            type="text"
            placeholder="Enter Full Name*"
            required
            className="p-3 border border-gray-300 rounded-md"
            onChange={(e) => setFullName(e.target.value)}
          />
          <div className="flex gap-4">
            <div className="bg-gray-100 p-3 rounded-md">+91</div>
            <input
              type="text"
              placeholder="Enter Mobile Number*"
              required
              className="flex-1 p-3 border border-gray-300 rounded-md"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <input
            type="password"
            placeholder="Enter Password*"
            required
            className="p-3 border border-gray-300 rounded-md"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Checkbox */}
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              required
              className="w-5 h-5 accent-[#4F3267] appearance-auto"
              onChange={(e) => setPbsCondition(e.target.checked)}
            />
            <span>
              By continuing, I agree to{" "}
              <span className="font-bold underline cursor-pointer">Terms & Conditions</span> and{" "}
              <span className="font-bold underline cursor-pointer">Privacy Policy</span>.
            </span>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full h-12 bg-[#4F3267] text-white rounded-md mt-4 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#3e2752]'
            } transition duration-200`}
          >
            {isLoading ? "Submitting..." : "Continue"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm">
          Already a User?{" "}
          <span onClick={onSwitchToLogin} className="underline cursor-pointer font-medium text-[#4F3267]">
            Login
          </span>
        </p>
      </div>
    )}
  </div>
</div>

    </>
  );
}

export default SignUpUser;
