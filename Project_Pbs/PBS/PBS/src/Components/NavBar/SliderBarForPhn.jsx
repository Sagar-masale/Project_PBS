import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SliderBarForPhn.css';
function SliderBarForPhn() {
	const toggleClass = (selector, className) => {
	  document.querySelector(selector).classList.toggle(className);
	};
	const SlideBarValue =(e)=>{
		e.preventDefault()
		console.log(userSlideSearchValue);
	}
    const SliderMove = () => {
        // Logic for SliderMove
        toggleClass('#SliderBar','Slider-Bar-In');
    };
	const ShowLoginPassBox = () => {
		toggleClass('#SliderBar','Slider-Bar-In');
		toggleClass('.LoginOtpBox', 'LoginOtpBoxShow');
	};
	  const [userSlideSearchValue, setUserSlideSearchValue]=useState('');	
  return (
    <>
<div className="flex flex-col h-full  dark:bg-red-40 dark:text-gray-800">
	<div className="space-y-3 ">
	 <div className="SliderBar-Color-Box w-full ">
	 <div className="flex items-center justify-between">
        <h2 className='text-red-900'>PBS</h2>
        <span className="material-symbols-outlined Slider-Bar-Exit " onClick={SliderMove}>
          arrow_back
        </span>
			
		
		</div>
		<form action="#" onSubmit={SlideBarValue}  className="SlideBar">
		<div className="relative ">
			<span className="absolute inset-y-0 left-0 flex items-center py-4">
				<button type="submit" className="p-2">
				<span class="material-symbols-outlined  text-red-900 text-3xl">
                 search
                </span>
				</button>
			</span>
			<input type="search" onChange={(e)=>setUserSlideSearchValue(e.target.value)}  name="Search" placeholder="Search..." className="search focus:ring-0 w-full py-2 pl-10 text-sm dark:border- rounded-md focus:outline-none  dark:text-gray-800 " />
		</div>
		</form>
	 </div>
		<div className="flex-1 pl-2">
			<ul className="pt-2   space-y-1 text-sm flex flex-col gap-3">
				<Link to='/'>
				<li className="rounded-sm " onClick={SliderMove}>
					<span className='flex items-center p-2 space-x-3 rounded-md'>
						
						<span class="material-symbols-outlined text-red-900 font-bold">
                         home
                        </span>
						
						<span>Home</span>
					</span>
				</li>
				</Link>
				<li className="rounded-sm">
					<button className="flex items-center p-2 space-x-3 rounded-md">
					<span class="material-symbols-outlined text-red-900 font-bold">
                     search
                    </span>
						<span>Search</span>
					</button>
				</li>
				<li className="rounded-sm">
					<button className="flex items-center p-2 space-x-3 rounded-md">
					<span class="material-symbols-outlined text-red-900 font-bold">
                     chat
                    </span>
						<span>Chat</span>
					</button>
				</li>
				<li className="rounded-sm">
					<button className="flex items-center p-2 space-x-3 rounded-md">
					<span class="material-symbols-outlined text-red-900 font-bold">
                     orders
                    </span>
						<span>Orders</span>
					</button>
				</li>
				<li className="rounded-sm  dark:text-gray-900">
					<button className="flex items-center p-2 space-x-3 rounded-md">
					<span class="material-symbols-outlined text-red-900 font-bold">
                     favorite
                    </span>
						<span>Wishlist</span>
					</button>
				</li>
				<li className="rounded-sm">
					<button className="flex items-center p-2 space-x-3 rounded-md">
					<span class="material-symbols-outlined text-red-900 font-bold">
                     settings
                    </span>
						<span>Settings</span>
					</button>
				</li>
				<li className="rounded-sm User-LogIn" onClick={ShowLoginPassBox}>
					<button className="flex items-center p-2 space-x-3 rounded-md">
					<span class="material-symbols-outlined  text-red-900 font-bold">
                     login
                    </span>
						<span>Log In</span>
					</button>
				</li>
				<li className="rounded-sm User-LogOunt">
					<button className="flex items-center p-2 space-x-3 rounded-md">
					<span class="material-symbols-outlined text-red-900 font-bold">
                     logout
                    </span>
						<span>Logout</span>
					</button>
				</li>
			</ul>
		</div>
	</div>
	<div className="flex items-center pl-2  mt-5 space-x-4 justify-self-end Profile-Box">
		<img src="https://www.pngitem.com/pimgs/m/130-1300253_female-user-icon-png-download-user-image-color.png" alt="" className="w-12 h-12 rounded-lg dark:bg-gray-500" />
		<div> 
			<h2 className="text-lg font-semibold">Hi Oggey </h2>
			<span className="flex items-center space-x-1">
				<button className="text-xs hover:underline dark:text-gray-600">View profile</button>
			</span>
		</div>
	</div>
</div>
    </>
  )
}

export default SliderBarForPhn
