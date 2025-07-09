import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Reviews() {
  const [allReviews, setAllReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("https://backend-pbs-coo6.onrender.com/api/v1/reviews/getAll-reviews");
        setAllReviews(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch all reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`text-xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full  mx-auto p-4">
      <h2 className="text-2xl font-bold text-[#4f3267] mb-6">Customer Reviews</h2>

      {allReviews.length === 0 ? (
        <p className="text-gray-600">No reviews yet.</p>
      ) : (
        <div className="space-y-6">
          {allReviews.map((review) => {
            const imageUrl = review.productImage || "/default-image.jpg";

            return (
<div
  key={review._id}
  className="bg-[rgb(246,239,246)] p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex flex-col sm:flex-row gap-4 sm:items-start"
>
  {/* Product Image */}
  <img
    src={imageUrl}
    alt="Product"
    onClick={() => navigate("/ItemDetails/" + review.productId)}
    className="w-24 h-24 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200"
  />

  {/* Review Content */}
  <div className="flex-1">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
      <div
        className="cursor-pointer"
        onClick={() => navigate("/ItemDetails/" + review.productId)}
      >
        <h3 className="text-lg font-semibold text-[#4f3267] hover:underline">
          {review.reviewTitle}
        </h3>
        <p className="text-xs text-[#4f3267] font-medium truncate max-w-xs">
          {review.reviewComment}
        </p>
      </div>

      <span className="text-sm text-gray-500 mt-2 sm:mt-0">
        {new Date(review.createdAt).toLocaleDateString()}
      </span>
    </div>

    <p className="text-sm text-gray-600 italic mb-1">By: {review.userName}</p>

    {renderStars(review.reviewRating)}

  
  </div>
</div>

            );
          })}
        </div>
      )}
    </div>
  );
}

export default Reviews;
