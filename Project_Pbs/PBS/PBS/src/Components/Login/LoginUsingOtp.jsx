


import React from 'react';
import './LoginUsingOtp.css';
import { useContext } from 'react';
import ProfileContext from '../Context/ProfileContext'


function LoginUsingOtp() {

  const { userData } = useContext(ProfileContext);
  const toggleClass = (selector, className) => {
    document.querySelector(selector).classList.toggle(className);
  };

  const CloseLoginBox = () => {
    toggleClass('.LoginOtpBox', 'LoginOtpBoxShow');
  };

  const ShowLoginPassBox = () => {
    toggleClass('.LoginPassBox', 'LoginPassBoxShow');
    toggleClass('.LoginOtpBox', 'LoginOtpBoxShow');
  };

  const ShowSignUpBox = () => {
    toggleClass('.LoginOtpBox', 'LoginOtpBoxShow');
    toggleClass('.SignUpBox', 'SignUpBoxShow');
  };

  return (
   <>
   {!userData && (
     <div className="Login-Main-Container">
     <div className="Login-Pass-Container">
       <div className="LeftSide-Block-Login rounded-l-lg bg-white">
       <span
           className="material-symbols-outlined Close-Login-Box-Arrow-Phn relative cursor-pointer"
           onClick={CloseLoginBox}
         >
           close
         </span>
         <h1 className="LoginName text-3xl">Login</h1>

         <div className="Top-Side mt-8 ">
           <span className="TypeLogin1 TypeLogin1-Otp">
             <span className="UseOtp cursor-pointer">Using OTP</span>
           </span>
           <span className="TypeLogin2 " onClick={ShowLoginPassBox}>
             <span className="UseOtp cursor-pointer">Using Password</span>
           </span>
         </div>

         <div className="Input-Username flex justify-center mt-8">
           <form action="#" className="FormUser">
             <input
               type="text"
               name="Username"
               required
               placeholder="Enter Your Mobile Number / Email"
               className="Input-User focus:ring-0"
             />
             <div className="CheckBoxes  flex flex-col gap-2">
               <span className="CheckBox-Gap flex items-center gap-3">
                 <input
                   type="checkbox"
                   className="checkbox text-purple-900 focus:ring-0"
                 />
                 <span className="Remember">Remember Me</span>
               </span>
               <span className="CheckBox-Gap flex items-start gap-3">
                 <input
                   type="checkbox"
                   required
                   className="checkbox text-purple-900 focus:ring-0"
                 />
                 <span className="Remember text-wrap text focus:ring-0">
                   By continuing, I agree to{' '}
                   <span className="Conditions  font-bold border-b-2 cursor-pointer">
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
               value="Request OTP"
               className="request-Otp-Button text-white  rounded-md cursor-pointer  duration-200 Button-Submit"
             />
           </form>
         </div>

         <span className="NewUser">
           New User?{' '}
           <span
             onClick={ShowSignUpBox}
             className="New-SignUp underline cursor-pointer"
           >
             Sign Up Now
           </span>
         </span>
   
       </div>

       <div className="RightSide-Block-Login  justify-center align-middle">
         <span
           className="material-symbols-outlined Close-Login-Box-Arrow absolute cursor-pointer"
           onClick={CloseLoginBox}
         >
           close
         </span>
         <img
           src="./LoginImgs/LoginImg1.png"
           alt="Login visual"
           className="w-full loginImage  rounded-r-lg"
         />
       </div>
     </div>
   </div>
   )}
   </>
  );
}

export default LoginUsingOtp;
