import React, { useContext } from 'react';
import CartContext from '../Context/CartContext';
import './CartDetails.css'

function CartDeatils() {
  const { cart, incrementQuantity, decrementQuantity, removeFromCart, clearCart } = useContext(CartContext);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
 <div className="cart-container">
  {cart.length === 0 ? (
    <p>Your cart is empty.</p>
  ) : (
    <div className="h-screen bg-gray-100 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
        </div>

        <div className="mx-auto mt-8 max-w-2xl md:mt-12">
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
                     <button onClick={() => decrementQuantity(item.id)} className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">-</button>
                     <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">{item.quantity}</div>
                     <button onClick={() => incrementQuantity(item.id)}  className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">+</button>
                   </div>
                 </div>
               </div>
             </div>

             <div className="absolute  right-0 flex sm:bottom-0 sm:top-auto">
               <button onClick={() => removeFromCart(item.id)} type="button" className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
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

       <div class="mt-6 border-t border-b py-2">
                <div class="flex items-center justify-between">
                  <p class="text-sm text-gray-400">Subtotal</p>
                  <p class="text-lg font-semibold text-gray-900"> {totalPrice} </p>
                </div>
                <div class="flex items-center justify-between">
                  <p class="text-sm text-gray-400">Shipping</p>
                  <p class="text-lg font-semibold text-gray-900">0</p>
                </div>
              </div>
              <div class="mt-6 flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">Total</p>
                <p class="text-2xl font-semibold text-gray-900"><span class="text-xs font-normal text-gray-400">IND</span> {totalPrice} </p>
              </div>
    
              <div class="mt-6 text-center">
                <button type="button" class="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                  Checkout
                  <svg xmlns="http://www.w3.org/2000/svg" class="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
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
