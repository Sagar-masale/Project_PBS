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
    
    <>
    <div className="Login-Main-Container pt-20">
      <div className="SignUp-Pass-Container justify-center">
        {!isEmailSubmitted ? (
          <div className="EmailVerificationContainer">
          
          <section class="flex justify-center items-center">
            <button
              href="/"
              onClick={CloseSignUpBox}
              className="ml-auto mb-10 group flex justify-center p-2 rounded-md drop-shadow-xl bg-gradient-to-r from-[#4f3267] to-[#432a58] text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                stroke-width="0"
                fill="currentColor"
                stroke="currentColor"
              >
                <path
                  d="M8 2H1L9.26086 13.0145L1.44995 21.9999H4.09998L10.4883 14.651L16 22H23L14.3917 10.5223L21.8001 2H19.1501L13.1643 8.88578L8 2ZM17 20L5 4H7L19 20H17Z"
                ></path>
              </svg>
              <span
                className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700"
              >
                x
              </span>
            </button>
          </section>

        
        <form onSubmit={handleEmailSubmit} className="flex flex-col items-center gap-4">
          <div className="input-wrapper">
            <svg 
              className="icon" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24"
            >
              <g data-name="Layer 2">
                <g data-name="inbox">
                  <rect 
                    width="24" 
                    height="24" 
                    transform="rotate(180 12 12)" 
                    opacity="0"
                  ></rect>
                  <path
                    d="M20.79 11.34l-3.34-6.68A3 3 0 0 0 14.76 3H9.24a3 3 0 0 0-2.69 1.66l-3.34 6.68a2 2 0 0 0-.21.9V18a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-5.76a2 2 0 0 0-.21-.9zM8.34 5.55a1 1 0 0 1 .9-.55h5.52a1 1 0 0 1 .9.55L18.38 11H16a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 0-1-1H5.62z"
                  ></path>
                </g>
              </g>
            </svg>
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
              className="Subscribe-btn"
            >
             
              Submit
            </button>
          </div>
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
    </>
  );
}

export default SignUpUser;
