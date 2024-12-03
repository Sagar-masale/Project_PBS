import React, { useState } from 'react';

function CartBox({ ring }) {  // Receive a specific ring object as a prop
  const [image, setImage] = useState(ring.img); // Default image

  const GetImg = (curImg) => {
    setImage(curImg);  // Update the displayed image
  };

  const ExitCartButton = () => {
    document.querySelector('.CartBox').classList.toggle('CartBox-Show');
  };
console.log(image);

  return (
    <div className="CartBox">
      <div className="relative z-10" role="dialog" aria-modal="true">
        <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" aria-hidden="true"></div>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <div className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
              <div className="relative flex w-full items-center bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                <button type="button" onClick={ExitCartButton} className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8">
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8 Cover">
                  <div className="Main-Img aspect-h-3 aspect-w-2 overflow-hidden rounded-lg sm:col-span-4 lg:col-span-5">
                    <img src={image} alt={ring.title} className="object-cover object-center rounded-lg"/>
                  </div>
                  <div className="sm:col-span-8 lg:col-span-7">
                    <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{ring.title}</h2>

                    <section aria-labelledby="information-heading" className="mt-2">
                      <p className="text-2xl text-gray-900">₹ {ring.price}</p>
                    </section>

                    <section aria-labelledby="options-heading" className="mt-10">
                      <fieldset aria-label="Choose a color">
                        <legend className="text-sm font-medium text-gray-900">Images</legend>
                        <div className="mt-4 flex items-center space-x-3">
                          {ring.moreImages.map((imgSrc, index) => (
                            <label key={index} aria-label={`Image ${index + 1}`} className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-400 focus:outline-none">
                              <input
                                type="radio"
                                name="image-choice"
                                value={`Image-${index}`}
                                className="sr-only"
                                onClick={() => GetImg(imgSrc)}  // Set current image
                              />
                              <span aria-hidden="true" className="h-20 w-20 rounded-full border border-black border-opacity-10 flex justify-center items-center Mimg">
                                <img src={imgSrc} alt={`Ring variation ${index + 1}`} className="w-full h-full object-cover rounded-full"/>
                              </span>
                            </label>
                          ))}
                        </div>
                      </fieldset>
                    </section>

                    <section className="mt-10">
                      <div className="text-sm font-bold text-gray-900">Description</div>
                      <p className="RingDes mt-4">{ring.dec}</p>
                    </section>

                    <button type="submit" className="mt-6 w-full rounded-md px-8 py-3 text-base font-medium text-white hover:bg-black-700 focus:outline-none" style={{ backgroundColor: "#832729" }}>
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
