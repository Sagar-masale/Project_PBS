import React from 'react'
import { useState } from 'react';

import './AdminLogin.css';


function AdminLogin() {
    const toggleClass = (selector, className) => {
        document.querySelector(selector).classList.toggle(className);
      };
    
    const CloseLoginBox=()=>{
        toggleClass('.AdminLoginBox','AdminLoginBoxShow');
    }

    const getFormData=(e)=>{
      e.preventDefault()
      console.log(user_Num_Email,userPassword,Remember);
      
      if (user_Num_Email=='Sagar' && userPassword=='Sag@123') {
        alert("Correct");
        toggleClass('.AdminLoginBox','AdminLoginBoxShow');
        toggleClass('.AccountContainer','AccountContainer-Show');
        toggleClass('.Admin-Block','Admin-Block-Show');

      }else{
        alert("Invalid information : ")
      }

    }

    const [user_Num_Email,setUserNum_Email]=useState('');
    const [userPassword,setUserPassword]=useState('');
    const [Remember,setRemember]=useState(false);
 

  return (
    <div className="Login-Main-Container">
      
    <div className="Login-Pass-Container">
      <div className="LeftSide-Block-Login rounded-l-lg bg-white h-full">
        <h1 className="LoginName text-3xl text-red-800">Admin</h1>
        <div className="Top-Side mt-8">
          <span className="TypeLogin1 AdminLogin-TypeOtp">
            <span className="UseOtp cursor-not-allowed">Using OTP</span>
          </span>
          <span className="w-full AdminLogin-TypePass">
            <span className="UseOtp cursor-pointer">Using Password</span>
          </span>
        </div>

        <div className="Input-Username mt-8 w-full">
          <form onSubmit={getFormData} className="FormUser" method='post'>
            <div className="SetInputFeilds_Admin flex flex-col gap-9 w-full">
            <input
              onChange={(e)=>setUserNum_Email(e.target.value)}
              type="text"
              name="Username"
              required
              placeholder="Enter Your Mobile Number / Email*"
              className="Input-User focus:ring-0"
            />
            <input
              onChange={(e)=>setUserPassword(e.target.value)}
              type="password"
              name="UserPass"
              required
              placeholder="Enter Password*"
              className="Input-User focus:ring-0"
            />
            </div>
            <div className="CheckBoxes flex flex-col w-full">
              <span className="CheckBox-Gap flex items-center gap-3">
                <input
                  onChange={(e)=>setRemember(e.target.checked)}
                  type="checkbox"
                  className="checkbox text-red-900 focus:ring-0 w-5 h-5"
                />
                <span className="Remember">Remember Me</span>
              </span>
    
            </div>

            

            <button
              type='submit'  
              className=" text-white bg-red-800 w-44 h-12 rounded-md cursor-pointer hover:bg-red-950 duration-200 mt-10"
            >
                Login
            </button>
          </form>
        </div>

 
      </div>

      <div className="RightSide-Block-Login block justify-center align-middle w-64">
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
  )
}

export default AdminLogin
