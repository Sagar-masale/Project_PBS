import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CartContext from '../Context/CartContext';
import AdminContext from "../Context/AdminContext";
import ProfileContext from '../Context/ProfileContext';
import ReviewContext from "../Context/ReviewContext";
import CustomerReviews from './CustomerReviews';
import EditProductDetails from './EditProductDetails';
import './ItemDetails.css';
import moreIcon from "../../../public/menu.png";
import toast, { Toaster } from 'react-hot-toast';
import { X , Facebook, Instagram, Copy, MessageSquare } from "lucide-react";
import MetalContext from '../Context/MetalRateContext';

function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [showEditPopUp, setShowEditPopUp] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [customising, setCustomising] = useState(false);
  const [selectedSize, setSelectedSize] = useState("Default");
  const [showReviewBox, setShowReviewBox] = useState(false);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productType, setProductType] = useState("");

  const { productItems, addToCart } = useContext(CartContext);
  const { adminData } = useContext(AdminContext);
  const { userData } = useContext(ProfileContext);
  const { reviews, setReviews } = useContext(ReviewContext);

  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const { metalRates, calculateFinalPrice } = useContext(MetalContext);

  const [selectedWeight, setSelectedWeight] = useState(null);
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const shareUrl = window.location.href;


  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link");
    }
    setShowOptions(false);
  };


  const openShare = (platform) => {
    let url = "";

      switch (platform) {
        case "whatsapp":
          url = `https://wa.me/?text=${encodeURIComponent(shareUrl)}`;
          break;
        case "facebook":
          url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
          break;
        case "instagram":
          toast.error("Instagram web does not support direct sharing. Please use the app.");
          return;
        default:
          return;
      }

    window.open(url, "_blank");
    setShowOptions(false);
  };

