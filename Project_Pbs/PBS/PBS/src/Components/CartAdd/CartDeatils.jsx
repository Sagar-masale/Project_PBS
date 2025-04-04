import React, { useState, useContext } from 'react';
import CartContext from '../Context/CartContext';
import ProfileContext from '../Context/ProfileContext';
import AdminContext from '../Context/AdminContext';
import './CartDetails.css'
import CheckOutModel from './CheckoutProduct/CheckOutModel';
import { Link } from 'react-router-dom';
import ClearCartConfirm from './ClearCartConfirm';
import OrderSummary from '../OrderDetails/OrderSummary';


function CartDeatils() {
  const { cart, incrementQuantity, decrementQuantity, removeFromCart } = useContext(CartContext);
  const { calculateCartSummary } = useContext(CartContext);
  const { discountedTotal } = calculateCartSummary();
  const {userData} = useContext(ProfileContext)
  const {adminData} = useContext(AdminContext)
  const [isClearCartVisible, setisClearCartVisible] = useState(false);
  
   
  const [openCheckout, setOpenCheckout] = useState(false);
  const handleClearCart = () => {
    setisClearCartVisible(false);  // Hide confirmation modal
    
    
  };
  const toggleClass = (selector, className) => {
    document.querySelector(selector).classList.toggle(className);
  };
  const CloseLoginBox = () => {
    toggleClass('.LoginOtpBox', 'LoginOtpBoxShow');
  };

  
  return (
    <>
    {openCheckout && (
    <div className="Checkout-Box w-full h-full fixed inset-0 bg-black bg-opacity-50 z-[99999999] flex items-center  justify-center p-4">
    <CheckOutModel 
    ProductTotalAmt={ discountedTotal } 
    closeCheckout={() =>setOpenCheckout(false)}
    />
    </div>
    )}
  
   
 <div className="cart-container">
  
  {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        {/* Bag Icon */}
        <div className="empty-cart-img-box flex items-center justify-center  rounded-full mb-4">
          <img src="./Cart/empty-cart.png" alt="empty-cart" className='empty-cart-img ' />
        </div>
  
        {/* Message */}
        <h1 className="text-3xl font-semibold  mb-6" style={{color:"#4f3267"}}>YOUR CART IS EMPTY</h1>
  
        {/* Buttons */}
        <div className="flex space-x-4 w-full  justify-center">
          <Link to="/"  className="px-6 py-2 cartButtons flex justify-center  border-1 border-purple-900  rounded-md  transition-shadow">
          <button>
            Continue Shopping
          </button>
          </Link>
          {!userData && !adminData ? (
          <button
            onClick={CloseLoginBox}
            className="px-6 py-2 cartButtons-Login login-cart-button border-none text-white rounded-md transition-shadow"
          >
            Login To View Your Cart
          </button>
        ) : null}


        </div>
      </div>
  ) : (
    <div className='Cart-Main-Container'>
         <div className=" cart-md-container bg-white-100  ">

<div className="cart-md-container-items px-4 sm:px-6 lg:px-8">
  <div className="flex ">
    <h1 className="text-2xl mt-0 font-semibold Your-Cart ">Your Cart</h1>
    <button onClick={ () => setisClearCartVisible(true) } className="clearCartAll rounded-lg mt-0 ml-auto  font-semibold text-white">Clear All</button>
  </div>
  {isClearCartVisible && (
  <ClearCartConfirm
    onConfirm={handleClearCart}
    onCancel={() => setisClearCartVisible(false)}
  />
)}
   
  <div className="mx-auto mt-8 max-w-26 md:mt-12">
    <div className="">
      <div className="px-4 py-6 sm:px-8 sm:py-10 ">
        <div className="flow-root ">
<ul className="-my-20 ul-cartDatas">
  {cart.map(item => (
     <li key={item._id} className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0 cart-Item-Box">
     <div className="shrink-0 cart-Image-Box">
       <img
         className="cart-Image  rounded-lg object-cover"
         src={item.ProductImages[0]} alt={item.ProductName}
       />
     </div>

     <div className="relative flex flex-1  flex-col justify-between">
       <div className="sm:col-gap-5 sm:grid ml-10 sm:grid-cols-2">
         <div className="pr-8 sm:pr-5">
           <p className="text-xl font-semibold" style={{color:"#4f3267"}}>{item.ProductName}</p>
           <p className="mx-0 mt-1 mb-0 text-sm text-gray-500">Weight : 3.473 g</p>
           <p className="cart-Price text-2xl text-black mt-2">₹ {item.ProductPrice}</p>
          
            <span className="remove-WishList-Box flex mt-2">
            <span className="removeBlock flex cursor-pointer"  onClick={() => removeFromCart(item._id)}>
            <span class="material-symbols-outlined" style={{color:"#4f3267"}}>delete</span>
            <p className="cart-Price text-sm text-black ml-1"> Remove</p>  
            </span> 

            <span className="remove-wishlist-middle ml-3 text-xl font-light">|</span>

            <span className="add-WishList-Block flex cursor-pointer">
            <span class="material-symbols-outlined ml-2" style={{color:"#4f3267"}}>favorite</span>
            <p className="cart-Price text-sm text-black ml-1"> Move to Wishlist</p> 

            </span>
            </span>
         </div>

         <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
          

           <div className="sm:order-1">
             <div className="mx-auto flex h-8 items-stretch text-gray-600">
               <button onClick={() => decrementQuantity(item._id)} className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition  hover:text-white incrementCart-DecCart">-</button>
               <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">{item.quantity}</div>
               <button onClick={() => incrementQuantity(item._id)}  className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition  hover:text-white incrementCart-DecCart">+</button>
             </div>
           </div>
         </div>
       </div>
     </div>
   </li>
  ))}
 </ul>
 </div>



     

        </div>
        <button className='p-3 rounded-lg text-white mt-12 checkOutBtn'
        onClick={() => setOpenCheckout(true)}
        >
          CheckOut
        </button>
    </div>
  </div>
</div>
</div>
  <OrderSummary/>
 
    </div>
    
  )}
</div>


    </>
  )
}

export default CartDeatils
