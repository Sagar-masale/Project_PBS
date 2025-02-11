import React, { useState, useContext } from "react";
import "./SignUpUser.css";
import axios from "axios";
import RegisterContext from "../Context/RegisterContext";
import EmailAuth from "../AuthontiCations/EmailAuth";

function SignUpUser() {
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
      .post("http://localhost:8000/api/v1/users/register", {
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

  const toggleClass = (selector, className) => {
    document.querySelector(selector).classList.toggle(className);
  };

  const closeEmailAuthBox = () => {
    setIsEmailSubmitted();
  }
  const CloseSignUpBox = () => {
    //alert("Verification failed if you want to signup then again you want to verify your email!");
    toggleClass('.SignUpBox', 'SignUpBoxShow');
    setIsEmailSubmitted(false);
    setIsEmailVerified(false);
    setEmail("");
  };

  const ShowLoginBox = () => {
    toggleClass('.LoginOtpBox', 'LoginOtpBoxShow');
    toggleClass('.SignUpBox', 'SignUpBoxShow');
  };


  return (
    <div className="Login-Main-Container pt-20">
      <div className="SignUp-Pass-Container justify-center">
        {!isEmailSubmitted ? (
          <div className="EmailVerificationContainer">
            <h2 className="text-2xl font-semibold mb-4">Enter Your Email</h2>
            <form onSubmit={handleEmailSubmit} className="flex flex-col items-center gap-4">
              <input
                type="email"
                name="email"
                placeholder="Enter Email ID*"
                required
                className="Input-User focus:ring-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="bg-[#4f3267] text-white px-6 py-2 rounded-lg">
                Submit
              </button>
            </form>
          </div>
        ) : !isEmailVerified ? (
          <div className="EmailAuth-Component absolute w-100 top-0 h-full   bg-[#d7a8fe3d]">
          <EmailAuth 
          enteredEmail={email} 
          onOtpVerified={handleOtpVerified}
          decriptionOfEmailVerify=" We've sent a one-time password (OTP) to your email. Enter it below to verify your account." 
          decriptionOfEmailVerifyImp="If you don’t see it, check your spam folder and mark our emails as safe."
          closeEmailAuth={closeEmailAuthBox} 
          />
          </div>
        ) : (
          
          <div className="LeftSide-Block-SignUp rounded-lg bg-white w-[100%]  p-[40px] h-[100%]">
              <span
            className="material-symbols-outlined closeSignUpBox relative cursor-pointer"
            onClick={CloseSignUpBox}
          >
            close
          </span>
            <h1 className="LoginName text-3xl">Sign Up</h1>
            <div className="Input-Username flex justify-center mt-5">
              <form onSubmit={registerUser} className="FormUser">
                <div className="SetInput-Position w-full flex flex-col gap-8">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    className="Input-User focus:ring-0 bg-gray-200 cursor-not-allowed"
                    readOnly
                  />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter Full Name*"
                    required
                    className="Input-User focus:ring-0"
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  <div className="Set-Position-With-Country-Code-Box flex flex-row gap-5 w-full">
                    <div className="Country-Code-Box rounded-md flex justify-center items-center">
                      +91
                    </div>
                    <input
                      type="text"
                      name="phoneNumber"
                      placeholder="Enter Mobile Number*"
                      required
                      className="Input-User focus:ring-0"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password*"
                    required
                    className="Input-User focus:ring-0"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="CheckBoxes mt-10 flex flex-col gap-2">
                  <span className="CheckBox-Gap flex items-start gap-3">
                    <input
                      type="checkbox"
                      required
                      className="checkbox focus:ring-0 w-5 h-5"
                      onChange={(e) => setPbsCondition(e.target.checked)}
                    />
                    <span className="Remember text-wrap text focus:ring-0">
                      By continuing, I agree to{" "}
                      <span className="Conditions font-bold border-b-2 cursor-pointer">Terms & Conditions</span> &{" "}
                      <span className="Policy font-bold border-b-2 cursor-pointer">Privacy Policy</span>
                    </span>
                  </span>
                </div>

                <button
                  type="submit"
                  className={`mt-10 Register-submit-Button text-white w-44 h-12 rounded-md cursor-pointer duration-200 Button-Submit ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Continue"}
                </button>
              </form>
            </div>
              <span className="NewUser mt-10">
            Already a User?{' '}
            <span
              onClick={ShowLoginBox}
              className="New-SignUp underline cursor-pointer"
            >
              Login
            </span>
          </span>
        
          </div>
        )}
      </div>
    </div>
  );
}

export default SignUpUser;
