import React, { useRef } from "react";
import { useState } from "react";
import './AdminAcc.css'



function AdminAcc() {
  // Get Items Image
  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const ShowEditBox=()=>{
    document.querySelector('.Edit-Box').classList.toggle('Edit-Box-Show');
    console.log("Cli");
    
  }




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

  const onClickDeleteItemsButton=()=>{
    
    document.querySelector('.DeleteItems-Container').classList.toggle('DeleteItems-Container-Show');
  }
  const onClickUpdateItemsButton=()=>{
    
    document.querySelector('.UpdateItems-Container').classList.toggle('UpdateItems-Container-Show');
  }
  const onClickUsersButton=()=>{
    
    document.querySelector('.Users-Container').classList.toggle('Users-Container-Show');
  }
  const onClickOrdersButton=()=>{
    
    document.querySelector('.Orders-Container').classList.toggle('Orders-Container-Show');
  }




  

 
  

  const admin = {
    name: 'Admin',

    bio: 'Admin of the platform. Managing user accounts, content, and site settings.',
    profilePicture: 'data:image/jpeg;base64,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', // Placeholder image
  };

  return (
    <>
    <div className=' pt-5 w-full h-full  flex   justify-center Admin-Main-Container'>
    <div className="w-full  h-full  gap-48 flex flex-row justify-center">
      
      <div className="AdminAccount-Container p-6 sm:p-12 bg-gray-800 text-gray-100">
	<div className="w-full flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
		<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSipZFVYJ9-ohTUiKfSicnJb9FyZoZm3TQDGw&s" alt="" className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start bg-gray-500 border-gray-700" />
		<div className="flex flex-col w-full">
			<h4 className="text-lg font-semibold text-center md:text-left">Hello Sagar</h4>
			<p className="text-gray-400">Dear Admins,<br /><br />

We're excited to inform you about the implementation of a new security protocol that will significantly enhance the protection of our system and user data. </p>
		</div>
	</div>
	<div className="flex justify-center pt-4 space-x-4 align-center">
		<a rel="noopener noreferrer" href="#" aria-label="GitHub" className="p-2 rounded-md text-gray-100 hover:text-violet-400">
			<svg viewBox="0 0 496 512" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current">
				<path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
			</svg>
		</a>
		<a rel="noopener noreferrer" href="#" aria-label="Dribble" className="p-2 rounded-md text-gray-100 hover:text-violet-400">
			<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current">
				<path d="M256 8C119.252 8 8 119.252 8 256s111.252 248 248 248 248-111.252 248-248S392.748 8 256 8zm163.97 114.366c29.503 36.046 47.369 81.957 47.835 131.955-6.984-1.477-77.018-15.682-147.502-6.818-5.752-14.041-11.181-26.393-18.617-41.614 78.321-31.977 113.818-77.482 118.284-83.523zM396.421 97.87c-3.81 5.427-35.697 48.286-111.021 76.519-34.712-63.776-73.185-116.168-79.04-124.008 67.176-16.193 137.966 1.27 190.061 47.489zm-230.48-33.25c5.585 7.659 43.438 60.116 78.537 122.509-99.087 26.313-186.36 25.934-195.834 25.809C62.38 147.205 106.678 92.573 165.941 64.62zM44.17 256.323c0-2.166.043-4.322.108-6.473 9.268.19 111.92 1.513 217.706-30.146 6.064 11.868 11.857 23.915 17.174 35.949-76.599 21.575-146.194 83.527-180.531 142.306C64.794 360.405 44.17 310.73 44.17 256.323zm81.807 167.113c22.127-45.233 82.178-103.622 167.579-132.756 29.74 77.283 42.039 142.053 45.189 160.638-68.112 29.013-150.015 21.053-212.768-27.882zm248.38 8.489c-2.171-12.886-13.446-74.897-41.152-151.033 66.38-10.626 124.7 6.768 131.947 9.055-9.442 58.941-43.273 109.844-90.795 141.978z"></path>
			</svg>
		</a>
		<a rel="noopener noreferrer" href="#" aria-label="Twitter" className="p-2 rounded-md text-gray-100 hover:text-violet-400">
			<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current">
				<path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
			</svg>
		</a>
		<a rel="noopener noreferrer" href="#" aria-label="Email" className="p-2 rounded-md text-gray-100 hover:text-violet-400">
			<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current">
				<path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path>
			</svg>
		</a>
	</div>
    {/* Edit box */}
    <div class="relative  inline-block">
  <div
    onClick={ShowEditBox}
    className="bg-white hover:bg-slate-100 py-2 rounded-md shadow-lg hover:cursor-pointer flex justify-center items-center gap-4 px-4"
  >
        <svg class="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
        </svg>
    <button className="text-black">
    Edit
    </button>
  </div>

  <div
    class="Edit-Box absolute left-0 mt-2 w-96  bg-white  border border-gray-200 rounded-md shadow-lg flex-col   transition-opacity duration-1000"
  >
   <div onClick={onClickAddItemsButton} class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
          <div class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
          <svg class="h-6 w-6 text-gray-600 group-hover:text-red-900" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <div>
            <button class="font-semibold text-gray-900">
              Add items
              <span class="absolute inset-0"></span>
            </button>
            <p class="mt-1 text-gray-600">Add images and dec in Category</p>
          </div>
        </div>

        <div onClick={onClickDeleteItemsButton} class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
          <div class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            
            <button class="material-symbols-outlined h-6 w-6 text-gray-600 group-hover:text-red-900 font-semibold">
             delete
            </button>
            
          </div>
          <div>
            <a span class="font-semibold text-gray-900">
              Delete items 
              <span class="absolute inset-0"></span>
            </a>
            <p class="mt-1 text-gray-600">Delete Items any Category</p>
          </div>
        </div>

        <div onClick={onClickUpdateItemsButton} class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
          <div class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
          <button class="material-symbols-outlined h-6 w-6 text-gray-600 group-hover:text-red-900 font-semibold">
           update
          </button>
          </div>
          <div>
            <span class="font-semibold text-gray-900">
              Update
              <span class="absolute inset-0"></span>
            </span>
            <p class="mt-1 text-gray-600">Update category and data</p>
          </div>
        </div>

        <div onClick={onClickUsersButton} class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
          <div class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
          <button class="material-symbols-outlined h-6 w-6 text-gray-600 group-hover:text-red-900 font-semibold">
             person
            </button>
          </div>
          <div>
            <span class="font-semibold text-gray-900">
              Users 
              <span class="absolute inset-0"></span>
            </span>
            <p class="mt-1 text-gray-600">show all users </p>
          </div>
        </div>

        <div class="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
        <button class="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100">
          <svg class="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z" clip-rule="evenodd" />
          </svg>
          Watch demo
        </button>
        <button class=" flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100">
          <svg class="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clip-rule="evenodd" />
          </svg>
          Contact Developer
        </button>
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
        {/* <p className="AddName">
          Add Image
        </p> */}

      <input
        className="InfoAccess-Input-Feild"
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        value={formData.newimage}
        onChange={handleChange}
        // onChange={handleFileChange}   
        />

        {/* Form Add items details */}
        <div className="FormFeilds-AddItems">
        <form onSubmit={handleSubmit}>
      <div className="Form-Section">
        <label className="category text-black font-bold">Category:</label>
        <select
          className="SelectCategory-Items focus:ring-0"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option className="SelectItems-Name Select-Category-Name" value="">Select Category</option>
          <option className="SelectItems-Name  " value="Finger Rings">Finger Rings</option>
          <option className="SelectItems-Name" value="Earrings">Earrings</option>
          <option className="SelectItems-Name" value="Pendants">Pendants</option>
          <option className="SelectItems-Name" value="mangalsutra">mangalsutra</option>
          <option className="SelectItems-Name" value="Bangles">Bangles</option>
          <option className="SelectItems-Name" value="Chains">Chains</option>
          {/* Add more categories as needed */}
        </select>








      </div>
      <div className="SetCssFeild">
      <div >
        <label className="Heading-LabelFor-AddItems">Title:</label>
        <input
          className="InfoAccess-Input-Feild  focus:ring-0"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="Heading-LabelFor-AddItems ">Price:</label>
        <input
          className="InfoAccess-Input-Feild  focus:ring-0"
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="Heading-LabelFor-AddItems">Description:</label>
        <input
          className="InfoAccess-Input-Feild  focus:ring-0"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="Heading-LabelFor-AddItems">About:</label>
        <input
          className="InfoAccess-Input-Feild  focus:ring-0"
          type="text"
          name="about"
          value={formData.about}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="AddItems-Submit-Buttom w-full h-12 rounded-md text-white bg-red-900 hover:bg-red-800 ">Submit</button>
      </div>
    </form>
        </div>
          </div>
      </div>


      {/* Delete Items */}
      <div className="DeleteItems-Container w-full ">
        <h1>Delete items block</h1>
       


      </div>


            {/* Update Items */}
      <div className="UpdateItems-Container w-full ">
        <h1>Update items block</h1>
      </div>



           {/* User Block */}
      <div className="Users-Container w-full ">
        <h1>User block</h1>
      </div>


      
           {/* Orders Block */}
      <div className="Orders-Container w-full ">
        <h1>Order block</h1>
      </div>


   
      </>
  )
}

export default AdminAcc;
