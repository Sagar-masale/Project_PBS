import React from 'react';
import CartBox from './Components/CartAdd/CartBox.jsx';
import NavBar from "./Components/NavBar/NavBar.jsx";
import Home from './Components/Home/Home.jsx';
import Footer from './Components/Footer/Footer.jsx';
import FingerRings from "./Components/Ringpage/FingerRing"
import Earrings from './Components/Earrings/Earrings.jsx';
import PenDants from './Components/Pendants/PenDants.jsx';
import MangalSutra from './Components/Mangalsutra/MangalSutra.jsx';
import BanGles from './Components/Bangles/BanGles.jsx';
import Chains from './Components/Chains/Chains.jsx';
import Diamond from './Components/DiamondDetails/Diamond.jsx';
import CartDeatils from './Components/CartAdd/CartDeatils.jsx';
import ItemsInfo from './Components/ItemsInfo/ItemsInfo.jsx';
import StoreDetails from './Components/StoreDetails/StoreDetails.jsx';
import UserAcc from './Components/Account/UserAcc.jsx';
import AdminAcc from './Components/Account/AdminAcc.jsx';
import WishList from './Components/WishList/WishList.jsx';
import { createBrowserRouter, Routes, Route,RouterProvider } from "react-router-dom";

function App() {
  // fetch("https://api.github.com/users/sagar-masale")
  // .then(Response => Response.json())
  // .then(data=>{
  //   alert(data.name);
  // })
  const router=createBrowserRouter([
    {
    path: "/",
    element: 
    <>
    <NavBar/>
    
    <Home 
    CatTitle1="Finger Rings" 
    CatTitle2="Earrings" 
    CatTitle3="Pendants" 
    CatTitle4="Mangalsutra" 
    CatTitle5="Bangles" 
    CatTitle6="Chains"
    />
    <Footer/>
    </>
    },
    
    {
      path: "/Ring-Page",
      element: 
      <>
      <NavBar/>
      <ItemsInfo 
      title="Rings"
      />
      <CartBox/>
      <FingerRings/>
      <Footer/>
      </>
    },
    {
      path: "/Earrings-Page",
      element: 
      <>
      <NavBar/>
      <ItemsInfo 
      title="Earrings"
      />
      <CartBox/>
      <Earrings/>
      <Footer/>
      </>
    },
    {
      path: "/Pendants-Page",
      element: 
      <>
      <NavBar/>
      <ItemsInfo 
      title="Pendants"
      />
      <CartBox/>
      <PenDants/>
      <Footer/>
      </>
    },
    {
      path: "/Mangalsutra-Page",
      element: 
      <>
      <NavBar/>
      <ItemsInfo 
      title="Mangalsutra"
      />
      <CartBox/>
      <MangalSutra/>
      <Footer/>
      </>
    },
    {
      path: "/Bangles-Page",
      element: 
      <>
      <NavBar/>
      <ItemsInfo 
      title="Bangles"
      />
      <CartBox/>
      <BanGles/>
      <Footer/>
      </>
    },
    {
      path: "/Chains-Page",
      element: 
      <>
      <NavBar/>
      <ItemsInfo 
      title="Chains"
      />
      <CartBox/>
      <Chains/>
      <Footer/>
      </>
    },
    {
      path:"/Store-Deatils",
      element:
      <>
      <NavBar/>
      <StoreDetails/>
      <Footer/>
      </>
    },
    {
      path:"/Diamond-Details",
      element:
      <>
      <NavBar/>
      <Diamond/>
      <Footer/>
      </>
    },
    {
      path:"/WishList-Deatils",
      element:
      <>
      <NavBar/>
      <WishList />
      <Footer/>
      </>
    },
    {
      path: "/Cart-Deatils",
      element: 
      <>
      <NavBar/>
      <CartDeatils/>
      <Footer/>
      </>
    },

    {
      path: "/UserAcc",
      element:
      <>
      <NavBar/>
      <UserAcc/>
      <Footer/>
      </>
    },
    {
      path: "/AdminAcc",
      element:
      <>
      <NavBar/>
      <AdminAcc/>
      <Footer/>
      </>
    }
  ])
  return (
    <>
    <RouterProvider router={router}/>
   
    </>
  )
}

export default App
