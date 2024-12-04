import React, { useState, useEffect, useContext } from 'react';
import CartContext from '../Context/CartContext';

function CartBox({ closeCart }) {  // Receive closeCart function as a prop
  const { cartItems } = useContext(CartContext);  // Access context

  const { addToCart } = useContext(CartContext);
  
  // Handle current image display, initialize with main image or default
  const [currentImage, setCurrentImage] = useState(cartItems?.img || '');

  // Update current image when cartItems change
  useEffect(() => {
    if (cartItems?.img) {
      setCurrentImage(cartItems.img);
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
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="grid w-full grid-cols-1 items-start gap-8 sm:grid-cols-12 lg:gap-8">
                  <div className="aspect-h-3 aspect-w-2 sm:col-span-4 lg:col-span-5">
                    <img
                      src={currentImage || cartItems.img}
                      alt={cartItems.title}
                      className="object-cover object-center rounded-lg"
                    />
                  </div>
                  <div className="sm:col-span-8 lg:col-span-7">
                    <h2 className="text-2xl font-bold text-gray-900">{cartItems.title}</h2>

                    <section className="mt-2">
                      <p className="text-2xl text-gray-900">₹ {cartItems.price}</p>
                    </section>

                    <section className="mt-10">
                      <legend className="text-sm font-medium text-gray-900">Images</legend>
                      <div className="mt-4 flex items-center space-x-3">
                        {cartItems.moreImages?.map((imgSrc, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImage(imgSrc)}  // Update current image
                            className="rounded-full border-2 border-gray-300 p-1 hover:border-gray-500"
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
                      <p className="mt-4">{cartItems.dec}</p>
                    </section>

                    <button
                      onClick={() => addToCart(cartItems)}
                    type="submit" className="mt-6 w-full rounded-md px-8 py-3 text-base font-medium text-white hover:bg-black-700 focus:outline-none" style={{ backgroundColor: "#832729" }}>
                      Add to Cart
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
