import React, { useState } from 'react';
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
  const [UserSearchValue, setUserSearchValue] = useState('');

  const UserSearch = (e) => {
    e.preventDefault();
    console.log(UserSearchValue);
  };

  const toggleClass = (selector, className) => {
    document.querySelector(selector).classList.toggle(className);
  };

  const SliderMove = () => {
    toggleClass('#SliderBar', 'Slider-Bar-In');
  };

  const NavAccount = () => {
    toggleClass('.AccountShow', 'AccountShowBlock');
  };

  return (
    <>
      <div className="Navheader Navcontainer">
        <div className="Slider-Bar" id="SliderBar">
          <div className="Login-SignUp-Box">
            <SliderBarForPhn />
          </div>
        </div>

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
            placeholder="Search for Gold Jewellery, Diamond Jewellery and more..."
          />
          <div className="Search-Icon-Box flex justify-center items-center">
            <button>
              <span className="material-symbols-outlined mt-1 text-red-900 text-3xl">search</span>
            </button>
          </div>
        </form>

        <div className="nav-link-logos flex align-middle">
          <NavLink
            to="/Store-Deatils"
            className={({ isActive }) =>
              isActive ? 'text-red-900 brightness-200' : 'text-red-900'
            }
          >
            <span className="material-symbols-outlined top-logo flex flex-col text-center">
              add_business
              <span className="logo-name">STORE</span>
            </span>
          </NavLink>

          <div className="AccountContainer">
            <NavLink
              to="#"
              className="text-red-900"
              onClick={NavAccount}
            >
              <span className="material-symbols-outlined top-logo flex flex-col text-center">
                person
                <span className="logo-name">ACCOUNT</span>
              </span>
            </NavLink>
            <LoginShow />
          </div>

          <div className="Admin-Block">
            <NavLink
              to="/AdminAcc"
              className={({ isActive }) =>
                isActive ? 'text-red-900' : 'text-red-900'
              }
            >
              <span className="material-symbols-outlined top-logo flex flex-col text-center Admin_Settings">
                manage_accounts
                <span className="logo-name">Admin</span>
              </span>
            </NavLink>
          </div>

          <NavLink
            to="/Diamond-Details"
            className={({ isActive }) =>
              isActive ? 'text-red-900 brightness-200' : 'text-red-900'
            }
          >
            <span className="material-symbols-outlined top-logo flex flex-col text-center">
              diamond
              <span className="logo-name">DIAMONDS</span>
            </span>
          </NavLink>

          <NavLink
            to="/WishList-Deatils"
            className={({ isActive }) =>
              isActive ? 'text-red-900 brightness-200' : 'text-red-900'
            }
          >
            <span className="material-symbols-outlined top-logo flex flex-col text-center">
              favorite
              <span className="logo-name">WISHLIST</span>
            </span>
          </NavLink>

          <NavLink
            to="/Cart-Deatils"
            className={({ isActive }) =>
              isActive ? 'text-red-900 brightness-200' : 'text-red-900'
            }
          >
            <span className="material-symbols-outlined top-logo flex flex-col text-center">
              shopping_cart
              <span className="logo-name">CART</span>
            </span>
          </NavLink>
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
              placeholder="Search for Gold Jewellery, Diamond Jewellery and more..."
            />
            <div className="Search-Icon-Box flex justify-center items-center">
              <button>
                <span className="material-symbols-outlined mt-1 text-red-900 text-3xl">search</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="nav-item">
        <a href="#J" className="nav-item-name one-item">JEWELLERY</a>
        <a href="#C" className="nav-item-name">COLLECTIONS</a>
        <a href="#W" className="nav-item-name">WEDDING</a>
        <a href="#B" className="nav-item-name">REVIEWS</a>
        <a href="#G" className="nav-item-name">GIFTING</a>
        <a href="#M" className="nav-item-name">MORE</a>
      </div>

      <div className="AdminLoginBox fixed z-20 w-full  overflow-auto">
        <AdminLogin />
      </div>
      <div className="SignUpBox fixed z-20 w-full overflow-auto">
        <SignupUser />
      </div>
      <div className="LoginOtpBox fixed z-20 overflow-auto">
        <LoginUsingOtp />
      </div>
      <div className="LoginPassBox fixed z-20 w-full  overflow-auto">
        <LoginUsingPass />
      </div>
    </>
  );
}

export default NavBar;
