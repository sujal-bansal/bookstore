import React from "react";
import { Link } from "react-router-dom";

function ReviewItem({ review }) {
  const date = new Date(review.createdAt).toLocaleDateString();

  return (
    <div className="border-b border-gray-700 py-3">
      <div className="flex justify-between items-start">
        <Link
          to={`/users/${review.user._id}`}
          className="font-medium text-blue-400 hover:underline"
        >
          {review.user.username}
        </Link>
        <span className="text-xs text-gray-400">{date}</span>
      </div>
      <p className="mt-2 text-gray-300">{review.content}</p>
      <p className="mt-2 text-gray-300">Rating : {review.rating}</p>
    </div>
  );
}

export default ReviewItem;
