import React from "react";
import ReviewItem from "./ReviewItem";

function ReviewList({ reviews }) {
  if (reviews.length === 0) {
    return <p className="text-center py-4 text-gray-400">No reviews yet.</p>;
  }

  return (
    <div className="my-6">
      <h3 className="text-xl font-bold mb-4 text-white">Reviews</h3>
      <div className="space-y-2">
        {reviews.map((review) => (
          <ReviewItem key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
}

export default ReviewList;
