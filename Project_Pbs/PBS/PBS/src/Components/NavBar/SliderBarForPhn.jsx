import React, { useState, useContext, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
// Context
import ProfileContext from '../Context/ProfileContext';
import RegisterContext from '../Context/RegisterContext';
import './SliderBarForPhn.css';
function SliderBarForPhn() {
	const [loginLogoutTitle, setLoginLogoutTitle] = useState('')
	const [userName, setUserName] = useState('')
	const {userData} = useContext(ProfileContext)
	const {setLogout} = useContext(RegisterContext)

	useEffect(() => {
		if (userData) {
			setLoginLogoutTitle("Logout")
			setUserName(userData.fullName?.split(' ')[0])
		}
	  }, [userData]);
	
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

	  const navigate = useNavigate();
	  

	  const menuLinks=[
		{
		  id : 1,
		  name: 'Home',
		  slug: '/',
		  logo: 'home',
		  active: true,
		} ,
		{
			id : 2,
			name: 'Search',
			slug: '/',
			logo: 'search',
			active: true,
		} ,
		{
			id : 3,
			name: 'Chat',
			slug: '/',
			logo: 'chat',
			active: true,
		},
		{
			id : 4,
			name: 'Orders',
			slug: '/',
			logo: 'orders',
			active: true,
		} ,
		{
			id : 5,
			name: 'Wishlist',
			slug: '/WishList-Deatils',
			logo: 'favorite',
			active: true,
		} ,
		{
			id : 6,
			name: 'Settings',
			slug: '/',
			logo: 'settings',
			active: true,
		} ,
		{
			id : 7,
			name: loginLogoutTitle,
			slug: '/',
			logo: 'login',
			active: true,
		} , 
	]

	const menuLinkClick = (item) => {
		if (item.name === "Logout") {
		  setLogout(true);
		  console.log('Logged out:', item);
		  // Redirect to login page or homepage after logout
		  navigate('/');
		} else {
		  navigate(item.slug);
		}
	  };
	  


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
				<span className="material-symbols-outlined  text-red-900 text-3xl">
                 search
                </span>
				</button>
			</span>
			<input type="search" onChange={(e)=>setUserSlideSearchValue(e.target.value)}  name="Search" placeholder="Search..." className="search focus:ring-0 w-full py-2 pl-10 text-sm dark:border- rounded-md focus:outline-none  dark:text-gray-800 " />
		</div>
		</form>
	 </div>

	 {/* menuItems */}
		<div className="flex-1 pl-2">
			<ul className="pt-2   space-y-1 text-sm flex flex-col gap-3">
				{menuLinks.map((item) =>
				item.active? (
					<li className="rounded-sm " onClick={ ()=> menuLinkClick(item)}>
					<span className='flex items-center p-2 space-x-3 rounded-md'>
						
						<span className="material-symbols-outlined text-red-900 font-bold">
                         {item.logo}
                        </span>
						
						<span> {item.name} </span>
					</span>
				</li>
				) : null
				)}
			
				

			</ul>
		</div>
		
	</div>
	<Link to='/UserAcc' onClick={SliderMove}>
	<div className="flex items-center pl-2  space-x-4 justify-self-end Profile-Box">
		<img src="https://www.pngitem.com/pimgs/m/130-1300253_female-user-icon-png-download-user-image-color.png" alt="" className="w-12 h-12 rounded-lg dark:bg-gray-500" />
		<div> 
			<h2 className="text-lg font-semibold">Hi {userName} </h2>
			<span className="flex items-center space-x-1">
				<button className="text-xs hover:underline dark:text-gray-600">View profile</button>
			</span>
		</div>
	</div>
	</Link>
</div>
    </>
  )
}

export default SliderBarForPhn
