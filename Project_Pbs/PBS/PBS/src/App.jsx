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
import UserAcc from './Components/Account/UserAcc.jsx';
import AdminAcc from './Components/Account/AdminAcc.jsx';
import WishList from './Components/WishList/WishList.jsx';
import CheckOut from './Components/CheckOut/CheckOut.jsx';
import OrderSummary from './Components/OrderDetails/OrderSummary.jsx';

const App = () => {
  return (
    <>
      <Routes>  {/* Define routes here */}
        <Route path="/" element={  
        <Home 
        CatTitle1="Finger Rings" 
        CatTitle2="Earrings" 
        CatTitle3="Pendants" 
        CatTitle4="Mangalsutra" 
        CatTitle5="Bangles" 
        CatTitle6="Chains"
        />} />
        <Route path="/Ring-Page" element={<><ItemsInfo title="Rings" /><CartBox /><FingerRings /></>} />
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
      </Routes>
      
    </>
  );
};

export default App;
