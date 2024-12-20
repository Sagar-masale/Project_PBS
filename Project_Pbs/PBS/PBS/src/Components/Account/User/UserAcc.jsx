import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../PageLoader/Loading';
import './UserAcc.css';
import ProfileContext from '../../Context/ProfileContext';
import RegisterContext from '../../Context/RegisterContext';

function UserAcc() {

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


  const navigate = useNavigate();

  const { userData, setUserData } = useContext(ProfileContext);

  const { setLogout, setLogoutNotify } = useContext(RegisterContext);


 // Logout logic
 const handleLogout = () => {
  setIsLoading(true); // Trigger loading animation immediately

  setTimeout(() => {

    setIsLoading(false); // Stop loading animation after 3 seconds
    setUserData("");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setLogout(true);
    setLogoutNotify(true);
    navigate('/');
  }, 3000);

  // Perform logout actions

};





  return (
    <>
    {isLoading && <Loading />}
        <div className='profile-container'>
      <div className="px-4 sm:px-0 flex justify-between ">
        <h3 className="text-2xl font-semibold text-gray-900 flex gap-2">
          Welcome
          <span className="WelcomeUser"
          style={{color: "#4f3267"}}
        > {userData.fullName?.split(' ')[0] || 'Guest'}</span></h3>
        <div className="LogOut-Button-EditButton flex gap-4 ml-auto">
          <button 
          className="editUserAcc px-4 py-1 rounded-lg">
            Edit
          </button>
          <button 
          onClick={() => handleLogout()}
          className="
          logOutUAcc 
          bg-gradient-to-r 
          from-purple-600 
          to-pink-400 
          hover:from-purple-700 
          hover:to-pink-500 
          text-white 
          px-4 py-1 
          rounded-lg 
          flex 
          items-center">
            Logout
          </button>
        </div>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500"></p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <h3 className="text-sm/6 font-medium text-gray-900">Full name</h3>
            <span className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"> {userData.fullName || ''} </span>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <h3 className="text-sm/6 font-medium text-gray-900">Email</h3>
            <span className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"> {userData.email || ''} </span>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <h3 className="text-sm/6 font-medium text-gray-900">Phone No</h3>
            <span className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"> {userData.phoneNumber || ''} </span>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <h3 className="text-sm/6 font-medium text-gray-900">address</h3>
            <span className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">...</span>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <h3 className="text-sm/6 font-medium text-gray-900">About</h3>
            <span className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero dicta labore suscipit at itaque nulla dolores commodi laudantium deleniti consequatur?
            </span>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <h3 className="text-sm/6 font-medium text-gray-900">Order data</h3>
            <span className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm/6">
                  <div className="flex w-0 flex-1 items-center">
                    {/* <PaperClipIcon aria-hispanen="true" className="size-5 shrink-0 text-gray-400" /> */}
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">Download your complete order history for your records.</span>
                      <span className="shrink-0 text-gray-400">2.4mb</span>
                    </div>
                  </div>
                  <div className="ml-4 shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                    </a>
                  </div>
                </li>
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm/6">
                  <div className="flex w-0 flex-1 items-center">
                    {/* <PaperClipIcon aria-hispanen="true" className="size-5 shrink-0 text-gray-400" /> */}
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">Save your order details with one click.</span>
                      <span className="shrink-0 text-gray-400">4.5mb</span>
                    </div>
                  </div>
                  <div className="ml-4 shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </span>
          </div>
        </dl>
      </div>
    </div>
    
    </>
  )
}

export default UserAcc
