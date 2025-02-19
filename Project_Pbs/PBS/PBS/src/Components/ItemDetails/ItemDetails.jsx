import React, {useContext, useEffect, useState} from 'react'
import CartContext from '../Context/CartContext';
import './ItemDetails.css'
import { useNavigate } from 'react-router-dom';
import CustomerReviews from './CustomerReviews';

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

    const [currentImage, setCurrentImage] = useState(
      productItems?.ProductImages?.[0] || ""
    );

    useEffect(() => {
      // Check if productItems is available
      if (!productItems) {
        navigate("/"); // If not, navigate to the home page
      } else {
        setCurrentImage(productItems.ProductImages[0]); // Set initial main image
      }
    }, [productItems, navigate]);
    console.log("Product Items:", productItems);

    const reviewsData = [
      {
        id: 1,
        productId:2520,
        author: "Veeraj M",
        date: "May 16, 2021",
        reviewStar: 5,
        title: "Beautiful and Perfect!",
        content:
        "I bought this gold ring for a special day, and it is perfect! The design is beautiful, and it shines so nicely. It feels strong but is very comfortable to wear. Everyone keeps asking me where I got it. I love it!"
      },
      {
        id: 2,
        productId:2520,
        author: "Mayur P",
        date: "April 6, 2021",
        reviewStar: 5,
        title: "Elegant and Classic",
        content:
        "The gold ring looks very pretty and shiny. It fits well, but it feels a bit light, so I don’t wear it every day. It’s perfect for special occasions. For the price, it’s still a great buy!The gold ring looks very pretty and shiny. It fits well, but it feels a bit light, so I don’t wear it every day. It’s perfect for special occasions. For the price, it’s still a great buy! This gold ring looks simple but very elegant. It shines bright and feels like good quality. I bought it as a gift, and they loved it! The packaging was also very nice. I would definitely buy it again."  
      },
      {
        id: 3,
        productId:2520,
        author: "Prajwal P",
        date: "February 24, 2021",
        reviewStar: 4,
        title: "Good Ring, But Be Careful",
        content:
        "The gold ring looks very pretty and shiny. It fits well, but it feels a bit light, so I don’t wear it every day. It’s perfect for special occasions. For the price, it’s still a great buy!"   
      },
    ];
    
    
      // Function to render star ratings dynamically
      const renderStars = (count) => {
        return "★".repeat(count) + "☆".repeat(5 - count);
      };

      const [showReviewBox, setShowReviewBox] = useState(false);
    
  return (
    <>
    {showReviewBox && (
          <div className="Review-Section fixed w-full  flex row align-items-center justify-content-center  mt-[-5%] z-[9999999999]">
          <CustomerReviews 
          closeReviewBox={() => setShowReviewBox(false)}
          />
          </div>
    )}
     <div className="ItemDetails-Container  rounded-lg ">
      {/* Product Content */}
      <div className="gap-8 Left-Side-Product-Details">
        {/* Left Side: Product Image */}
        <div className="flex flex-col items-center">
          <img
            src={currentImage} // Replace with actual image URL
            alt="ProductImage"
            className="ProductMain-Image mb-4"
          />
          {/* Thumbnail images */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-2 mt-4">
              {productItems.ProductImages?.map((thumb, index) => (
                <div
                  key={index}
                  className="ProductMore-Images  hover:border-blue-500 cursor-pointer"
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
        ₹{productItems.ProductPrice} {" "}
          <span className="line-through text-gray-500 text-lg"> {productItems.ProductPrice + 3000} </span>
          {/* <span className="text-red-600 text-lg font-semibold">(20% off)</span> */}
        </h2>
        <p className="text-gray-500 text-sm">(MRP Inclusive of all taxes)</p>
      </div>

      {/* Title */}
      <h1 className="Product-Title text-lg font-semibold mb-2">
      {productItems.ProductName}
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
      <div className="button-AddToCart" data-tooltip={"₹"+productItems.ProductPrice}>
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

      <div className="reviews-container w-full">
        <div className="review-WriteReview flex flex-row ">
        <h2 className="reviews-title">Recent Reviews</h2>
        <button 
        className="Customer-Write-Review bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-700 hover:to-pink-500 text-white px-4 py-1 rounded-lg flex items-center"
        onClick={() => setShowReviewBox(true)}
        >
          WRITE A REVIEW
        </button>

        </div>


        
      {reviewsData.map((review) => (
        <div key={review.id} className="review">
          <div className="review-header">
           <div className="review-Auther-Time flex flex-col">
           <span className="review-author">{review.author}</span>
           <span className="review-date">{review.date}</span>
           </div>
            
          </div>
          <div className="review-stars flex">{renderStars(review.reviewStar)}</div>
          <div className="reviewTitle-txt">
          <h3 className="review-title">{review.title}</h3>
          <p className="review-content flex flex-col">{review.content}</p>
          </div>
        </div>
      ))}
    </div>
  
    
    </>
  )
}

export default ItemDetails
