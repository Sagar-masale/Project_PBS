import React, { useState, useContext } from 'react';
import CartContext from '../Context/CartContext';
import './CartDetails.css'
import ClearCartConfirm from './ClearCartConfirm';


function CartDeatils() {
  const { cart, incrementQuantity, decrementQuantity, removeFromCart } = useContext(CartContext);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const [isClearCartVisible, setisClearCartVisible] = useState(false);
   
  const handleClearCart = () => {
    setisClearCartVisible(false);  // Hide confirmation modal
  };
  

  
  return (
    <>
   
 <div className="cart-container">
  {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        {/* Bag Icon */}
        <div className="empty-cart-img-box flex items-center justify-center bg-red-100 rounded-full mb-4">
          <img src="./Cart/empty-cart.png" alt="empty cart" className='empty-cart-img bg-red-500' />
        </div>
  
        {/* Message */}
        <h1 className="text-3xl font-semibold text-red-900 mb-6">YOUR CART IS EMPTY</h1>
  
        {/* Buttons */}
        <div className="flex space-x-4 w-full  justify-center">
          <button className="px-6 py-2 cartButtons  border-1 border-red-900 text-red-900 rounded-md hover:red-gray-50 transition-shadow">
            Continue Shopping
          </button>
          <button className="px-6 py-2 cartButtons login-cart-button bg-red-900 border-none text-white rounded-md  transition-shadow">
            Login To View Your Cart
          </button>
        </div>
      </div>
  ) : (
    
    <div className=" cart-md-container bg-white-100  ">

      <div className="mx-auto  px-4 sm:px-6 lg:px-8">
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
          <div className="bg-white shadow">
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
      <ul className="-my-8">
        {cart.map(item => (
           <li key={item.id} className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
           <div className="shrink-0">
             <img
               className="h-24 w-24 max-w-full rounded-lg object-cover"
               src={item.img} alt={item.title}
             />
           </div>

           <div className="relative flex flex-1 flex-col justify-between">
             <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
               <div className="pr-8 sm:pr-5">
                 <p className="text-base font-semibold text-gray-900">{item.title}</p>
                 {/* <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">36EU - 4US</p> */}
               </div>

               <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                 <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">{item.price}</p>

                 <div className="sm:order-1">
                   <div className="mx-auto flex h-8 items-stretch text-gray-600">
                     <button onClick={() => decrementQuantity(item.id)} className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-red-800 hover:text-white">-</button>
                     <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">{item.quantity}</div>
                     <button onClick={() => incrementQuantity(item.id)}  className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-red-800 hover:text-white">+</button>
                   </div>
                 </div>
               </div>
             </div>

             <div className="absolute  right-0 flex sm:bottom-0 sm:top-auto">
               <button onClick={() => removeFromCart(item.id)} type="button" className="flex rounded p-2 text-center text-black-900 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-800">
                 <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                 </svg>
               </button>
             </div>
           </div>
         </li>
        ))}
       </ul>
       </div>

       <div className="mt-6 border-t border-b py-2">
                {/* <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Subtotal</p>
                  <p className="text-lg font-semibold text-gray-900"> {totalPrice} </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Shipping</p>
                  <p className="text-lg font-semibold text-gray-900">0</p>
                </div> */}
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900"><span className="text-xs font-normal text-gray-400">IND</span> {totalPrice} </p>
              </div>
    
              <div className="mt-6 text-center">
                <button type="button" className="  group inline-flex w-full items-center justify-center rounded-md bg-red-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-red-800 checkOutBtn">
                  Checkout
                  <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>

              </div>
          </div>
        </div>
      </div>
    </div>
  )}
</div>

    </>
  )
}

export default CartDeatils
