import React, {useContext, useEffect, useState} from 'react'
import CartContext from '../Context/CartContext';
import './ItemDetails.css'
import { useNavigate } from 'react-router-dom';

function ItemDetails() {
    const rating = 3;
    const { productItems, addToCart  } = useContext(CartContext);
    const navigate = useNavigate();
    useEffect(() => {
        // Check if productItems is available
        if (!productItems) {
            // If not, navigate to the home page
            navigate('/');
        }
    }, [productItems, navigate]);
 

    
  return (
    <>
     <div className="ItemDetails-Container  rounded-lg shadow-lg">
      {/* Product Content */}
      <div className="gap-8 Left-Side-Product-Details">
        {/* Left Side: Product Image */}
        <div className="flex flex-col items-center">
          <img
            src={productItems.img} // Replace with actual image URL
            alt="ProductImage"
            className="ProductMain-Image rounded-lg mb-4"
          />
          {/* Thumbnail images */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-2 mt-4">
              {productItems.moreImages?.map((thumb, index) => (
                <div
                  key={index}
                  className="ProductMore-Images border hover:border-blue-500 cursor-pointer"
                >
                  <img
                    src={thumb} // Replace with actual thumbnail URLs
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right Side: Product Details */}
        <div className='Right-Side-Product-Details'>
          
          <div className="p-6 max-w-lg mx-auto Right-Side-Product-Details-Box rounded-lg">
      
       {/* Rating */}
       <span className="text-sm text-green-600 font-semibold">In stock</span>
       <div className="flex items-center mt-2 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
                <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                fill={i < rating ? "currentColor" : "none"}
                stroke="currentColor"
                className={`w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
                viewBox="0 0 20 20"
                >
                <path d="M10 15l-5.5 3 1.5-6.5L1 7l6.5-.5L10 1l2.5 5.5L19 7l-5 4.5L15.5 18z" />
                </svg>
            ))}
            </div>
            <span className="ml-2 text-gray-500 text-sm">345 Reviews</span>
          </div>

      {/* Price */}
      <div className="mb-2">
        <h2 className="ProductPrice  text-2xl font-bold">
        ₹{productItems.price} {" "}
          <span className="line-through text-gray-500 text-lg"> {productItems.price + 3000} </span>
          {/* <span className="text-red-600 text-lg font-semibold">(20% off)</span> */}
        </h2>
        <p className="text-gray-500 text-sm">(MRP Inclusive of all taxes)</p>
      </div>

      {/* Title */}
      <h1 className="Product-Title text-lg font-semibold mb-2">
      {productItems.title}
      </h1>

      {/* Offer Banner */}
      <div className="Product-Offer-Box p-2 rounded-lg text-sm mb-4">
        Flat 10% off on making charges
      </div>

      {/* Product Details */}
      <div className="flex gap-2 text-center text-sm mb-4">
        <div className="Product-Weight border rounded-lg p-2 flex gap-1">
          <p className="">Weight</p>
          <p className="font-semibold">13 (52.8 mm)</p>
        </div>
     
        <div className="Product-Weight Product-Customise text-center rounded-lg p-2 cursor-pointer">
          <p className="text-white font-semibold">CUSTOMISE</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4">
      <div className="button-AddToCart" data-tooltip={"₹"+productItems.price}>
  <div onClick={() => addToCart(productItems)} className="button-wrapper-AddTo-Cart bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold py-2 px-4 rounded-lg flex items-center">
    
    <div className="text-AddCart-Feild flex flex-row gap-2">   
        <span className="material-symbols-outlined">
            shopping_cart
        </span>
        ADD TO CART
    </div>
    <span className="icon-AddTo-Cart">
    <span className="material-symbols-outlined">
            shopping_cart
        </span>
    </span>
  </div>
</div>

     
      </div>
    </div>

        </div>
      </div>
    
    </>
  )
}

export default ItemDetails
