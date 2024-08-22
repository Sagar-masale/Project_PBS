import React from 'react';
import SliderBarForPhn from './SliderBarForPhn';
import AdminLogin from '../Login/AdminLogin';
import LoginShow from '../Login/LoginShow';
import SignupUser from '../Login/SignUpUser';
import LoginUsingOtp from '../Login/LoginUsingOtp';
import LoginUsingPass from '../Login/LoginUsingPass';
import './NavBar.css';
import '../MediaQueries/MediaQueries.css';
import { NavLink } from 'react-router-dom';
function NavBar() {
  const toggleClass = (selector, className) => {
    document.querySelector(selector).classList.toggle(className);
  };
  const ShowUserLogin=()=>{
    toggleClass('.LoginOtpBox','LoginOtpBoxShow');
  }
  const ShowSignUpBox = () => {
    
    toggleClass('.SignUpBox', 'SignUpBoxShow');
  };




  // Define the functions or import them if they are defined elsewhere
  const SliderMove = () => {
    // Logic for SliderMove
    document.getElementById("SliderBar").classList.toggle("Slider-Bar-In");
   
  };

  
  

  const ShowDiamondOPT = () => {
    // Logic for ShowDiamondOPT
    document.getElementById("Login-Diamond-Info").classList.toggle("Show-Diamond-Opt");
    document.getElementById("rotate-arrow-List-Diamond").classList.toggle("Rotate-Arrow");
  };

  const ShowWeddingOPT = () => {
    // Logic for ShowWeddingOPT
    document.getElementById("Login-Wedding-Info").classList.toggle("Show-Wedding-Opt");
    document.getElementById("rotate-arrow-List-Wedding").classList.toggle("Rotate-Arrow");
  };

  const ShowGiftingOPT = () => {
    // Logic for ShowGiftingOPT
    var ShowGifting=document.getElementById("Login-Gifting-Info").classList.toggle("Show-Gifting-Opt");
    ShowGifting
    var rotateArrowGifting=document.getElementById("rotate-arrow-List-Gifting").classList.toggle("Rotate-Arrow");
    rotateArrowGifting
  };
  
  const ShowCollectionsOPT = () => {
    // Logic for ShowCollectionsOPT
    document.getElementById("Login-Collections-Info").classList.toggle("Show-Collections-Opt");
    document.getElementById("rotate-arrow-List-Collections").classList.toggle("Rotate-Arrow");
  };
  const NavAccount =()=>{
    document.querySelector(".AccountShow").classList.toggle("AccountShowBlock");
    // console.log("Acc");
  }
  // const NavCart =()=>{
  //   console.log("Cart");
  // }

  return (
    <>

    <div className="Navheader Navcontainer">
      <div className="Slider-Bar " id="SliderBar">
        
        <div className="Login-SignUp-Box">
         <SliderBarForPhn/>
        </div>
       
      </div>

      <div className="custome-bar" onClick={SliderMove}>
        <span className="material-symbols-outlined menu-items">
          menu
        </span>
      </div>
      <div className="Logo-Shop">
        <p className="logo">PBS</p>
      </div>
      <form action="#" className='w-3/5   Search_Feald'>
      <input type="search" className='text-sm search focus:ring-0' placeholder="Search for Gold Jewellery, Diamond Jewellery and more... " />
      <div className="Search-Icon-Box flex justify-center items-center">
      <button>
        <span class="material-symbols-outlined mt-1 text-red-900 text-3xl">
        search
        </span>
      </button>
      </div>
      </form>
      <div className="nav-link-logos flex align-middle">
      <NavLink to="/Store-Deatils" 
       className={({ isActive }) => (isActive ? 'text-red-900 brightness-200' : 'text-red-900')}

       >
        <span className="material-symbols-outlined top-logo flex flex-col text-center">
        add_business
        <span className="logo-name">STORE</span>
        </span>
        </NavLink>
        <div className="AccountContainer">
       
        <NavLink 
       className={({ isActive }) => (isActive ? 'text-red-900' : 'text-red-900')}
       onClick={NavAccount}
       >
        <span className="material-symbols-outlined top-logo flex flex-col text-center">
        person
        <span className="logo-name">ACCOUNT</span>
        </span>
        </NavLink>

        

        <LoginShow/>

        </div>

        <div className="Admin-Block">
        <NavLink to="/AdminAcc" 
       className={({ isActive }) => (isActive ? 'text-red-900' : 'text-red-900')}
        >
       <span className="material-symbols-outlined top-logo flex flex-col text-center  Admin_Settings">
       manage_accounts
        <span className="logo-name">Admin</span>
        </span>
       </NavLink>
        </div>

        <NavLink to="/Diamond-Details" 
       className={({ isActive }) => (isActive ? 'text-red-900 brightness-200' : 'text-red-900')}
        //  onClick={NavCart}
        >
       <span className="material-symbols-outlined top-logo flex flex-col text-center">
       diamond
        <span className="logo-name">DIAMONDS</span>
        </span>
       </NavLink>

        <NavLink to="/WishList-Deatils" 
       className={({ isActive }) => (isActive ? 'text-red-900 brightness-200' : 'text-red-900')}

       >
        <span className="material-symbols-outlined top-logo flex flex-col text-center">
        favorite
        <span className="logo-name">WISHLIST</span>
        </span>
        </NavLink>
       <NavLink to="/Cart-Deatils" 
       className={({ isActive }) => (isActive ? 'text-red-900 brightness-200' : 'text-red-900')}
      //  onClick={NavCart}
       >
       <span className="material-symbols-outlined top-logo flex flex-col text-center">
        shopping_cart
        <span className="logo-name">CART</span>
        </span>
       </NavLink>
      </div>
      <form action="#"className='w-full  pl-4 pr-4 search-container-two'>
      <div className="flex w-full h-xl">
        <input type="text" className='search focus:ring-0 text-gray-600' placeholder="Search for Gold Jewellery, Diamond Jewellery and more..." />
        <div className="Search-Icon-Box flex justify-center items-center">
      <button>
        <span class="material-symbols-outlined mt-1 text-red-900 text-3xl">
        search
        </span>
      </button>
      </div>
      </div>
      </form>
    </div>
    <div className="nav-item">
      <a href="#J" className="nav-item-name one-item">JEWELLERY</a>
      <a href="#C" className="nav-item-name">COLLECTIONS</a>
      <a href="#W" className="nav-item-name">WEDDING</a>
      <a href="#B" className="nav-item-name">BLOG</a>
      <a href="#G" className="nav-item-name">GIFTING</a>
      <a href="#M" className="nav-item-name">MORE</a>
    </div>


    <div className="AdminLoginBox fixed z-20 w-full">
        <AdminLogin/>
    </div>
    <div className="SignUpBox fixed z-20 w-full">
        <SignupUser/>
    </div>

    <div className="LoginOtpBox fixed z-20  overflow-auto">
    <LoginUsingOtp/>
    </div>
    <div className="LoginPassBox fixed z-20 w-full ">
    <LoginUsingPass/>
   </div>
    </>
  );
}

export default NavBar;
