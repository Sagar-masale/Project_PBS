import React, { useState , useEffect, useContext, useRef } from 'react';
// Notifications
import SuccessMessage from '../Notifications/SuccessMessage';
import ErrorMessage from '../Notifications/ErrorMessage';
import NetworkErr from '../Notifications/NetworkErr';
import SearchBar from '../SearchBar/SearchBar';
import { Link,useNavigate } from 'react-router-dom';
import ChatWithUs from '../Chat/ChatWithUs';
import SliderBarForPhn from './SliderBarForPhn';
import AdminLogin from '../Login/AdminLogin';
import LoginShow from '../Login/LoginShow';
import SignupUser from '../Login/SignUpUser';
// Context provider
import RegisterContext from '../Context/RegisterContext';
import ProfileContext from '../Context/ProfileContext';
import CartContext from '../Context/CartContext';
import AdminContext from '../Context/AdminContext';
import {Store, Gem, ShoppingCart, UserRound, AlignJustify, Home, Package, Heart, Bell, User} from 'lucide-react';

import LoginUsingOtp from '../Login/LoginUsingOtp';
import LoginUsingPass from '../Login/LoginUsingPass';
import './NavBar.css';
import '../MediaQueries/MediaQueries.css';


function NavBar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  // cartLemgth
  const { cart } = useContext(CartContext);
  const [cartLength, setCartLength] = useState(0);
  useEffect(() => {
       setCartLength(cart.length);
      }, [cart]);
      // console.log("cartlength",cartLength);

  // registerContext
  const {registerStatus, registerErrStatus, networkErrStatus} = useContext(RegisterContext)

  const [showSuccess, setShowSuccess] = useState(false);
  const [showUnSuccess, setShowUnSuccess] = useState(false);
  const [showNetErrSuccess, setShowNetErrSuccess] = useState(false);

  
  useEffect(() => {
    if (registerStatus || registerErrStatus || networkErrStatus) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        setShowUnSuccess(false);
        setShowNetErrSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [registerStatus, registerErrStatus, networkErrStatus]);

  
 
  
  useEffect(() => {
    if (networkErrStatus) { 
      setShowNetErrSuccess(true);
      
      const timer = setTimeout(() => {
        setShowNetErrSuccess(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [networkErrStatus]);
  

  
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const UserSearch = (e) => {
    e.preventDefault();
    // console.log(UserSearchValue);
  };

  const toggleClass = (selector, className) => {
    document.querySelector(selector).classList.toggle(className);
  };

  const ShowNavMoreSec = () => {
    toggleClass('.NavMore-Items', 'NavMore-Items-Show');
  }
  const SliderMove = () => {
    toggleClass('#SliderBar', 'Slider-Bar-In');
  };

  const NavAccount = () => {
    toggleClass('.AccountShow', 'AccountShowBlock');
  };
  
  // profileContext User
  const {userData} = useContext(ProfileContext);
  
  // console.log("userData", userData._id);
  
  const [accLogoName, setAccLogoName] = useState(''); 
  useEffect(() => {
    // console.log("userData updated: ", userData);
    if (userData && userData.fullName) {
        setAccLogoName(userData.fullName.split(' ')[0]);
    } else {
        setAccLogoName('');
    }
}, [userData]);


const { adminData } = useContext(AdminContext);
const [accLogoAdmin, setAccLogoAdmin] = useState('');

    useEffect(() => {
      // Check if adminData is available and contains the required data
      if (adminData?.data?.adminFullName) {
        setAccLogoAdmin(adminData.data.adminFullName.split(' ')[0]);
      } else {
        setAccLogoAdmin('');
      }
    }, [adminData]);




  const navigate = useNavigate();
  const holdTimer = useRef(null);

   const handleMouseDown = () => {
    holdTimer.current = setTimeout(() => {
      navigate('/login_admin'); // Redirect on long press
    }, 800); // 800ms hold duration
  };

  const handleMouseUp = () => {
    clearTimeout(holdTimer.current);
  };

  const handleMouseLeave = () => {
    clearTimeout(holdTimer.current);
  };
  
  const navItemsLinks=[
    {
      id : 1,
      name: 'STORE',
      slug: '/Store-Deatils',
      logo: <Store />,
      active: true,
    } ,
    {
      id: 2,
      name: accLogoAdmin
        ? accLogoAdmin.toUpperCase()
        : accLogoName
        ? accLogoName.toUpperCase()
        : 'ACCOUNT',
      slug: accLogoAdmin
        ? '/AdminAcc'
        : accLogoName
        ? '/UserAcc'
        : '/',
      logo: <UserRound />,
      active: isMobile ? false : true, // Hide ACCOUNT on mobile
      
    },
    {
      id : 3,
      name: 'DIAMONDS',
      slug: '/Diamond-Details',
      logo: <Gem />,
      active: true,
    } ,
    {
      id : 4,
      name: 'WISHLIST',
      slug: '/WishList-Deatils',
      logo: <Heart />,
      active: true,
    } ,
    {
      id : 5,
      name: 'CART',
      slug: '/Cart-Deatils',
      logo: <ShoppingCart />,
      itemCount: cartLength,
      active: true,
    } ,
    
    
  ]
  
  const accessToken = localStorage.getItem("accessToken");
  const handleAccountClick = (e) => {
    
    if (!accessToken && !adminData) {
      e.preventDefault(); 
      alert("You must be logged in to access your account.");
      ShowNavMoreSec();
      NavAccount();
      
    } else {
      ShowNavMoreSec();
    }
  };

    const handleClick = (item) => {
      if (item.id === 2) {
        if (accLogoName) {
          navigate(item.slug);   // Go to user account if logged in
        }
        else if (accLogoAdmin) {
          navigate(item.slug);
        }
        else {
          NavAccount();          // Show account login modal if logged out
        }
      } else {
        navigate(item.slug);     // Navigate normally for other items
      }
    };
    

  
  return (
    <>
      
       
      <div className="Navheader Navcontainer overflow-visible">
        <div className="Slider-Bar" id="SliderBar">
          <div className="Login-SignUp-Box">
            <SliderBarForPhn />
          </div>
        </div>
        <SuccessMessage/>
        <ErrorMessage/>
        <NetworkErr/>
        <div
          className="custome-bar pl-2 pt-[5px] sm:p-3 cursor-pointer rounded-md hover:bg-gray-200 transition"
          onClick={SliderMove}
        >
          <span className="material-symbols-outlined menu-items text-2xl sm:text-3xl text-[#4F3267]  ">
            <AlignJustify  className='text-[#4F3267] manu-icon'/>
          </span>
        </div>

    <div
      className='Logo-Shop cursor-pointer'
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      <Link to="/" className="">
        <p
          className="text-xl Web_Logo sm:text-3xl md:text-3xl text-[#4F3267] tracking-wide"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          PBSalegaon
        </p>
      </Link>
    </div>

        <div className="w-3/6 Search_Feald search-container-one relative">
          <SearchBar />
        </div>

        <div className="navItems-Links-Block">
          <ul className='nav-link-logos flex align-middle'>
          {navItemsLinks.map((item)=>
            item.active ? (
              <li key={item.id} onClick={()=>  handleClick(item)}
              style={ 
                item.name === 'ACCOUNT' && isMobile
                  ? { display: 'none' }
                  : {}
              }
    
              >
                {/* <span className='cartLengthCount absolute  bottom-14'> {item.itemCount} </span> */}
                {item.itemCount > 0 && (
                  <div className="cartCountBox  text-white">
                    {item.itemCount}
                  </div>
                )}
                <span
                  className="top-logo nav-Logos flex flex-col items-center text-[10px] sm:text-sm text-center cursor-pointer gap-[2px]"
                >
                  <span className="text-base sm:text-xl">
                    {item.logo}
                  </span>
                  <span className="logo-name text-gray-700">{item.name}</span>
                </span>


              </li>
            ) : null
          )}
          </ul>
  

          <div className="AccountContainer">
            <LoginShow />
          </div>

    
        </div>
<div className="w-full pl-4 pr-4 search-container-two">
  <SearchBar />
</div>
    
      </div>

      <div className="nav-item flex flex-row justify-center mt-14 sm:mt-20">

        <span
  className="nav-item-name one-itemc cursor-pointer"
  onClick={() =>
    window.scrollTo({
      top: 600, // Scroll to top
      behavior: "smooth",
    })
  }
>
  CATEGORY
</span>

<span
  className="nav-item-name cursor-pointer"
  onClick={() =>
    window.scrollTo({
      top: window.innerHeight * 1.5, // 30% of screen
      behavior: "smooth",
    })
  }
>
  COLLECTIONS
</span>

<span
  className="nav-item-name cursor-pointer"
  onClick={() =>
    window.scrollTo({
      top: window.innerHeight * 2.1, // 60% of screen
      behavior: "smooth",
    })
  }
>
  WEDDING
</span>

<span
  className="nav-item-name cursor-pointer"
  onClick={() =>navigate("/AllReviews")}
>
  REVIEWS
</span>

<span
  className="nav-item-name cursor-pointer"
  onClick={() =>
    window.scrollTo({
      top: window.innerHeight * 1.2, // 120%
      behavior: "smooth",
    })
  }
>
  GIFTING
</span>

        <span  onClick={ShowNavMoreSec}  className="nav-item-name  cursor-pointer">MORE</span>
      

      </div>
<div className="input NavMore-Items absolute right-0 z-2 space-y-2">
  <Link
    to="/"
    onClick={ShowNavMoreSec}
    className="flex items-center gap-2 text-gray-800 hover:text-purple-700 transition-all"
  >
    <Home size={20} />
    <span className="font-medium">Home</span>
  </Link>

  <Link
    to="/Order-Details"
    onClick={ShowNavMoreSec}
    className="flex items-center gap-2 text-gray-800 hover:text-purple-700 transition-all"
  >
    <Package size={20} />
    <span className="font-medium">Orders</span>
  </Link>

  <Link
    to="/WishList-Deatils"
    onClick={ShowNavMoreSec}
    className="flex items-center gap-2 text-gray-800 hover:text-purple-700 transition-all"
  >
    <Heart size={20} />
    <span className="font-medium">Wishlist</span>
  </Link>


  <Link
    to={
      accessToken
        ? "/UserAcc"
        : adminData
        ? "/AdminAcc"
        : "/loginPage"
    }
    onClick={handleAccountClick}
    className="flex items-center gap-2 text-gray-800 hover:text-purple-700 transition-all"
  >
    <User size={20} />
    <span className="font-medium">Account</span>
  </Link>
</div>

      <div className="AdminLoginBox fixed  w-full  overflow-auto">
        <AdminLogin />
      </div>
      <div className={`SignUpBox fixed w-full overflow-auto ${showSuccess || showUnSuccess || showNetErrSuccess ? 'successSignUpBox' : ''}`}>

        <SignupUser />
      </div>
      <div className="LoginOtpBox fixed  overflow-auto">
        <LoginUsingOtp />
      </div>
      <div className="LoginPassBox fixed  w-full  overflow-auto">
        <LoginUsingPass />
      </div>


      <div className="ChatSection fixed right-0 bottom-0 mb-20 z-2">
      <ChatWithUs/>
      </div>
    </>
  );
}

export default NavBar;
