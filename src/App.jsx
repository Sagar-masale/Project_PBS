import React,{useState} from 'react';
import IntroAnimation from './Components/IntroAnimation.jsx';
import ScrollToTop from './Components/ScrollToTop.jsx';
import { Routes, Route, useLocation } from 'react-router-dom';
import CartBox from './Components/CartAdd/CartBox.jsx';
import Home from './Components/Home/Home.jsx';
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
import Pricing_Setting from './Components/Account/Admin/AdminSlideBarComponent/Pricing_Setting.jsx';
import WishList from './Components/WishList/WishList.jsx';
import CheckOut from './Components/CheckOut/CheckOut.jsx';
import OrderSummary from './Components/OrderDetails/OrderSummary.jsx';
import ItemDetails from './Components/ItemDetails/ItemDetails.jsx';
import AddProduct from './Components/Account/Admin/AdminSlideBarComponent/AddProduct.jsx';
import OrderDetail from './Components/OrderDetails/OrderDetail.jsx';
import OrderBill from './Components/OrderDetails/OrderBill.jsx';
import About from './Components/About_PBS/About.jsx';
import { Toaster } from 'react-hot-toast';
import LoginUsingPass from './Components/Login/LoginUsingPass.jsx';
import SignUpUser from './Components/Login/SignUpUser.jsx';
import AdminLogin from './Components/Login/AdminLogin.jsx';
import TermsAndConditions from './Components/Supports/TermsAndConditions.jsx';
import Pricing from './Components/Pricing/Pricing.jsx';
import Privacy_Policy from './Components/Supports/Privacy_Policy.jsx';
import Customer_Support from './Components/Supports/Customer_Support.jsx';


const App = () => {
  const location = useLocation();
  const [showSignup, setShowSignup] = useState(false);

  // Check if current path is "/login"
  const isAuthPage = location.pathname === '/login';
  return (
    <>
    <IntroAnimation />
    <Toaster position="top-left" />
        <ScrollToTop/>
         {isAuthPage ? (
        showSignup ? (
          <SignUpUser onSwitchToLogin={() => setShowSignup(false)} />
        ) : (
          <LoginUsingPass onSwitchToSignup={() => setShowSignup(true)} />
        )
      ):(
      <Routes> 
        <Route path="/" element={  
        <Home 
        CatTitle1="Rings Collection" 
        CatTitle2="Luxury Earrings" 
        CatTitle3="Pendants Collection" 
        CatTitle4="Mangalsutra Designs" 
        CatTitle5="Stylish Bangles" 
        CatTitle6="Classic Chains"
        />} />
        <Route path="/login_admin" element={<><AdminLogin /></>} />
        <Route path="/Pricing_Setting" element={<><Pricing_Setting /></>} />
        <Route path="/pricing" element={<><Pricing /></>} />
        <Route path="/support" element={<><Customer_Support /></>} />
        <Route path="/privacy" element={<><Privacy_Policy /></>} />
        <Route path="/terms_conditions" element={<><TermsAndConditions /></>} />
        <Route path="/Ring-Page" element={<><ItemsInfo title="Rings" /><CartBox /><FingerRings /></>} />
        <Route path="/About" element={<><About/></>} />
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
        <Route path="/ItemDetails/:id" element={<ItemDetails />} />
        <Route path="/AllUsers" element={<AllUsers/>}/>
        <Route path="/Add-Products" element={<AddProduct/>}/>
        <Route path="/Order-Details" element={<OrderDetail/>}/>
        <Route path="/Bill-Details" element={<OrderBill/>}/>
      </Routes>
        )
        }
      
    </>
  );
};

export default App;
