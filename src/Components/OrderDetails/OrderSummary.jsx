import React from 'react'
import './OrderSummary.css'
import { useContext, useState } from 'react';
import CartContext from '../Context/CartContext';
import toast from 'react-hot-toast';
import MetalContext from '../Context/MetalRateContext';
function OrderSummary() {
  const { calculateCartSummary } = useContext(CartContext);
  const { totalPrice, totalDiscount, discountedTotal } = calculateCartSummary();
  const { ProductCouponCode, generateDeliveryCode } = useContext(MetalContext);

  const [couponCode, setCouponCode] = useState('');
  const [extraDiscount, setExtraDiscount] = useState(0);
  const [couponAppliedMsg, setCouponAppliedMsg] = useState('');
  const [deliveryCode, setDeliveryCode] = useState("Not Applicable");

const handleApplyCoupon = () => {
  if (couponCode.trim().toLowerCase() === 'welcomepbs') {
    // Just generate code for delivery verification
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setDeliveryCode(randomCode);
    ProductCouponCode(randomCode)
    // Show success toast and message
    toast.success("Coupon accepted! Will be used on making charges at final billing.",{ duration: 4000 });
    setCouponAppliedMsg(
      "✅ Coupon applied! This discount will be applied on making charges when you collect the product from our store. " +
      "Please remember your delivery verification code below — it will be required at the time of pickup."
    );


  } else {
    setDeliveryCode(null);
    setCouponAppliedMsg("❌ Invalid coupon code.");
    toast.error("Invalid coupon code",{ duration: 2000 });
  }
};

    const deliveryCharge = 0; // FREE
  return (
    <>
    {couponAppliedMsg && (
  <p className="text-sm mt-2 text-green-700">{couponAppliedMsg}</p>
)}

{deliveryCode && (
  <p className="text-sm text-purple-700 font-semibold mt-1">
    Your Coupon Code: <span className="font-bold">{deliveryCode}</span>
  </p>
)}

     <div className="p-10 relative OrderSummary-MainContainer rounded-md ">
      <div className="">
        <h2 className="text-xl font-bold text-gray-800">Enter Code</h2>
        <div className="flex mt-4 gap-2">
          <input
            type="text"
            placeholder="Enter Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="Coupon-Text flex-grow  rounded-l-md rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-800"
          />
          <button 
          onClick={handleApplyCoupon}
          className="coupon-Apply-Button text-white px-4 py-2 rounded-md ">
            Apply
          </button>
        </div>
     
      </div>

      <div className="border-t pt-4">
        <h2 className="text-lg font-semibold text-gray-700">Order Summary</h2>
        <div className="flex justify-between mt-4">
          <span className="text-gray-600">Sub Total</span>
          <span className="text-gray-800 font-medium">₹ {totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-gray-600">Discount</span>
          <span className="discount font-medium">- ₹ {(totalDiscount).toFixed(2)}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-gray-600">Delivery Charge</span>
          <span className="text-green-800 font-medium">
            {deliveryCharge === 0 ? "FREE" : `₹ ${deliveryCharge}`}
          </span>
        </div>
        <div className="flex justify-between mt-4 border-t pt-4">
          <span className="text-lg font-semibold">TOTAL (Incl. of all Taxes.)</span>
          <span className="text-lg font-bold text-gray-900">₹ {(discountedTotal).toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t mt-4 pt-4">
        <div className="flex justify-between">
          <span className="text-green-800 font-bold text-lg">YOU SAVE</span>
          <span className="text-green-800 font-bold text-lg">
            + ₹ {(totalDiscount + extraDiscount).toFixed(2)}
          </span>

        </div>
      </div>
    </div>
    </>
  )
}

export default OrderSummary
