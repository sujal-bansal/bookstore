import React, { useEffect, useState } from "react";
import BookList from "../components/BookList";
import { useBookStore } from "../store/BookStore";

function BooksPage() {
  const {
    books,
    filteredBooks,
    getAllBooks,
    isLoading,
    currentPage,
    totalPages,
    setPage,
    filters,
    setFilter,
    resetFilters,
  } = useBookStore();

  const [genres, setGenres] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    getAllBooks(currentPage);
  }, [getAllBooks, currentPage]);

  useEffect(() => {
    if (books.books && books.books.length > 0) {
      const uniqueGenres = [
        ...new Set(
          books.books.filter((book) => book.genre).map((book) => book.genre)
        ),
      ];

      const uniqueYears = [
        ...new Set(
          books.books
            .filter((book) => book.publicationYear)
            .map((book) => book.publicationYear.toString())
        ),
      ].sort((a, b) => b - a);

      setGenres(uniqueGenres);
      setYears(uniqueYears);
    }
  }, [books]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(name, value);
  };

  const handleSearch = (e) => {
    setFilter("searchTerm", e.target.value);
  };

  const handleResetFilters = () => {
    resetFilters();
    document.getElementById("genreFilter").value = "";
    document.getElementById("yearFilter").value = "";
    document.getElementById("searchFilter").value = "";
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(currentPage - 2, 1);
      let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

      if (endPage === totalPages) {
        startPage = Math.max(endPage - maxPagesToShow + 1, 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="min-h-screen py-6 bg-gray-900 px-4">
      <h1 className="text-2xl font-bold mb-6 text-white">Books Collection</h1>

      <div className="bg-gray-800 p-4 rounded-lg mb-6 border border-gray-700">
        <h2 className="text-lg font-semibold mb-3 text-gray-200">
          Filter Books
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label
              htmlFor="searchFilter"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Search
            </label>
            <input
              type="text"
              id="searchFilter"
              name="searchTerm"
              placeholder="Search by title, author..."
              value={filters.searchTerm}
              onChange={handleSearch}
              className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
            />
          </div>

          <div>
            <label
              htmlFor="genreFilter"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Genre
            </label>
            <select
              id="genreFilter"
              name="genre"
              value={filters.genre}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="yearFilter"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Publication Year
            </label>
            <select
              id="yearFilter"
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
            >
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-300">Loading books...</p>
      ) : (
        <>
          {filteredBooks.books && filteredBooks.books.length > 0 ? (
            <BookList books={filteredBooks.books || []} />
          ) : (
            <p className="text-center text-gray-400">
              No books match your filters. Try different criteria.
            </p>
          )}

          {totalPages > 1 &&
            filteredBooks.books &&
            filteredBooks.books.length > 0 && (
              <div className="flex justify-center mt-6 space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded ${
                    currentPage === 1
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Previous
                </button>

                {getPageNumbers().map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1 rounded ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded ${
                    currentPage === totalPages
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Next
                </button>
              </div>
            )}

          <div className="text-center mt-3 text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </div>
        </>
      )}
    </div>
  );
}

export default BooksPage;
