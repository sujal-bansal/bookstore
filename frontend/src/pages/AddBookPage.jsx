import React, { useState } from "react";
import { useBookStore } from "../store/BookStore";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";

function AddBookPage() {
  const navigate = useNavigate();
  const { postBook, isLoading } = useBookStore();
  const { authUser: user } = useAuthStore();

  if (!user || user.role !== "admin") {
    return (
      <div className="py-6 text-center">
        <h1 className="text-2xl font-bold mb-4 text-white">Access Denied</h1>
        <p className="text-gray-300">
          You must be an administrator to access this page.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    coverImage: "",
    genre: "",
    publicationYear: "",
    publisher: "",
    featured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.author) {
      return alert("Title and author are required");
    }

    const result = await postBook(formData);
    if (result) {
      navigate("/books");
    }
  };

  return (
    <div className="py-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-white">Add New Book</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-200">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-800 border-gray-600 text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-200">
            Author *
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-800 border-gray-600 text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-200">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded h-32 bg-gray-800 border-gray-600 text-white"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-200">
            Cover Image URL
          </label>
          <input
            type="url"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-800 border-gray-600 text-white"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-gray-200">
              Genre
            </label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-800 border-gray-600 text-white"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-200">
              Publication Year
            </label>
            <input
              type="number"
              name="publicationYear"
              value={formData.publicationYear}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-800 border-gray-600 text-white"
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-200">
            Publisher
          </label>
          <input
            type="text"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-800 border-gray-600 text-white"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="featured" className="text-gray-200">
            Featured Book
          </label>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => navigate("/books")}
            className="px-4 py-2 border rounded hover:bg-gray-700 border-gray-600 text-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-800 disabled:text-gray-300"
          >
            {isLoading ? "Adding..." : "Add Book"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBookPage;
