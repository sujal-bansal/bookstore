import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBookStore } from "../store/BookStore";
import { useReviewStore } from "../store/ReviewStore";
import { useAuthStore } from "../store/AuthStore";
import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";

function BookDetailPage() {
  const { id } = useParams();
  const { books, getSingleBook, isLoading: bookLoading } = useBookStore();
  const { reviews, getReview, isLoading: reviewLoading } = useReviewStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getSingleBook(id);
    getReview(id);
  }, [id, getSingleBook, getReview]);

  const book = books;

  if (bookLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-center py-8 text-gray-300">
          Loading book details...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 bg-gray-900 px-4">
      {book && (
        <>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <img
                src={book.coverImage || "/book-placeholder.png"}
                alt={book.title}
                className="w-full rounded shadow-md"
              />
            </div>
            <div className="md:w-2/3">
              <h1 className="text-2xl font-bold text-white">{book.title}</h1>
              <p className="text-lg text-gray-300 mb-2">by {book.author}</p>
              <p className="mb-4">
                <span className="bg-gray-700 text-gray-200 px-2 py-1 rounded text-sm">
                  {book.genre}
                </span>
              </p>
              <p className="text-gray-400 mb-4">{book.description}</p>
              <div className="text-sm text-gray-400">
                <p>Publisher: {book.publisher}</p>
                <p>Publication Year: {book.publicationYear}</p>
                <p>Reviews: {book.reviewCount || 0}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            {reviewLoading ? (
              <p className="text-gray-300">Loading reviews...</p>
            ) : (
              <>
                <ReviewList reviews={reviews} />
                {authUser && <ReviewForm bookId={id} />}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default BookDetailPage;
