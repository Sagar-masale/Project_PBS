import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProfileContext from '../Context/ProfileContext';
import RegisterContext from '../Context/RegisterContext';
import './SliderBarForPhn.css';
import '../Login/LoginUsingPass.css';
import '../Login/LoginUsingOtp.css';

function SliderBarForPhn() {
  const [loginLogoutTitle, setLoginLogoutTitle] = useState('');
  const [userName, setUserName] = useState('');
  const { userData, setUserData } = useContext(ProfileContext);
  const { setLogout } = useContext(RegisterContext);
  const navigate = useNavigate();

  // Set user information based on context
  useEffect(() => {
    if (userData) {
      setLoginLogoutTitle("Logout");
      setUserName(userData.fullName?.split(' ')[0] || 'Guest');
    } else {
      setLoginLogoutTitle("Login");
      setUserName('Guest');  // Explicitly set to 'Guest' when no user data
    }
  }, [userData]);
  

  // Handle menu click actions
  const menuLinkClick = (item) => {
    if (item.name === "Logout") {
      handleLogout();
    } 
    else if (item.name === "Login"){
      CloseLoginBox()
    }
    else {
      navigate(item.slug);
    }
  };

  // Logout logic
  const handleLogout = () => {
    setUserData("");        // Clear user data in context
    localStorage.clear();      // Clear stored tokens and data
    setLogout(true);           // Update logout state in context
    navigate('/');             // Redirect to homepage or login page
  };

  // Menu items configuration
  const menuLinks = [
    { id: 1, name: 'Home', slug: '/', logo: 'home', active: true },
    { id: 2, name: 'Search', slug: '/search', logo: 'search', active: true },
    { id: 3, name: 'Chat', slug: '/chat', logo: 'chat', active: true },
    { id: 4, name: 'Orders', slug: '/orders', logo: 'orders', active: true },
    { id: 5, name: 'Wishlist', slug: '/wishlist-details', logo: 'favorite', active: true },
    { id: 6, name: 'Settings', slug: '/settings', logo: 'settings', active: true },
	{ 
		id: 7, 
		name: loginLogoutTitle, // Dynamically set based on userData
		slug: userData ? '/' : '/',     // Redirect to login if logged out
		logo: 'login', 
		active: true 
	  },
  ];

  console.log('udata',userData);
  
  // Slider toggle
  const toggleClass = (selector, className) => {
    document.querySelector(selector)?.classList.toggle(className);
  };
  const CloseLoginBox = () => {
    toggleClass('.LoginOtpBox', 'LoginOtpBoxShow');
  };

  return (
    <div className="flex flex-col h-full dark:bg-red-40 dark:text-gray-800">
      <div className="space-y-3">
        <div className="SliderBar-Color-Box w-full">
          <div className="flex items-center justify-between">
            <h2 className='text-red-900'>PBS</h2>
            <span className="material-symbols-outlined Slider-Bar-Exit" onClick={() => toggleClass('#SliderBar', 'Slider-Bar-In')}>
              arrow_back
            </span>
          </div>

          {/* Search bar */}
          <form onSubmit={(e) => e.preventDefault()} className="SlideBar">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center py-4">
                <button type="submit" className="p-2">
                  <span className="material-symbols-outlined text-red-900 text-3xl">search</span>
                </button>
              </span>
              <input
                type="search"
                onChange={(e) => setUserName(e.target.value)}
                name="Search"
                placeholder="Search..."
                className="search w-full py-2 pl-10 text-sm rounded-md"
              />
            </div>
          </form>
        </div>

        {/* Menu items */}
        <div className="flex-1 pl-2">
          <ul className="pt-2 space-y-1 text-sm flex flex-col gap-3">
            {menuLinks.map((item) => item.active && (
              <li key={item.id} className="rounded-sm" onClick={() => menuLinkClick(item)}>
                <span className='flex items-center p-2 space-x-3 rounded-md'>
                  <span className="material-symbols-outlined text-red-900 font-bold">{item.logo}</span>
                  <span>{item.name}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* User Profile */}
        <Link to='/UserAcc' onClick={() => toggleClass('#SliderBar', 'Slider-Bar-In')}>
          <div className="flex items-center pl-2 space-x-4 Profile-Box">
            <img
              src="https://www.pngitem.com/pimgs/m/130-1300253_female-user-icon-png-download-user-image-color.png"
              alt="User"
              className="w-12 h-12 rounded-lg"
            />
            <div>
              <h2 className="text-lg font-semibold">Hi {userName || 'Guest'}</h2>
              <span className="flex items-center space-x-1">
                <button className="text-xs hover:underline">View profile</button>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SliderBarForPhn;
