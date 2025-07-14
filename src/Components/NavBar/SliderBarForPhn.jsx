import React, { useState, useContext, useEffect } from 'react';
import Loading from '../PageLoader/Loading';
import { Link, useNavigate } from 'react-router-dom';
import ProfileContext from '../Context/ProfileContext';
import RegisterContext from '../Context/RegisterContext';
import toast from 'react-hot-toast';
import './SliderBarForPhn.css';
import '../Login/LoginUsingPass.css';
import '../Login/LoginUsingOtp.css';
import {MoveLeft, House, Search, Package, Heart, Settings2, LogIn, CircleUserRound   } from 'lucide-react';
import AdminContext from '../Context/AdminContext';

function SliderBarForPhn() {
  const [loginLogoutTitle, setLoginLogoutTitle] = useState('');
  const [userName, setUserName] = useState('');
  const { userData, setUserData } = useContext(ProfileContext);
  const { setLogout } = useContext(RegisterContext);
  const {adminData} = useContext(AdminContext);
  const navigate = useNavigate();

  // Set user information based on context
useEffect(() => {
  if (adminData) {
    setUserName("Admin");
    setLoginLogoutTitle("Logout");
  } else if (userData) {
    const firstName = userData.fullName?.split(' ')[0] || 'User';
    setUserName(firstName);
    setLoginLogoutTitle("Logout");
  } else {
    setUserName('Guest');
    setLoginLogoutTitle("Login");
  }
}, [userData, adminData]);


  // Handle menu click actions
  const menuLinkClick = (item) => {
    if (item.name === "Logout") {
      handleLogout();
    }
    else {
      navigate(item.slug);
    }
  };

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


  

  // Logout logic
  const handleLogout = () => {
   setIsLoading(true); // Trigger loading animation immediately
 
   setTimeout(() => {
 
     setIsLoading(false); // Stop loading animation after 3 seconds
     setUserData("");
     localStorage.removeItem("accessToken");
     localStorage.removeItem("refreshToken");
     setLogout(true);
     toast.success("You have been logged out successfully.",{ duration: 2000 });
     navigate('/');
   }, 3000);
 
   // Perform logout actions
 
 };



  // Menu items configuration
  const menuLinks = [
    { id: 1, name: 'Home', slug: '/', logo: <House />, active: true },
    { id: 2, name: 'Search', slug: '/search', logo: <Search />, active: true },
    { id: 4, name: 'Orders', slug: userData ? '/Order-Details' : '/login', logo: <Package />, active: true },
    { id: 5, name: 'Wishlist', slug: '/WishList-Deatils', logo: <Heart />, active: true },
    { 
      id: 6, 
      name: 'Reviews', 
      slug: '/AllReviews', 
      logo: <Settings2 />, 
      active: true },
    { 
      id: 7, 
      name: adminData ? 'Admin Logged In' : loginLogoutTitle,
      slug: adminData ? '/AdminAcc' : (userData ? '/' : '/login'),   
      logo: <LogIn />, 
      active: true 
    }

  ];


  
  
  const toggleClass = (selector, className) => {
    document.querySelector(selector)?.classList.toggle(className);
  };


  return (
    
   <>
   {isLoading && <Loading />}
    <div className="flex flex-col h-full dark:bg-red-40 dark:text-gray-800">
      <div className="space-y-3">
        <div className="SliderBar-Color-Box w-full">
          <div className="flex items-center justify-between">
                  <Link to="/" className="">
                    <p
                      className="text-xl Web_Logo sm:text-3xl md:text-3xl text-[#4F3267] tracking-wide"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      PBSalegaon
                    </p>
                  </Link>
            <span className="material-symbols-outlined Slider-Bar-Exit" onClick={() => toggleClass('#SliderBar', 'Slider-Bar-In')}>
             <MoveLeft />
            </span>
          </div>

          {/* Search bar */}

        </div>

        {/* Menu items */}
        <div className="flex-1 pl-2">
          <ul className="pt-2 space-y-1 text-sm flex flex-col gap-3">
            {menuLinks.map((item) => item.active && (
              <li key={item.id} className="rounded-sm" onClick={() => menuLinkClick(item)}>
                <span className='flex items-center p-2 space-x-3 rounded-md hover:bg-[rgb(246,239,246)]' onClick={() => toggleClass('#SliderBar', 'Slider-Bar-In')}>
                  <span className="material-symbols-outlined sliderBar-Logos font-bold">{item.logo}</span>
                  <span>{item.name}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* User Profile */}
<Link
  to={
    adminData
      ? '/AdminAcc'
      : userData
      ? '/UserAcc'
      : '/login'
  }
  onClick={() => toggleClass('#SliderBar', 'Slider-Bar-In')}
>

  <div className="flex items-center pl-2 space-x-4 Profile-Box">
    <CircleUserRound className='rounded-lg w-10 h-9 ml-1' color='#581C87 ' />
<div>
  <h2 className="text-xl font-bold text-[#581C87]">Hello, {userName || 'Guest'} 👋</h2>
  <div className="mt-1">
    <button className="text-sm text-[#581C87] hover:underline font-medium">
      View Profile
    </button>
  </div>
</div>

  </div>
</Link>
      </div>
    </div>
   </>
  );
}

export default SliderBarForPhn;
