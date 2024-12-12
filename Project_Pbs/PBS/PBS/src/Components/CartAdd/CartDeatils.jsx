import React, { useState, useContext } from 'react';
import CartContext from '../Context/CartContext';
import './CartDetails.css'


import ClearCartConfirm from './ClearCartConfirm';
import OrderSummary from '../OrderDetails/OrderSummary';


function CartDeatils() {
  const { cart, incrementQuantity, decrementQuantity, removeFromCart } = useContext(CartContext);

 
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const [isClearCartVisible, setisClearCartVisible] = useState(false);
   
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
          <button className="px-6 py-2 cartButtons  border-1 border-purple-900  rounded-md  transition-shadow">
            Continue Shopping
          </button>
          <button
           onClick={CloseLoginBox}
           className="px-6 py-2 cartButtons-Login login-cart-button  border-none text-white rounded-md  transition-shadow">
            Login To View Your Cart
          </button>
        </div>
      </div>
  ) : (
    <div className='Cart-Main-Container'>
         <div className=" cart-md-container bg-white-100  ">

<div className="cart-md-container-items px-4 sm:px-6 lg:px-8">
  <div className="flex ">
    <h1 className="text-2xl mt-0 font-semibold text-red-900">Your Cart</h1>
    <button onClick={ () => setisClearCartVisible(true) } className="clearCartAll rounded-lg hover:bg-red-800 mt-0 ml-auto bg-red-900 font-semibold text-white">Clear All</button>
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
<ul className="-my-8">
  {cart.map(item => (
     <li key={item.id} className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0 cart-Item-Box">
     <div className="shrink-0 cart-Image-Box">
       <img
         className="cart-Image  rounded-lg object-cover"
         src={item.img} alt={item.title}
       />
     </div>

     <div className="relative flex flex-1  flex-col justify-between">
       <div className="sm:col-gap-5 sm:grid ml-10 sm:grid-cols-2">
         <div className="pr-8 sm:pr-5">
           <p className="text-xl font-semibold text-red-900">{item.title}</p>
           <p className="mx-0 mt-1 mb-0 text-sm text-gray-500">Weight : 3.473 g</p>
           <p className="cart-Price text-2xl text-black mt-2">₹ {item.price}</p>
            <span className="remove-WishList-Box flex mt-2">
            <span className="removeBlock flex cursor-pointer"  onClick={() => removeFromCart(item.id)}>
            <span class="material-symbols-outlined text-red-900">delete</span>
            <p className="cart-Price text-sm text-black ml-1"> Remove</p>  
            </span> 

            <span className="remove-wishlist-middle ml-3 text-xl font-light">|</span>

            <span className="add-WishList-Block flex cursor-pointer">
            <span class="material-symbols-outlined ml-2 text-red-900">favorite</span>
            <p className="cart-Price text-sm text-black ml-1"> Move to Wishlist</p> 

            </span>
            </span>
         </div>

         <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
          

           <div className="sm:order-1">
             <div className="mx-auto flex h-8 items-stretch text-gray-600">
               <button onClick={() => decrementQuantity(item.id)} className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-red-800 hover:text-white">-</button>
               <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">{item.quantity}</div>
               <button onClick={() => incrementQuantity(item.id)}  className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-red-800 hover:text-white">+</button>
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
    </div>
  </div>
</div>
</div>
  <OrderSummary 
  subTotal={totalPrice}
  />
    </div>
  )}
</div>

    </>
  )
}

export default CartDeatils
