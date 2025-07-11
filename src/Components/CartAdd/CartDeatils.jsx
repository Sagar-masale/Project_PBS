import React, { useState, useContext } from 'react';
import CartContext from '../Context/CartContext';
import ProfileContext from '../Context/ProfileContext';
import AdminContext from '../Context/AdminContext';
import './CartDetails.css'
import {IndianRupee} from "lucide-react";
import CheckOutModel from './CheckoutProduct/CheckOutModel';
import { Link } from 'react-router-dom';
import ClearCartConfirm from './ClearCartConfirm';
import OrderSummary from '../OrderDetails/OrderSummary';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import MetalContext from '../Context/MetalRateContext';
function CartDeatils() {
  const { cart, incrementQuantity, decrementQuantity, removeFromCart } = useContext(CartContext);
  const { calculateCartSummary } = useContext(CartContext);
  const { discountedTotal } = calculateCartSummary();
  const {userData} = useContext(ProfileContext)
  const {adminData} = useContext(AdminContext)
  const [isClearCartVisible, setisClearCartVisible] = useState(false);
  const { metalRates, calculateFinalPrice } = useContext(MetalContext);
   
  const [openCheckout, setOpenCheckout] = useState(false);
  const handleClearCart = () => {
    setisClearCartVisible(false);  // Hide confirmation modal
  };

  const navigate = useNavigate();
  function onLogin(){
    navigate('/login');
  }

  const addToWishlist = (item) => {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const alreadyAdded = wishlist.find(w => w._id === item._id);
  if (!alreadyAdded) {
    const expiry = Date.now() + 15 * 24 * 60 * 60 * 1000; // 15 days in ms
    wishlist.push({ ...item, expiry });
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    toast.success("Added to wishlist. It will expire after 15 days.",{ duration: 2000 });
  } else {
    toast("Item is already in wishlist.",{ duration: 2000 });
  }
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
  
   
 <div className="cart-container   ">
  
  {cart.length === 0 ? (
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 text-center">
  {/* Bag Icon */}
  <div className="empty-cart-img-box flex items-center justify-center rounded-full mb-4">
    <img
      src="./Cart/empty-cart.png"
      alt="empty-cart"
      className="w-28 h-28 sm:w-40 sm:h-40 object-contain"
      
    />
  </div>

  {/* Message */}
  <h1 className="text-xl sm:text-3xl font-semibold mb-6" style={{ color: '#4f3267' }}>
    YOUR CART IS EMPTY
  </h1>

  {/* Buttons */}
  <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
    <Link
      to="/"
      className="w-full sm:w-auto px-4 sm:px-6 py-2 cartButtons flex justify-center border border-purple-900 rounded-md transition-shadow"
    >
      <button className="font-sans text-sm sm:text-base">Continue Shopping</button>
    </Link>

    {!userData && !adminData ? (
      <button
       onClick={onLogin}
        className="w-full sm:w-auto px-4 sm:px-6 py-2 cartButtons-Login font-sans login-cart-button text-sm sm:text-base border-none text-white rounded-md transition-shadow"
      >
        Login To View Your Cart
      </button>
    ) : null}
  </div>
</div>

  ) : (
<div className="Cart-Main-Container flex flex-col lg:flex-row lg:h-screen px-4 sm:px-6 lg:px-10 py-4 gap-4">


  {/* LEFT - Cart Items */}
<div className="w-full lg:w-2/3 bg-white rounded-md shadow-sm p-4 sm:p-6 overflow-y-auto scroll-thin-purple">


    <div className="flex items-center mb-4 ">
      <h1 className="text-xl sm:text-2xl font-semibold text-[#4f3267]">Your Cart</h1>
      <button
        onClick={() => setisClearCartVisible(true)}
        className="ml-auto bg-[#4f3267] px-3 py-1 rounded-lg font-semibold text-white text-sm sm:text-base"
      >
        Clear All
      </button>
    </div>

    {isClearCartVisible && (
      <ClearCartConfirm
        onConfirm={handleClearCart}
        onCancel={() => setisClearCartVisible(false)}
      />
    )}

    <div className="mt-4">
      <ul className="space-y-6 ">
        {cart.map((item) => (
          <li
            key={item._id}
            className="flex flex-col sm:flex-row sm:items-start gap-4 border-b pb-4"
          >
            {/* Image */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 cursor-pointer">
              <img
                src={item.ProductImages[0]}
                alt={item.ProductName}
                className="w-full h-full object-cover rounded-lg"
                onClick={() => navigate(`/ItemDetails/${item._id}`)}
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <p className="text-lg font-semibold text-[#4f3267] cursor-pointer hover:underline" 
              onClick={() => navigate(`/ItemDetails/${item._id}`)}
              >{item.ProductName}</p>
              <p className="text-sm text-gray-500 mt-1">Weight: {item.selectedWeight}</p>
              <p className="text-sm text-gray-500 mt-1">Size: {item.selectedSize}</p>
              <p className="text-xl text-[#4f3267] mt-2 flex align-items-center"><IndianRupee width={16} color='black'/> {item.finalPrice || calculateFinalPrice(item)}</p>

              {/* Actions */}
              <div className="flex items-center mt-3 text-[#4f3267] text-sm space-x-4">
                <div className="flex items-center cursor-pointer" onClick={() => removeFromCart(item._id)}>
                  <span className="material-symbols-outlined">delete</span>
                  <span className="ml-1">Remove</span>
                </div>
                <span>|</span>
                <div className="flex items-center cursor-pointer" onClick={() => addToWishlist(item)}>
                  <span className="material-symbols-outlined ml-1">favorite</span>
                  <span className="ml-1">Move to Wishlist</span>
                </div>

              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center sm:flex-col justify-end sm:justify-start">
              <div className="flex items-center border rounded overflow-hidden text-sm">
                <button
                  onClick={() => decrementQuantity(item._id)}
                  className="bg-gray-200 px-3 py-1 hover:bg-[#4f3267] hover:text-white"
                >
                  -
                </button>
                <span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
                <button
                  onClick={() => incrementQuantity(item._id)}
                  className="bg-gray-200 px-3 py-1 hover:bg-[#4f3267] hover:text-white"
                >
                  +
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>

    {/* Checkout */}
    <div className="text-right mt-10">
      <button
        className="bg-[#4f3267] text-white px-6 py-2 rounded-md font-medium hover:opacity-90"
        onClick={() => setOpenCheckout(true)}
      >
        CheckOut
      </button>
    </div>
  </div>

  {/* RIGHT - Order Summary */}
  <div className="w-full lg:w-1/3">
    <div>
      <OrderSummary />
    </div>
  </div>
</div>

    
  )}
</div>


    </>
  )
}

export default CartDeatils
