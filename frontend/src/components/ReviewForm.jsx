import React, { useState } from "react";
import { useReviewStore } from "../store/ReviewStore";

function ReviewForm({ bookId }) {
  const [content, setContent] = useState("");
  const { createReview, isLoading } = useReviewStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createReview(bookId, { content });
    setContent("");
  };

  return (
    <div className="mt-6 border-t border-gray-700 pt-4">
      <h3 className="text-lg font-bold mb-3 text-white">Add Your Review</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full border border-gray-600 rounded p-2 mb-3 bg-gray-700 text-white"
          rows="4"
          placeholder="Share your thoughts about this book..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-800 disabled:text-gray-300"
        >
          {isLoading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;
