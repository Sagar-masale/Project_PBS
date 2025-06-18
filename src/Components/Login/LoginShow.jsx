import React from 'react'
import './LoginShow.css'
import { useContext } from 'react';
import ProfileContext from '../Context/ProfileContext';
function LoginShow() {
  const { userData } = useContext(ProfileContext);
  const toggleClass = (selector, className)=>{
    document.querySelector(selector).classList.toggle(className);
  }
  const ShowUserLogin=()=>{
        if(!userData){
      toggleClass('.AccountShow','AccountShowBlock'); 
      toggleClass('.LoginOtpBox','LoginOtpBoxShow');
    }
  }

  const ShowAdminLogin=()=>{
    toggleClass('.AccountShow','AccountShowBlock');
    toggleClass('.AdminLoginBox','AdminLoginBoxShow');
  }
  return (
    <>
            <div className=" fixed   transform overflow-hidden rounded-lg bg-white shadow-xl transition-all AccountShow"style={{width:"300px", margin:"20px 0 0 -120px"}}>
        <div className="bg-white px-4  sm:p-6 sm:pb-4">
          <div className="sm:flex flex-col items-center">
            <div className="userLogin-Avtar mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
            <span class="material-symbols-outlined text-3xl">
            account_circle
            </span>
            </div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Login Account</h3>

            </div>
          </div>
        </div>
        <div className="bg-gray-50   py-3 sm:flex sm:flex-row-reverse justify-center px-5">
          <button onClick={ShowUserLogin} type="button" className="userLogin-Button w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-20 hover:w-44 ease-in-out duration-150 ">User</button>
          <button onClick={ShowAdminLogin}  type="button" className=" w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-20 hover:w-44 ease-in-out duration-150">Admin</button>
      
       
        </div>
      </div>
    </>
  )
}

export default LoginShow
