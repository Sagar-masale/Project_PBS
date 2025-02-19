import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const CustomerReviews = ({closeReviewBox}) => {
  const [newReview, setNewReview] = useState({ title: '', name: '', rating: 0, comment: '' });
  const currentDate = new Date().toLocaleDateString();

  const handleSubmitReview = (e) => {
    e.preventDefault();
    console.log('Review Submitted:', newReview);
    setNewReview({ title: '', name: '', rating: 0, comment: '' });
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
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg relative">
      <h2 className="text-2xl text-[#4f3267] font-bold mb-6 text-left">Submit a Review</h2>
      <span class="material-symbols-outlined absolute right-0 top-0 mt-3 cursor-pointer mr-4 text-3xl" onClick={closeReviewBox}>
      close
      </span>
      
      <form onSubmit={handleSubmitReview} className="bg-[rgb(246,239,246)] p-6 rounded-lg">
      <span className="text-gray-500 absolute right-14">{currentDate}</span>
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
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={newReview.title}
            onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
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
          className="bg-[#4f3267] text-white px-6 py-2 rounded-lg hover:bg-[#432a58] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default CustomerReviews;