useEffect(() => {
  const loadProduct = async () => {
    if (productItems && productItems._id === id) {
  setProduct(productItems);
  setCurrentImage(productItems.ProductImages?.[0] || "");

  // Derive product type from ProductCategory
  if (productItems.ProductCategory) {
    setProductType(productItems.ProductCategory.toLowerCase()); // e.g., "Ring" => "ring"
  }
}  else {
      const endpoints = [
        "get-productBy-id",
        "get-earringBy-id",
        "get-pendantBy-id",
        "get-mangalsutraBy-id",
        "get-bangleBy-id",
        "get-chainBy-id",
      ];

      for (const endpoint of endpoints) {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/v1/products/${endpoint}?productId=${id}`
          );

         
           const data = response.data?.message?.product || response.data?.product || null;
         if (data) {
        setProduct(data);
        setCurrentImage(data.ProductImages?.[0] || "");

        const type = endpoint.split("-")[1]; // e.g., "earring"
        setProductType(type);
        return;
      }
        } catch (err) {
          // silent
        }
      }

      console.error("Product not found in any category.");
      setProduct(null);
    }
  };

  if (id) loadProduct();
}, [id, productItems]);




  const fetchReviews = async () => {
    if (!product?._id) return;
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/reviews/get-reviewBy-productId?productId=${product._id}`
      );
      const reviewData = response.data.data;
      setReviews(reviewData);

      if (reviewData.length > 0) {
        const total = reviewData.reduce((sum, r) => sum + r.reviewRating, 0);
        const avg = total / reviewData.length;
        setAverageRating(avg);
      } else {
        setAverageRating(0);
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("Failed to load reviews.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [product]);

  useEffect(() => {
    if (!userData && showReviewBox) {
      toast.error("Please log in to write a review.");
      setShowReviewBox(false);
    }
  }, [showReviewBox, userData]);

  const GetProductDetailsForUpdate = (item) => {
    setCurrentProduct(item);
    // console.log("Currentttt: ",currentProduct)
          setProductType(item.ProductCategory); // treat "product" as "ring"
        // console.log("typeee: ",productType);
     
    setShowEditPopUp(true);
  };

  const fetchUpdatedProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/products/get-productBy-id?productId=${product._id}`);
      const updatedProduct = response.data.product;
      setCurrentProduct(updatedProduct);
      setCurrentImage(updatedProduct.ProductImages[0]);
    } catch (error) {
      console.error("Failed to fetch updated product:", error);
    }
  };


if (!product) {
  return <div className="text-center text-gray-500 mt-20">Loading product details...</div>;
}
const openImageViewer = (index) => {
  setActiveImageIndex(index);
  setIsImageViewerOpen(true);
};

const closeImageViewer = () => {
  setIsImageViewerOpen(false);
};


  const sizeOptionsMap = {
    Rings: ["13 (52.8 mm)", "14 (54.0 mm)", "15 (55.5 mm)", "16 (57.0 mm)", "17 (58.5 mm)"],
    Bangles: ["2-2 (6.67 cm)", "2-4 (6.99 cm)", "2-6 (7.19 cm)", "2-8 (7.49 cm)", "2-10 (7.78 cm)"],
    Chains: ["16 inches", "18 inches", "20 inches", "22 inches"],
    Earrings: ["Mini Pair", "Standard Pair", "Large Pair"],
    Pendants: ["Small", "Medium", "Large"],
    Mangalsutra: ["16 inches", "18 inches", "20 inches"] 
  };

  const sizeOptions = sizeOptionsMap[product?.ProductCategory] || [];



// console.log("Cate: ",product.ProductCategory);

const sizeWeightMap = {
  Rings: {
    "13 (52.8 mm)": 2.5,
    "14 (54.0 mm)": 3.0,
    "15 (55.5 mm)": 3.5,
    "16 (57.0 mm)": 4.0,
    "17 (58.5 mm)": 4.5,
  },
  Bangles: {
    "2-2 (6.67 cm)": 10,
    "2-4 (6.99 cm)": 12,
    "2-6 (7.19 cm)": 14,
    "2-8 (7.49 cm)": 16,
    "2-10 (7.78 cm)": 18,
  },
  Chains: {
    "16 inches": 8,
    "18 inches": 10,
    "20 inches": 12,
    "22 inches": 14,
  },
  Mangalsutra: {
    "16 inches": 5,
    "18 inches": 6,
    "20 inches": 7,
    "22 inches": 8,
  },
  Earrings: {
    "Standard Pair": 4, 
    "Large Pair": 6,
    "Mini Pair": 2.5
  },
  Pendants: {
    "Small": 3,
    "Medium": 4.5,
    "Large": 6
  }
};
const priceToDisplay = calculatedPrice !== null ? calculatedPrice : calculateFinalPrice(product);

console.log("Producttttt", product);


if(selectedSize==0){
  setSelectedSize("Default");
}
    
  return (
<>
  <Toaster position="top-left" reverseOrder={true} />

  {userData && showReviewBox && (
    <div className="Review-Section fixed w-full flex row align-items-center justify-content-center mt-[-5%] z-[9999999999]">
      <CustomerReviews
        closeReviewBox={() => setShowReviewBox(false)}
        productId={product._id}
        productImage = {product.ProductImages[0] }
        refreshReviews={fetchReviews}
      />
    </div>
  )}
{isImageViewerOpen && (

<>
  {/* Overlay Container */}
  <div className="fixed inset-0 z-50 backdrop-blur-sm mt-18 pt-40 bg-white  bg-opacity-80 flex items-center justify-center px-4 py-6 overflow-y-auto">

    {/* Close Arrow */}
    <button
      onClick={closeImageViewer}
      className="absolute top-[120px] left-4 md:top-20 md:left-6 text-purple-800 text-3xl md:text-4xl z-50 hover:scale-110 transition duration-300"
      aria-label="Close"
    >
      ←
    </button>

    {/* Image Viewer Content */}
    <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-8 w-full max-w-6xl mx-auto mt-auto">
      
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-auto max-w-full md:max-w-[120px]">
        {product.ProductImages.map((img, index) => (
          <img
            key={index}
            src={img}
            onClick={() => setActiveImageIndex(index)}
            className={`w-20 h-20 object-cover rounded-lg border-2 cursor-pointer ${
              activeImageIndex === index ? "border-purple-700" : "border-transparent"
            }`}
            alt={`thumb-${index}`}
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 flex justify-center items-center">
        <img
          src={product.ProductImages[activeImageIndex]}
          alt="Selected Product"
          className="max-h-[80vh] w-auto object-contain rounded-lg shadow-md"
        />
      </div>
    </div>
  </div>
</>

)}





  <div className="ItemDetails-Container rounded-lg">
    <div className="gap-8 Left-Side-Product-Details">
      <div className="flex flex-col items-center">
      <img
        src={currentImage}
        alt="ProductImage"
        className="ProductMain-Image mb-4 cursor-pointer"
        onClick={() => openImageViewer(0)}
      />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-2 mt-4">
          {product.ProductImages?.map((thumb, index) => (
            <div
              key={index}
              className="ProductMore-Images hover:border-blue-500 cursor-pointer"
            >
              <img
                src={thumb}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                onClick={() => openImageViewer(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="Right-Side-Product-Details">
      <div className="p-6 max-w-lg Right-Side-Product-Details-Box rounded-lg">
        <div className="More flex justify-between">
          <span className="text-sm text-green-600 font-semibold">In stock</span>
          {adminData && (
            <img
              src={moreIcon}
              alt="More options about product for admin"
              className="w-8 cursor-pointer"
              onClick={() => GetProductDetailsForUpdate(product)}
            />
          )}
        </div>

        <div className="flex items-center mt-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                fill={i < Math.round(averageRating) ? "currentColor" : "none"}
                stroke="currentColor"
                className={`w-5 h-5 ${
                  i < Math.round(averageRating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.5 3 1.5-6.5L1 7l6.5-.5L10 1l2.5 5.5L19 7l-5 4.5L15.5 18z" />
              </svg>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {reviews.length} Review{reviews.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="relative ml-auto">
            {/* Share Icon */}
            <span
              className="cursor-pointer ml-auto"
              onClick={() => setShowOptions(!showOptions)}
            >
                <img
                  src="/share.png"
                  alt="Share"
                  className="w-7  md:w-8 md:h-8 lg:w-10 lg:h-10 rotate-1"
                />

            </span>

            {/* Dropdown */}
            {showOptions && (
              <div className="absolute right-0 top-8 w-72 max-w-[90vw] bg-white border rounded-xl shadow-xl z-50 p-4 animate-fadeIn">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                                  <h4 className="text-lg font-bold text-[#581C87] tracking-wide mb-2">
                  Share via
                </h4>

                  <button
                    onClick={() => setShowOptions(false)}
                    className="text-gray-500 hover:text-red-500 text-lg"
                  >
                   <X />
                  </button>
                </div>

                {/* Share Options */}
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => openShare("whatsapp")}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
                  >
                    <MessageSquare className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium">WhatsApp</span>
                  </div>

                  <div
                    onClick={() => openShare("facebook")}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
                  >
                    <Facebook className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium">Facebook</span>
                  </div>

                  <div
                    onClick={() => openShare("instagram")}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
                  >
                    <Instagram className="w-5 h-5 text-pink-500" />
                    <span className="text-sm font-medium">Instagram</span>
                  </div>

                  <div
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
                  >
                    <Copy className="w-5 h-5 text-gray-700" />
                    <span className="text-sm font-medium">Copy Link</span>
                  </div>
                </div>
              </div>
            )}
          </div>


        </div>

        <div className="mb-2">
        <h2 className="ProductPrice text-2xl font-bold">
          ₹{calculatedPrice || calculateFinalPrice(product)}{" "}
          <span className="line-through text-gray-500 text-lg">
            ₹{(calculatedPrice || calculateFinalPrice(product)) + 3000}
          </span>
        </h2>

          <p className="text-gray-500 text-sm">(MRP Inclusive of all taxes)</p>
        </div>

        <h1 className="Product-Title text-lg font-semibold">
          {product.ProductName}
        </h1>
        <p className="Product-Dec mb-2">{product.ProductDescription}</p>

        <div className="Product-Offer-Box p-2 rounded-lg text-sm mb-4">
          Flat 10% off on making charges
        </div>

        <div className="flex flex-col gap-2 text-sm mb-4">
          <div className="flex gap-2 flex-wrap">
            <div className="Product-Weight border rounded-lg p-2 px-4 flex flex-col items-center gap-2">
              <p className="text-gray-600">Weight:</p>
              <p className="font-semibold">
                {selectedWeight || product.weightInGrams}{" "}
                <span className="text-gray-700 ">
                  ({selectedSize !== "0" ? selectedSize : "Default"})
                </span>
              </p>


            </div>

            <button
              onClick={() => setCustomising(!customising)}
              className="Product-Weight Product-Customise bg-gradient-to-r bg-[#581C87] text-white rounded-lg px-4 py-2 text-sm font-semibold shadow-md transition hover:bg-[#481b6a]"
            >
              {customising ? "HIDE OPTIONS" : "CUSTOMISE"}
            </button>
          </div>
{/* Free Size Message */}
{customising && sizeOptions.length === 0 && (
  <p className="text-sm text-gray-600 mt-2 italic">Free size – no selection required.</p>
)}

{/* Size Selector */}
{customising && sizeOptions.length > 0 && (
  <div className="flex flex-wrap gap-3 mt-2">
    {sizeOptions.map((size) => {
      const isSelected = size === selectedSize;

      return (
        <button
          key={size}
          onClick={() => {
            setSelectedSize(size);

            const weight = sizeWeightMap[product.ProductCategory]?.[size] || product.weightInGrams || 1;
            setSelectedWeight(weight);

            const price = calculateFinalPrice({
              ...product,
              weightInGrams: weight
            });
            setCalculatedPrice(price);
          }}
          className={`px-4 py-2 rounded-full border text-sm font-medium transition 
            ${isSelected 
              ? 'bg-[#4f3267] text-white border-[#4f3267]' 
              : 'bg-white text-gray-700 border-gray-300 hover:bg-[#f6eff6] hover:border-[#4f3267]'}`}
        >
          {size}
        </button>
      );
    })}
  </div>
)}


        </div>

        <div className="flex items-center space-x-4">
          <div
            className="button-AddToCart"
            data-tooltip={`₹${priceToDisplay}`}

          >
            <div
              onClick={() =>
              addToCart({
                ...product,
                selectedWeight: selectedWeight || product.weightInGrams,
                selectedSize: selectedSize || "Default",
                finalPrice: priceToDisplay // calculatedPrice or fallback
              })
            }

              className="button-wrapper-AddTo-Cart bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold py-2 px-4 rounded-lg flex items-center"
            >
             
              
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

<div className="reviews-container w-full px-4 md:px-10 py-6">
  {/* Heading & Button */}
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
    <h2 className="text-2xl font-bold text-[#4f3267] tracking-wide">
      Recent Reviews
    </h2>
    <button
      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-700 hover:to-pink-500 text-white px-5 py-2 text-sm md:text-base rounded-full font-medium transition duration-300"
      onClick={() => setShowReviewBox(true)}
    >
      WRITE A REVIEW
    </button>
  </div>

  {/* Loading/Error */}
  {loading && <p className="text-gray-500 text-sm">Loading reviews...</p>}
  {error && <p className="text-red-500 text-sm">{error}</p>}

  {/* Review List */}
  {reviews.length > 0 ? (
    <div className="grid gap-4">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
        >
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
            <div>
              <p className="font-semibold text-gray-800 text-sm">{review.userName}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {new Date(review.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            {/* Stars */}
            <div className="flex mt-2 sm:mt-0">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={
                    i < Math.round(review.reviewRating)
                      ? "url(#starGradient)"
                      : "#E5E7EB"
                  }
                  className="w-5 h-5"
                >
                  <defs>
                    <linearGradient id="starGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#facc15" />
                      <stop offset="100%" stopColor="#fb923c" />
                    </linearGradient>
                  </defs>
                  <path d="M12 .587l3.668 7.57L24 9.748l-6 5.852L19.335 24 12 20.015 4.665 24 6 15.6 0 9.748l8.332-1.591z" />
                </svg>
              ))}
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-sm font-medium text-[#4f3267] mb-1">
              {review.reviewTitle}
            </h3>
            <p className="text-sm text-gray-600 whitespace-pre-line">
              {review.reviewComment}
            </p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500 text-sm mt-4">No reviews available.</p>
  )}
</div>



{showEditPopUp && (
<EditProductDetails
  product={currentProduct}
  productType={productType}
  onClose={() => setShowEditPopUp(false)}
  refreshData={fetchUpdatedProduct}
/>

)}

</>

  )
}

export default ItemDetails
