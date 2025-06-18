import React, {useContext, useEffect, useState} from 'react'
import CartContext from '../Context/CartContext';
import AdminContext from "../Context/AdminContext";
import ProfileContext from '../Context/ProfileContext';
import ReviewContext from "../Context/ReviewContext"
import './ItemDetails.css'
import { useNavigate } from 'react-router-dom';
import CustomerReviews from './CustomerReviews';
import axios from 'axios';
import moreIcon from "../../../public/menu.png";
import toast, { Toaster } from 'react-hot-toast';
import EditProductDetails from './EditProductDetails';


function ItemDetails() {

  const [showEditPopUp, setShowEditPopUp] = useState(false);

    const {userData} = useContext(ProfileContext);
    const {adminData} = useContext(AdminContext);
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


    
      // Function to render star ratings dynamically
      const renderStars = (count) => {
        return "★".repeat(count) + "☆".repeat(5 - count);
      };

      const [showReviewBox, setShowReviewBox] = useState(false);


      const { reviews, setReviews } = useContext(ReviewContext);

      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
    
      const fetchReviews = async () => {
        if (!productItems?._id) return;
        try {
          const response = await axios.get(
            `https://backend-pbs-coo6.onrender.com/api/v1/reviews/get-reviewBy-productId?productId=${productItems._id}`
          );
          console.log("Fetched Reviews Data:", response.data.data);
          setReviews(response.data.data);
        } catch (err) {
          console.error("Error fetching reviews:", err);
          setError("Failed to load reviews.");
        } finally {
          setLoading(false);
        }
      };
      
      useEffect(() => {
        fetchReviews();
      }, [productItems]);
      
      useEffect(() => {
        if (!userData && showReviewBox) {
          toast.error("Please log in to write a review.");
          setShowReviewBox(false);
        }
      }, [showReviewBox, userData]);
      

      const [currentProduct, setCurrentProduct] = useState([]);
      
        const GetProductDetailsForUpdate = (productItems) => {
          setCurrentProduct(productItems);
          setShowEditPopUp(true);
        };

      useEffect(() => {
  console.log("Ring details for admin (updated):", currentProduct);
}, [currentProduct]);

const fetchUpdatedProduct = async () => {
  try {
    const response = await axios.get(
      `https://backend-pbs-coo6.onrender.com/api/v1/products/get-productBy-id?productId=${productItems._id}`
    );
    const updatedProduct = response.data.product;

    // Update productItems here if it's in state or call a context method if available
    setCurrentProduct(updatedProduct); // update local state for edit pop-up
    setCurrentImage(updatedProduct.ProductImages[0]); // update image
  } catch (error) {
    console.error("Failed to fetch updated product:", error);
  }
};

console.log("Product Items:", productItems);
    
  return (
    <>
      <Toaster position="top-left" reverseOrder={true} />

{userData && showReviewBox && (
  <div className="Review-Section fixed w-full flex row align-items-center justify-content-center mt-[-5%] z-[9999999999]">
    <CustomerReviews
      closeReviewBox={() => setShowReviewBox(false)}
      productId={productItems._id}
      refreshReviews={fetchReviews}
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
          
          <div className="p-6 max-w-lg  Right-Side-Product-Details-Box rounded-lg">
      
       {/* Rating */}
            <div className="More flex justify-between" >

       <span className="text-sm text-green-600 font-semibold">In stock</span>
               {adminData &&(
                <img src={moreIcon} alt="More options about product for admin" className="w-8" onClick={() => GetProductDetailsForUpdate(productItems)}/>
               )}
              </div>
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
      <h1 className="Product-Title text-lg font-semibold">
      {productItems.ProductName}
      </h1>
      <p className="Product-Dec mb-2"> {productItems.ProductDescription} </p>

      {/* Offer Banner */}
      <div className="Product-Offer-Box p-2 rounded-lg text-sm mb-4">
        Flat 10% off on making charges
      </div>

      {/* Product Details */}
      <div className="flex gap-2 text-center text-sm mb-4">
        <div className="Product-Weight border rounded-lg p-2 flex gap-1">
          <p className="">Weight</p>
          <p className="font-semibold w-[100px]">13 (52.8 mm)</p>
        </div>
     
        <div className="Product-Weight Product-Customise text-center rounded-lg p-2 cursor-pointer">
          <p className="text-white">CUSTOMISE</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4">
      <div className="button-AddToCart" data-tooltip={"₹"+productItems.ProductPrice}>
     <div onClick={() => addToCart(productItems)} className="button-wrapper-AddTo-Cart bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold py-2 px-4 rounded-lg flex items-center">
    
    <div className="text-AddCart-Feild flex flex-row gap-2 cursor-pointer">   
        <span className="material-symbols-outlined cursor-pointer">
            shopping_cart
        </span>
        ADD TO CART
    </div>
    <span className="icon-AddTo-Cart cursor-pointer">
    <span className="material-symbols-outlined cursor-pointer">
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

          {/* Display loading message */}
          {loading && <p className="text-gray-500">Loading reviews...</p>}

{/* Display error message */}
{error && <p className="text-red-500">{error}</p>}
        
{reviews.length > 0 ? (
  reviews.map((review) => (
    <div key={review._id} className="review">
      <div className="review-header">
        <div className="review-Auther-Time flex flex-col">
          <span className="review-author">{review.userName}</span>
          <span className="review-date">
          {new Date(review.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
</span>

        </div>
      </div>
      <div className="review-stars flex">{renderStars(review.reviewRating)}</div>
      <div className="reviewTitle-txt">
        <h3 className="review-title">{review.reviewTitle}</h3>
        <p className="review-content flex flex-col">{review.reviewComment}</p>
      </div>
    </div>
  ))
) : (
  <p className="text-gray-500">No reviews available.</p>
)}

    </div>
  
  {showEditPopUp && (
  <EditProductDetails
    ring={currentProduct}
    onClose={() => setShowEditPopUp(false)}
    refreshData={fetchUpdatedProduct} // pass this here
  />
)}


    </>
  )
}

export default ItemDetails
