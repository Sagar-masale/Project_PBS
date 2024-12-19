import React, { useState , useEffect, useContext } from 'react';
// Notifications
import RegisterMessage from '../Notifications/RegisterMessage';
import RegisterErr from '../Notifications/RegisterErr';
import NetworkErr from '../Notifications/NetworkErr';


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


import LoginUsingOtp from '../Login/LoginUsingOtp';
import LoginUsingPass from '../Login/LoginUsingPass';
import './NavBar.css';
import '../MediaQueries/MediaQueries.css';


function NavBar() {
  const [UserSearchValue, setUserSearchValue] = useState('');
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
  const navItemsLinks=[
    {
      id : 1,
      name: 'STORE',
      slug: '/Store-Deatils',
      logo: 'add_business',
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
      logo: 'person',
      active: isMobile ? false : true, // Hide ACCOUNT on mobile
      
    },
    {
      id : 3,
      name: 'DIAMONDS',
      slug: '/Diamond-Details',
      logo: 'diamond',
      active: true,
    } ,
    {
      id : 4,
      name: 'WISHLIST',
      slug: '/WishList-Deatils',
      logo: 'favorite',
      active: true,
    } ,
    {
      id : 5,
      name: 'CART',
      slug: '/Cart-Deatils',
      logo: 'shopping_cart',
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
      
       
      <div className="Navheader Navcontainer">
        <div className="Slider-Bar" id="SliderBar">
          <div className="Login-SignUp-Box">
            <SliderBarForPhn />
          </div>
        </div>
        <RegisterMessage/>
        <RegisterErr/>
        <NetworkErr/>
        <div className="custome-bar" onClick={SliderMove}>
          <span className="material-symbols-outlined menu-items">menu</span>
        </div>

        <div className="Logo-Shop">
          <p className="logo">PBS</p>
        </div>

        <form
          action="#"
          onSubmit={UserSearch}
          className="w-3/6 Search_Feald"
        >
          <input
            type="search"
            onChange={(e) => setUserSearchValue(e.target.value)}
            className="text-sm search focus:ring-0"
            placeholder="Search for rings, earrings, bangles, chains..."
          />
          <div className="Search-Icon-Box flex justify-center items-center">
            <button>
              <span className="material-symbols-outlined mt-1 text-purple-900 text-3xl">search</span>
            </button>
          </div>
        </form>

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

              <span className="material-symbols-outlined top-logo nav-Logos flex flex-col text-center cursor-pointer"
              
              >
              {item.logo}
              <span className="logo-name"> {item.name} </span>
            </span>
              </li>
            ) : null
          )}
          </ul>
  

          <div className="AccountContainer">
            <LoginShow />
          </div>

    
        </div>

        <form
          action="#"
          onSubmit={UserSearch}
          className="w-full pl-4 pr-4 search-container-two"
        >
          <div className="flex w-full h-xl">
            <input
              type="text"
              onChange={(e) => setUserSearchValue(e.target.value)}
              className="search focus:ring-0 text-gray-600"
              placeholder="Search for rings, earrings, bangles, chains..."
            />
            <div className="Search-Icon-Box flex justify-center items-center">
              <button>
                <span className="material-symbols-outlined mt-1 searchLogo text-3xl">search</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="nav-item flex flex-row  justify-center">
        <span  className="nav-item-name one-itemc cursor-pointer">JEWELLERY</span>
        <span  className="nav-item-name cursor-pointer">COLLECTIONS</span>
        <span  className="nav-item-name cursor-pointer">WEDDING</span>
        <span  className="nav-item-name cursor-pointer">REVIEWS</span>
        <span  className="nav-item-name cursor-pointer">GIFTING</span>
        <span  onClick={ShowNavMoreSec}  className="nav-item-name  cursor-pointer">MORE</span>
      

      </div>
      <div className="input NavMore-Items absolute right-0 z-2">
<Link to="/" onClick={ShowNavMoreSec}>
<span  className="value">
  <span className="material-symbols-outlined MoreOpt-Logos font-bold">
   home
  </span>
    Home
  </span>
</Link>
<Link>
<span className="value">
  <span className="material-symbols-outlined MoreOpt-Logos font-bold">
  mode_comment
  </span>
    Chat
  </span>
</Link>
<Link>
<span className="value">
<span className="material-symbols-outlined MoreOpt-Logos font-bold">
  orders
  </span>
    Orders
  </span>
</Link>
 <Link>
 <span className="value">
 <span className="material-symbols-outlined MoreOpt-Logos font-bold">
  favorite
  </span>
    Wishlist
  </span>
 </Link>
<Link>
<span className="value">
<span className="material-symbols-outlined MoreOpt-Logos font-bold">
  Notifications
  </span>
    Notifications
  </span>
</Link>
  <Link   
      to={
      accessToken
      ? "/UserAcc"
      : adminData
      ? "/AdminAcc"
      : "/loginPage"
  } onClick={handleAccountClick}>
  <span className="value">
  <span className="material-symbols-outlined MoreOpt-Logos font-bold">
  account_circle
  </span>
    Account
  </span>
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
