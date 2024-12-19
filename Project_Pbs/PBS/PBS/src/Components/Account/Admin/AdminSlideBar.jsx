import React, { useContext } from 'react'
import './AdminAcc.css'
import { useNavigate } from 'react-router-dom';
import AdminContext from '../../Context/AdminContext';
function AdminSlideBar() {

    const {adminData} = useContext(AdminContext)

    const adminName = adminData?.data?.adminFullName || "Admin";

    const SlideBarItems = [
        {
          id: 1,
          name: "Dashboard",
          logo: "rounded_corner",
          slug: "/AdminAcc"
        },
        {
          id: 2,
          name: "Users",
          logo: "group",
          slug: "/AllUsers"
        },
        {
          id: 3,
          name: "Pricing",
          logo: "credit_card_gear"
        },
        {
          id: 4,
          name: "Authentication",
          logo: "verified_user"
        },
        {
          id: 5,
          name: "Settings",
          logo: "tune"
        },
    
      ]

      const navigate = useNavigate();
      const hsndleSlideBarItemClick = (SlideBarItem) => {
        // alert(SlideBarItem.name)
        navigate(SlideBarItem.slug)
      }

  return (
    <>
    <div className="w-64 slideBar-AdminPanel p-6 flex flex-col justify-between sticky top-0 h-screen overflow-auto">
          <div className="slideBarBox">
            <h1 className="text-2xl font-bold text-white mb-6">ControlHub</h1>
              <div className="searchAdminBox flex  w-full  pl-2 adminSearch-Box">
              <span class="material-symbols-outlined adminSearchLogo">
            search
            </span>
            <input
              type="text"
              placeholder="Search for..."
              className="w-full adminSearch placeholder-[#AEB9C6] focus:ring-0"
            />
              </div>
            <nav className="mt-8 space-y-4">
            {SlideBarItems.map( (SlideBarItem, index) => (
                     <div className="logos-slideBar flex gap-1" key={index.id} onClick={() => hsndleSlideBarItemClick(SlideBarItem)}>
                     <span class="material-symbols-outlined SlideBar-Logos">
                     {SlideBarItem.logo}
                     </span>
                     <span  className="block cursor-pointer SlideBar-Logos"> {SlideBarItem.name} </span>
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
            <span> {adminName} </span>
          </div>
        </div>
    </>
  )
}

export default AdminSlideBar
