import React from 'react'
import { useContext } from 'react';
import CartContext from '../Context/CartContext';

function ClearCartConfirm({ onConfirm, onCancel }) {
    const { clearCart } = useContext(CartContext);
    function onConfirm() {
        clearCart()
    }
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white  rounded-lg shadow-lg p-6 w-auto text-center">
        <h2 className="text-xl font-bold mb-4">Clear Cart</h2>
        <p className="mb-6">Are you sure you want to clear all cart items?</p>
        <div className="flex justify-around">
          <button
            onClick={onConfirm}
            className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-800 transition"
          >
            Yes, Clear Cart
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default ClearCartConfirm
