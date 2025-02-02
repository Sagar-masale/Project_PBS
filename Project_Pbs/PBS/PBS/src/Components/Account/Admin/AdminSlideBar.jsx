import React, { useContext, useState } from 'react';
import './AdminAcc.css';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminContext from '../../Context/AdminContext';
import LogoutAdmin from './AdminSlideBarComponent/LogoutAdmin';

function AdminSlideBar() {
  const { adminData } = useContext(AdminContext);
  const adminName = adminData?.data?.adminFullName || "Admin";
  const [showLogout, setShowLogout] = useState(false); // State for logout modal

  const SlideBarItems = [
    { id: 1, name: "Dashboard", logo: "rounded_corner", slug: "/AdminAcc" },
    { id: 2, name: "Users", logo: "group", slug: "/AllUsers" },
    { id: 3, name: "Add Products", logo: "category", slug: "/Add-Products" },
    { id: 4, name: "Pricing", logo: "credit_card_gear", slug: "/Pricing" },
    { id: 5, name: "Authentication", logo: "verified_user", slug: "/Authentication" },
    { id: 6, name: "LogOut", logo: "logout" },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const handleSlideBarItemClick = (SlideBarItem) => {
    if (SlideBarItem.name === "LogOut") {
      setShowLogout(true); // Show the logout modal
    } else {
      navigate(SlideBarItem.slug);
    }
  };

  return (
    <>
      {/* Show LogoutAdmin component only when showLogout is true */}
      {showLogout && <LogoutAdmin onCancel={() => setShowLogout(false)} />}

      <div className="w-64 slideBar-AdminPanel p-6 flex flex-col justify-between sticky top-0 h-screen overflow-auto">
        <div className="slideBarBox">
          <h1 className="text-2xl font-bold text-white mb-6">ControlHub</h1>
          <div className="searchAdminBox SlideBar-Logos-Active flex w-full pl-2 adminSearch-Box">
            <span className="material-symbols-outlined adminSearchLogo">search</span>
            <input type="text" placeholder="Search for..." className="w-full adminSearch placeholder-[#AEB9C6] focus:ring-0" />
          </div>
          <nav className="mt-8 space-y-4">
            {SlideBarItems.map((SlideBarItem) => (
              <div
                key={SlideBarItem.id}
                onClick={() => handleSlideBarItemClick(SlideBarItem)}
                className={`logos-slideBar flex gap-1 cursor-pointer ${
                  location.pathname === SlideBarItem.slug ? 'SlideBar-Logos-Active' : 'SlideBar-Logos-Noactive'
                }`}
              >
                <span className="material-symbols-outlined ">{SlideBarItem.logo}</span>
                <span className="block">{SlideBarItem.name}</span>
              </div>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-3">
          <img
            src="https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-600nw-418179856.jpg"
            alt="admin"
            className="w-10 h-10 rounded-full"
          />
          <span>{adminName}</span>
        </div>
      </div>
    </>
  );
}

export default AdminSlideBar;
