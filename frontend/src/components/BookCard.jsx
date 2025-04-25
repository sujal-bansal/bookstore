import React from "react";
import { Link } from "react-router-dom";

function BookCard({ book }) {
  return (
    <div className="border border-gray-700 rounded-md p-4 shadow-sm hover:shadow-md transition bg-gray-800">
      <img
        src={book.coverImage || "/book-placeholder.png"}
        alt={book.title}
        className="w-full h-48 object-cover mb-2 rounded"
      />
      <h3 className="font-bold text-lg text-white">{book.title}</h3>
      <p className="text-gray-300">by {book.author}</p>
      <p className="text-sm text-gray-400 my-2">{book.genre}</p>
      <Link
        to={`/books/${book._id}`}
        className="block mt-3 text-center bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700"
      >
        View Details
      </Link>
    </div>
  );
}

export default BookCard;
