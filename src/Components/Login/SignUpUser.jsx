import React, { useState, useContext } from "react";
import "./SignUpUser.css";
import axios from "axios";
import RegisterContext from "../Context/RegisterContext";
import EmailAuth from "../AuthontiCations/EmailAuth";
import { Link } from "react-router-dom";
import {X} from 'lucide-react';

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
<div className="Login-Main-Container bg-gradient-to-br from-purple-100 via-white to-pink-100 w-full min-h-screen flex justify-center items-center px-4 ">
  <div className="SignUp-Pass-Container w-full max-w-lg">

    {/* Email Verification Stage */}
    {!isEmailSubmitted ? (
      <div className="EmailVerificationContainer">
        <section className="flex justify-end">
          <button
            onClick={onSwitchToLogin}
            className="group p-2 rounded-md drop-shadow-xl bg-gradient-to-r from-[#4f3267] to-[#432a58] text-white font-semibold hover:translate-y-1 transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
          >
            <X width={20} height={20} />
            <span className="absolute opacity-0 group-hover:opacity-100 text-sm -translate-y-8 duration-700">
              x
            </span>
          </button>
        </section>

        <form onSubmit={handleEmailSubmit} className="flex flex-col items-center gap-6">
          <div className="input-wrapper w-full flex flex-col items-center gap-4">
            <input
              type="email"
              required
              placeholder="Enter Your Email"
              className="emailBox w-full p-3 border border-gray-300 rounded-md text-base focus:ring-2 focus:ring-[#4F3267]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="Subscribe-btn bg-[#4F3267] text-white px-6 py-2 rounded-md hover:bg-[#3e2752]">
              Submit
            </button>
          </div>
        </form>
      </div>

    ) : !isEmailVerified ? (
      <div className="EmailAuth-Component absolute top-0 w-full h-full bg-[#d7a8fe3d]">
        <EmailAuth
          enteredEmail={email}
          onOtpVerified={handleOtpVerified}
          decriptionOfEmailVerify="We've sent a one-time password (OTP) to your email. Enter it below to verify your account."
          decriptionOfEmailVerifyImp="If you don’t see it, check your spam folder and mark our emails as safe."
          closeEmailAuth={closeEmailAuthBox}
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
