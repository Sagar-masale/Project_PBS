import React, { useState, useEffect, useContext } from 'react';
import CartContext from '../Context/CartContext';

function CartBox({ closeCart }) { // Receive closeCart function as a prop
  const { addToCart, cartItems } = useContext(CartContext);
  const [hover, setHover] = useState(false);

  // Initialize current image with the first image in ProductImages or an empty string
  const [currentImage, setCurrentImage] = useState(cartItems?.ProductImages?.[0] || '');

  // Update current image whenever cartItems changes
  useEffect(() => {
    if (cartItems?.ProductImages) {
      setCurrentImage(cartItems.ProductImages[0]); // Set the first image as default
    }
  }, [cartItems]);

  const ExitCartButton = () => {
    document.querySelector('.CartBox').classList.toggle('CartBox-Show');
  };

  return (
    <div className="CartBox">
      <div className="relative z-10" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center px-2 lg:px-4">
            <div className="flex w-full transform text-left transition md:my-8 md:max-w-2xl lg:max-w-4xl">
              <div className="relative flex w-full items-center bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 lg:p-8">
                <button
                  type="button"
                  onClick={ExitCartButton}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="grid w-full grid-cols-1 items-start gap-8 sm:grid-cols-12 lg:gap-8">
                  {/* Main image display */}
                  <div className="aspect-h-3 aspect-w-2 sm:col-span-4 lg:col-span-5">
                    <img
                      src={currentImage} // Use currentImage
                      alt={cartItems.ProductName}
                      className="object-cover object-center rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="sm:col-span-8 lg:col-span-7">
                    <h2 className="text-2xl font-bold text-gray-900">{cartItems.ProductName}</h2>

                    <section className="mt-2">
                      <p className="text-2xl text-gray-900">₹ {cartItems.ProductPrice}</p>
                    </section>

                    {/* Thumbnail image selection */}
                    <section className="mt-10">
                      <legend className="text-sm font-medium text-gray-900">Images</legend>
                      <div className="mt-4 flex items-center space-x-3">
                        {cartItems.ProductImages?.map((imgSrc, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImage(imgSrc)} // Update current image
                            className={`rounded-full border-2 p-1 ${
                              currentImage === imgSrc ? 'border-[#4f3267]' : 'border-gray-300'
                            } hover:border-[#4f3267]`}
                          >
                            <img
                              src={imgSrc}
                              alt={`Variation ${index + 1}`}
                              className="h-16 w-16 object-cover rounded-full"
                            />
                          </button>
                        ))}
                      </div>
                    </section>

                    <section className="mt-10">
                      <div className="text-sm font-bold text-gray-900">Description</div>
                      <p className="mt-4">{cartItems.ProductDescription}</p>
                    </section>

                    <button
                      onClick={() => addToCart(cartItems)}
                      type="submit"
                      className=" mt-6 w-full rounded-md px-8 py-3 text-base font-medium text-white focus:outline-none Add-to-cart-Button"
                      style={{
                        backgroundColor: hover ? '#6c478b' : '#4f3267',
                        transition: 'background-color 0.3s ease',
                      }}
                      onMouseEnter={() => setHover(true)}
                      onMouseLeave={() => setHover(false)}
                    >
                      Add Item
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartBox;
