import React from 'react';
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

  const ShowJewelleryOPT = () => {
    // Logic for ShowJewelleryOPT
    document.getElementById("Login-Jewellery-Info").classList.toggle("Show-Jewellery-Opt");
    document.getElementById("rotate-arrow-List").classList.toggle("Rotate-Arrow");
  };
  
  const ShowGoldOPT = () => {
    // Logic for ShowGoldOPT
    document.getElementById("Login-Gold-Info").classList.toggle("Show-Gold-Opt");
    document.getElementById("rotate-arrow-List-Gold").classList.toggle("Rotate-Arrow");
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
        <span className="material-symbols-outlined Slider-Bar-Exit mt-4 " onClick={SliderMove}>
          arrow_back
        </span>
        <div className="Login-SignUp-Box  h-24">
          <div className="Login-Box ">
            <span className="Login-Names" onClick={ShowUserLogin}>LOGIN</span>
            <span className="Login-Names" onClick={ShowSignUpBox}>SIGNUP</span>
          </div>
        </div>
        <div className="In-Login-Box In-Login-Box-For-Slide-Menue-Bar">
          <div className="In-Login-Box-Info">
            <h6 className="information-link-head link-Head-Width Login-Names-In-Box" id="Jewellery-Name" style={{ lineHeight: 'normal', marginTop: '2%', fontSize: '0.9rem', color: '#af5254' }}>
              Jewellery
            </h6>
            <span className="material-symbols-outlined Show-InBox-Info" id="rotate-arrow-List" onClick={ShowJewelleryOPT}>
              arrow_forward_ios
            </span>
          </div>
          <div className="Show-Login-Box Show-Jewellery-Opt Show-Login-Box1" id="Login-Jewellery-Info">
            <a href="#Track Your Order" className="Track-Your-Order Go-info-link menu-items-Name-Color">Metal and Stone</a>
            <a href="#Track Your Order" className="Track-Your-Order Go-info-link menu-items-Name-Color">Category</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">Curated Shops</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">Shop For</a>
          </div>
          <div className="In-Login-Box-Info">
            <h6 className="information-link-head link-Head-Width Login-Names-In-Box" id="Gold-Name" style={{ lineHeight: 'normal', fontSize: '0.9rem', color: '#af5254' }}>
              Gold
            </h6>
            <span className="material-symbols-outlined Show-InBox-Info" id="rotate-arrow-List-Gold" onClick={ShowGoldOPT}>
              arrow_forward_ios
            </span>
          </div>
          <div className="Show-Login-Box Show-Gold-Opt Show-Login-Box2" id="Login-Gold-Info">
            <a href="#Track Your Order" className="Track-Your-Order Go-info-link menu-items-Name-Color">Bangle</a>
            <a href="#Track Your Order" className="Track-Your-Order Go-info-link menu-items-Name-Color">Earrings</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">Gold Chains</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">Pendants</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">Finger Rings</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">Necklace Set</a>
            <a href="#Track Your Order" className="Go-info-link Bold-View">View All</a>
          </div>
          <div className="In-Login-Box-Info">
            <h6 className="information-link-head link-Head-Width Login-Names-In-Box" id="Diamond-Name" style={{ lineHeight: 'normal', fontSize: '0.9rem', color: '#af5254' }}>
              Diamond
            </h6>
            <span className="material-symbols-outlined Show-InBox-Info" id="rotate-arrow-List-Diamond" onClick={ShowDiamondOPT}>
              arrow_forward_ios
            </span>
          </div>
          <div className="Show-Login-Box Show-Diamond-Opt Show-Login-Box2" id="Login-Diamond-Info">
            <a href="#Track Your Order" className="Track-Your-Order Go-info-link menu-items-Name-Color">Bangle</a>
            <a href="#Track Your Order" className="Track-Your-Order Go-info-link menu-items-Name-Color">Earrings</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">Gold Chains</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">Pendants</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">Finger Rings</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">Necklace Set</a>
            <a href="#Track Your Order" className="Go-info-link Bold-View">View All</a>
          </div>
          <div className="In-Login-Box-Info">
            <h6 className="information-link-head link-Head-Width Login-Names-In-Box" style={{ lineHeight: 'normal', fontSize: '0.9rem', color: '#af5254' }}>
              Earrings
            </h6>
          </div>
          <div className="In-Login-Box-Info">
            <h6 className="information-link-head link-Head-Width Login-Names-In-Box" style={{ lineHeight: 'normal', fontSize: '0.9rem', color: '#af5254' }}>
              Rings
            </h6>
          </div>
          <div className="In-Login-Box-Info">
            <h6 className="information-link-head link-Head-Width Login-Names-In-Box" style={{ lineHeight: 'normal', fontSize: '0.9rem', color: '#af5254' }}>
              Necklace Set
            </h6>
          </div>
          <div className="In-Login-Box-Info">
            <h6 className="information-link-head link-Head-Width Login-Names-In-Box" id="Wedding-Name" style={{ lineHeight: 'normal', fontSize: '0.9rem', color: '#af5254' }}>
              Wedding
            </h6>
            <span className="material-symbols-outlined Show-InBox-Info" id="rotate-arrow-List-Wedding" onClick={ShowWeddingOPT}>
              arrow_forward_ios
            </span>
          </div>
          <div className="Show-Login-Box Show-Wedding-Opt Show-Login-Box1" id="Login-Wedding-Info">
            <a href="#Track Your Order" className="Track-Your-Order Go-info-link menu-items-Name-Color">Jewellery</a>
            <a href="#Track Your Order" className="Track-Your-Order Go-info-link menu-items-Name-Color">Engagement</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">Shop For</a>
          </div>
          <div className="In-Login-Box-Info">
            <h6 className="information-link-head link-Head-Width Login-Names-In-Box" id="Gifting-Name" style={{ lineHeight: 'normal', fontSize: '0.9rem', color: '#af5254' }}>
              Gifting
            </h6>
            <span className="material-symbols-outlined Show-InBox-Info" id="rotate-arrow-List-Gifting" onClick={ShowGiftingOPT}>
              arrow_forward_ios
            </span>
          </div>
          <div className="Show-Login-Box Show-Gifting-Opt Show-Login-Box1" id="Login-Gifting-Info">
            <a href="#Track Your Order" className="Track-Your-Order Go-info-link menu-items-Name-Color">Below 500 USD</a>
            <a href="#Track Your Order" className="Track-Your-Order Go-info-link menu-items-Name-Color">500 - 1000 USD</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">1000 - 2000 USD</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">2000 - 5000 USD</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">Above 5000 USD</a>
          </div>
          <div className="In-Login-Box-Info">
            <h6 className="information-link-head link-Head-Width Login-Names-In-Box" id="Collections-Name" style={{ lineHeight: 'normal', fontSize: '0.9rem', color: '#af5254' }}>
              Collections
            </h6>
            <span className="material-symbols-outlined Show-InBox-Info" id="rotate-arrow-List-Collections" onClick={ShowCollectionsOPT}>
              arrow_forward_ios
            </span>
          </div>
          <div className="Show-Login-Box Show-Collections-Opt Show-Login-Box1" id="Login-Collections-Info">
            <a href="#Track Your Order" className="Track-Your-Order Go-info-link menu-items-Name-Color">Dharohar</a>
            <a href="#Track Your Order" className="Track-Your-Order Go-info-link menu-items-Name-Color">kakatiya</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">Aarambh</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">Akshayam</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">Aaheli</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">Aveer</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">Devyani</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">Utsaah</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">Mangalam</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">Ekatvam</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">Nyusha</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">Utsava</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">Swayahm</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">Shagun</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">Udayam</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">Little Big Moments</a>
          </div>
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
      <input type="text" className='text-sm search focus:ring-0' placeholder="Search for Gold Jewellery, Diamond Jewellery and more... " />
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
