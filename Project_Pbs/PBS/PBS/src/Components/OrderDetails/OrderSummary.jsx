import React from 'react'
import './OrderSummary.css'

function OrderSummary({subTotal = "0"}) {
    const discount = 0;
    const deliveryCharge = 0; // FREE
    const taxIncludedTotal = subTotal - discount + deliveryCharge;
    const youSave = discount;
  return (
    <>
     <div className="p-6 mr-28 relative OrderSummary-MainContainer rounded-md ">
      <div className="">
        <h2 className="text-xl font-bold text-gray-800">Enter Code</h2>
        <div className="flex mt-4 gap-2">
          <input
            type="text"
            placeholder="Enter Coupon Code"
            className="Coupon-Text flex-grow  rounded-l-md rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button className="bg-red-900 coupon-Apply-Button text-white px-4 py-2 rounded-md ">
            Apply
          </button>
        </div>
     
      </div>

      <div className="border-t pt-4">
        <h2 className="text-lg font-semibold text-gray-700">Order Summary</h2>
        <div className="flex justify-between mt-4">
          <span className="text-gray-600">Sub Total</span>
          <span className="text-gray-800 font-medium">₹ {subTotal}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-gray-600">Discount</span>
          <span className="text-red-600 font-medium">- ₹ {discount}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-gray-600">Delivery Charge</span>
          <span className="text-green-600 font-medium">
            {deliveryCharge === 0 ? "FREE" : `₹ ${deliveryCharge}`}
          </span>
        </div>
        <div className="flex justify-between mt-4 border-t pt-4">
          <span className="text-lg font-semibold">TOTAL (Incl. of all Taxes.)</span>
          <span className="text-lg font-bold text-gray-900">₹ {taxIncludedTotal}</span>
        </div>
      </div>

      <div className="border-t mt-4 pt-4">
        <div className="flex justify-between">
          <span className="text-green-600 font-bold text-lg">YOU SAVE</span>
          <span className="text-green-600 font-bold text-lg">+ ₹ {youSave}</span>
        </div>
      </div>
    </div>
    </>
  )
}

export default OrderSummary
