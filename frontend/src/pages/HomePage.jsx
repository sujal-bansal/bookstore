import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useBookStore } from "../store/BookStore";
import { useAuthStore } from "../store/AuthStore";
import BookList from "../components/BookList";

function HomePage() {
  const { featuredBooks, getFeaturedBooks, isLoading } = useBookStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getFeaturedBooks();
  }, [getFeaturedBooks]);

  return (
    <div className="min-h-screen py-8 bg-gray-900">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-4 text-white">
          Welcome to BookStore
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Discover new books, share your thoughts, and connect with other
          readers.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Featured Books</h2>
          <Link to="/books" className="text-blue-400 hover:underline">
            View All Books
          </Link>
        </div>

        {isLoading ? (
          <p className="text-center py-8 text-gray-300">
            Loading featured books...
          </p>
        ) : (
          <>
            {featuredBooks.books && featuredBooks.books.length > 0 ? (
              <BookList books={featuredBooks.books} />
            ) : (
              <p className="text-center py-6 text-gray-400">
                No featured books available at the moment.
              </p>
            )}
          </>
        )}
      </div>

      {authUser && (
        <div className="bg-gray-800 p-6 rounded-lg text-center mt-10 border border-gray-700">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">
            Share Your Opinion
          </h3>
          <p className="mb-4 text-gray-400">
            Browse our collection and leave reviews on your favorite books.
          </p>
          <Link
            to="/books"
            className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            Explore Books
          </Link>
        </div>
      )}
    </div>
  );
}

export default HomePage;
