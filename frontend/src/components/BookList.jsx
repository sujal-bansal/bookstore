import React from "react";
import BookCard from "./BookCard";

function BookList({ books }) {
  if (books.length === 0) {
    return (
      <p className="text-center py-6 text-gray-400">No books available.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}

export default BookList;
