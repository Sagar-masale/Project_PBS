import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import CartBox from './Components/CartAdd/CartBox.jsx';
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
import UserAcc from './Components/Account/User/UserAcc.jsx'
// Admin
import AdminAcc from './Components/Account/Admin/AdminAcc.jsx';
import AllUsers from './Components/Account/Admin/AdminSlideBarComponent/AllUsers.jsx';
import WishList from './Components/WishList/WishList.jsx';
import CheckOut from './Components/CheckOut/CheckOut.jsx';
import OrderSummary from './Components/OrderDetails/OrderSummary.jsx';
import ItemDetails from './Components/ItemDetails/ItemDetails.jsx';
import AddProduct from './Components/Account/Admin/AdminSlideBarComponent/AddProduct.jsx';
import EditUser from './Components/Account/User/EditUser.jsx';
import EmailAuth from './Components/AuthontiCations/EmailAuth.jsx';


const App = () => {
  return (
    <>
      <Routes>  {/* Define routes here */}
        <Route path="/" element={  
        <Home 
        CatTitle1="Rings Collection" 
        CatTitle2="Luxury Earrings" 
        CatTitle3="Pendants Collection" 
        CatTitle4="Mangalsutra Designs" 
        CatTitle5="Stylish Bangles" 
        CatTitle6="Classic Chains"
        />} />
        <Route path="/Ring-Page" element={<><ItemsInfo title="Rings" /><CartBox /><EmailAuth /></>} />
        <Route path="/Earrings-Page" element={<><ItemsInfo title="Earrings" /><CartBox /><Earrings /></>} />
        <Route path="/Pendants-Page" element={<><ItemsInfo title="Pendants" /><CartBox /><PenDants /></>} />
        <Route path="/Mangalsutra-Page" element={<><ItemsInfo title="Mangalsutra" /><CartBox /><MangalSutra /></>} />
        <Route path="/Bangles-Page" element={<><ItemsInfo title="Bangles" /><CartBox /><BanGles /></>} />
        <Route path="/Chains-Page" element={<><ItemsInfo title="Chains" /><CartBox /><Chains /></>} />
        <Route path="/Store-Deatils" element={<StoreDetails />} />
        <Route path="/Diamond-Details" element={<Diamond />} />
        <Route path="/WishList-Deatils" element={<WishList />} />
        <Route path="/Cart-Deatils" element={<CartDeatils />} />
        <Route path="/UserAcc" element={<UserAcc />} />
        <Route path="/AdminAcc" element={<AdminAcc />} />
        <Route path="/CheckOut" element={<CheckOut />} />
        <Route path="/OrderSummary" element={<OrderSummary />} />
        <Route path="/ItemDetails" element={<ItemDetails/>} />
        <Route path="/AllUsers" element={<AllUsers/>}/>
        <Route path="/Add-Products" element={<AddProduct/>}/>
      </Routes>
      
    </>
  );
};

export default App;
