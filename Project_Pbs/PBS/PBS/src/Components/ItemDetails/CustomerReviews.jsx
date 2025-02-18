import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const CustomerReviews = () => {
  const [newReview, setNewReview] = useState({ name: '', rating: 0, comment: '' });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    console.log('Review Submitted:', newReview);
    setNewReview({ name: '', rating: 0, comment: '' });
  };

  const StarRating = ({ rating, onRatingChange }) => {
    return (
      <div className="flex space-x-1 mb-4">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`cursor-pointer text-2xl ${
              index < rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            onClick={() => onRatingChange(index + 1)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Submit a Review</h2>
      
      <form onSubmit={handleSubmitReview} className="bg-gray-100 p-6 rounded-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={newReview.name}
            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Rating</label>
          <StarRating
            rating={newReview.rating}
            onRatingChange={(rating) => setNewReview({ ...newReview, rating })}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="comment" className="block text-gray-700 font-bold mb-2">
            Comment
          </label>
          <textarea
            id="comment"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default CustomerReviews;
