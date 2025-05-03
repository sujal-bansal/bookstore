import React, { useState } from "react";
import { useReviewStore } from "../store/ReviewStore";
import EnhancedReviewComparison from "./EnhancedReviewComparison";
import { useBookStore } from "../store/BookStore";

function ReviewForm({ bookId }) {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [isComparing, setIsComparing] = useState(false);
  const [originalReview, setOriginalReview] = useState("");
  const [enhancedReview, setEnhancedReview] = useState("");
  const { createReview, refineReview, isEnhancing, isLoading } =
    useReviewStore();
  const { getSingleBook } = useBookStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createReview(bookId, { content, rating });
    await getSingleBook(bookId);
    setRating("");
    setContent("");
  };

  const handleEnhance = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setOriginalReview(content);

    const enhancedContent = await refineReview(bookId, { content });

    if (enhancedContent) {
      setEnhancedReview(enhancedContent);
      setIsComparing(true);
    }
  };

  const handleChooseVersion = async (version) => {
    setContent(version);
    setIsComparing(false);
  };

  const handleCancelComparison = () => {
    setIsComparing(false);
  };

  return (
    <div className="mt-6 border-t border-gray-700 pt-4">
      <h3 className="text-lg font-bold mb-3 text-white">Add Your Review</h3>
      {isComparing ? (
        <EnhancedReviewComparison
          originalReview={originalReview}
          enhancedReview={enhancedReview}
          onChooseOriginal={handleChooseVersion}
          onChooseEnhanced={handleChooseVersion}
          onCancel={handleCancelComparison}
        />
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full border border-gray-600 rounded p-2 mb-3 bg-gray-700 text-white"
            rows="4"
            placeholder="Share your thoughts about this book..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
          <label>Rating : </label>
          <input
            type="number"
            placeholder="Give Rating for the book"
            value={rating}
            onChange={(e) => {
              setRating(e.target.value);
            }}
          />
          <div className="flex space-x-3 mt-3">
            <button
              type="button"
              onClick={handleEnhance}
              disabled={isEnhancing || !content.trim()}
              className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 disabled:bg-purple-800 disabled:text-gray-300 flex items-center"
            >
              {isEnhancing ? "Enhancing Review..." : "Enhance with AI"}
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-800 disabled:text-gray-300"
            >
              {isLoading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ReviewForm;
