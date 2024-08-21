import React, { useRef } from "react";
import { useState } from "react";
import './AdminAcc.css'



function AdminAcc() {
  // Get Items Image
  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };





  // Get Data about Items
  const [formData, setFormData] = useState({
    newimage: "",
    category: "",
    title: "",
    price: "",
    description: "",
    about: ""
  });

  const handleChange = (e) => {

    
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };





  const ShowEditOpt =()=>{
    document.querySelector('.Setting-Opt-Box').classList.toggle('Setting-Opt-Box-Show');
  }
  const onClickAddItemsButton=()=>{
    
    document.querySelector('.AddItems-Container').classList.toggle('AddItems-Container-Show');
  }




  

 
  

  const admin = {
    name: 'Admin',

    bio: 'Admin of the platform. Managing user accounts, content, and site settings.',
    profilePicture: 'data:image/jpeg;base64,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', // Placeholder image
  };

  return (
    <>
    <div className='pl-5 pt-5 pr-5 w-full  flex   justify-center Admin-Main-Container'>
    <div className="max-w-full h-full pl-10 pr-10 gap-48 flex flex-row justify-center">
      {/* Left Side */}
      <div className=" w-full flex flex-col items-center">
      <div className="ImageBox ">
      <img
          src={admin.profilePicture}
          alt="Admin Profile"
          className="Image-Admin"
        />
      </div>
        <h2 className="text-2xl font-bold mb-2">{admin.name}</h2>

        <p className="mt-4 text-center text-gray-700">{admin.bio}</p>
      </div>

      {/* Right Side */}
      <div className=" flex flex-col Right-Side-Admin-Block w-full">
      <div class="lg:flex lg:items-center lg:justify-between">
  <div class="w-full  ">
    <h2 class="text-2xl font-bold leading-7 text-gray-900   ">Settings</h2>
    <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">


      <div class="mt-2 flex items-center text-sm text-gray-500">
        <svg class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clip-rule="evenodd" />
        </svg>
        Closing on January 9, 2020
      </div>
    </div>
  </div>
  <div class="mt-5 flex lg:ml-4 lg:mt-0">
    <span class="hidden sm:block">
      <button type="button" onClick={ShowEditOpt} class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        <svg class="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
        </svg>
        Edit
      </button>
    </span>



    <span class="sm:ml-3">
      <button type="button" class="inline-flex items-center rounded-md bg-red-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        <svg class="-ml-0.5 mr-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
        </svg>
        Publish
      </button>
    </span>

   
    <div class="relative ml-3 sm:hidden">
      <button type="button" class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400" id="mobile-menu-button" aria-expanded="false" aria-haspopup="true">
        More
        <svg class="-mr-1 ml-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
      </button>


      <div class="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="mobile-menu-button" tabindex="-1">
     
        <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="mobile-menu-item-0">Edit</a>
        <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="mobile-menu-item-1">View</a>
      </div>
    </div>
  </div>
</div>
<div class="relative">



  <div class="Setting-Opt-Box absolute left-1/2 z-10 mt-5   -translate-x-1/2 px-4 overflow-hidden ml-5">
    <div  class="Setting-Otp-Container w-screen max-w-md flex-auto   bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 pb-5">
      <div  class="p-4">
        <div onClick={onClickAddItemsButton} class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
          <div class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
          <svg class="h-6 w-6 text-gray-600 group-hover:text-red-900" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <div>
            <a href="#" class="font-semibold text-gray-900">
              Add items
              <span class="absolute inset-0"></span>
            </a>
            <p class="mt-1 text-gray-600">Add images and dec in Category</p>
          </div>
        </div>
        <div class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
          <div class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            
            <span class="material-symbols-outlined h-6 w-6 text-gray-600 group-hover:text-red-900 font-semibold">
             delete
            </span>
            
          </div>
          <div>
            <a href="#" class="font-semibold text-gray-900">
              Delete items 
              <span class="absolute inset-0"></span>
            </a>
            <p class="mt-1 text-gray-600">Delete Items any Category</p>
          </div>
        </div>
        <div class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
          <div class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
          <span class="material-symbols-outlined h-6 w-6 text-gray-600 group-hover:text-red-900 font-semibold">
           update
          </span>
          </div>
          <div>
            <a href="#" class="font-semibold text-gray-900">
              Update
              <span class="absolute inset-0"></span>
            </a>
            <p class="mt-1 text-gray-600">Update category and data</p>
          </div>
        </div>
        <div class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
          <div class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
          <span class="material-symbols-outlined h-6 w-6 text-gray-600 group-hover:text-red-900 font-semibold">
             person
            </span>
          </div>
          <div>
            <a href="#" class="font-semibold text-gray-900">
              Users 
              <span class="absolute inset-0"></span>
            </a>
            <p class="mt-1 text-gray-600">show all users </p>
          </div>
        </div>
        <div class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
          <div class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
          <span class="material-symbols-outlined h-6 w-6 text-gray-600 group-hover:text-red-900 font-semibold">
           deployed_code
          </span>
          </div>
          <div>
            <a href="#" class="font-semibold text-gray-900">
              Orders
              <span class="absolute inset-0"></span>
            </a>
            <p class="mt-1 text-gray-600">Checkout orders</p>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
        <a href="#" class="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100">
          <svg class="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z" clip-rule="evenodd" />
          </svg>
          Watch demo
        </a>
        <a href="#" class="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100">
          <svg class="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clip-rule="evenodd" />
          </svg>
          Contact Developer
        </a>
      </div>
    </div>
  </div>
</div>
        
      </div>
    </div>

    </div>
        <div className="AddItems-Container w-full  ">
          <div className="SubContainer-AddItems">
          <div onClick={handleIconClick} className="AddItems-Box bg-gray-200 hover:bg-gray-300 flex items-center justify-center rounded-lg cursor-pointer">
        <span class="material-symbols-outlined Add_Logo">
         add
        </span>
        </div>
    

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}   
        />
          </div>
      </div>


   
      </>
  )
}

export default AdminAcc;
