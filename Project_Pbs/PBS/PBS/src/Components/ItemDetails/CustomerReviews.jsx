import React, { useState, useContext } from 'react';
import ReviewContext from "../Context/ReviewContext.js"
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import ProfileContext from "../Context/ProfileContext";

const CustomerReviews = ({ closeReviewBox, productId, refreshReviews  }) => {
  const { userData } = useContext(ProfileContext);
  
  // Initial state for new review
  const [newReview, setNewReview] = useState({ 
    userName: userData?.name || '', 
    reviewTitle: '', 
    reviewRating: 0, 
    reviewComment: '', 
    userId: userData?._id || '',  
    productId: productId || ''  
  });

  const currentDate = new Date().toLocaleDateString();

  const { setReviews } = useContext(ReviewContext);


  const handleSubmitReview = async (e) => {
    e.preventDefault();

    const reviewData = {
      userId: userData?._id || '',
      productId: productId || '',
      userName: newReview.userName,
      reviewTitle: newReview.reviewTitle,
      reviewRating: newReview.reviewRating,
      reviewComment: newReview.reviewComment
    };
  
    try {
      const response = await axios.post('http://localhost:8000/api/v1/reviews/add-review', reviewData);
  
      console.log('Review Submitted Successfully:', response.data);
  
      if (response.status === 201) {
        refreshReviews(productId);
      }
  
      // Reset form after submission
      setNewReview({ 
        userName: userData?.name || '', 
        reviewTitle: '', 
        reviewRating: 0, 
        reviewComment: '', 
        userId: userData?._id || '', 
        productId: productId || '' 
      });
  
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    }
  };
  

  const StarRating = ({ rating, onRatingChange }) => {
    return (
      <div className="flex space-x-1 mb-4">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`cursor-pointer text-2xl ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            onClick={() => onRatingChange(index + 1)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg relative">
      <h2 className="text-2xl text-[#4f3267] font-bold mb-6 text-left">Submit a Review</h2>
      <span className="material-symbols-outlined absolute right-0 top-0 mt-3 cursor-pointer mr-4 text-3xl" onClick={closeReviewBox}>
        close
      </span>
      
      <form onSubmit={handleSubmitReview} className="bg-[rgb(246,239,246)] p-6 rounded-lg">
        <span className="text-gray-500 absolute right-14">{currentDate}</span>

        <div className="mb-4">
          <label htmlFor="userName" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="userName"
            value={newReview.userName}
            onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="reviewTitle" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="reviewTitle"
            value={newReview.reviewTitle}
            onChange={(e) => setNewReview({ ...newReview, reviewTitle: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Rating</label>
          <StarRating
            rating={newReview.reviewRating}
            onRatingChange={(rating) => setNewReview({ ...newReview, reviewRating: rating })}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="reviewComment" className="block text-gray-700 font-bold mb-2">
            Comment
          </label>
          <textarea
            id="reviewComment"
            value={newReview.reviewComment}
            onChange={(e) => setNewReview({ ...newReview, reviewComment: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-[#4f3267] text-white px-6 py-2 rounded-lg hover:bg-[#432a58] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default CustomerReviews;
