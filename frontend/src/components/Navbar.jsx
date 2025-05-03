import { useAuthStore } from "../store/AuthStore";
import { Link, useLocation } from "react-router-dom";
import React from "react";

function Navbar() {
  const { logout, authUser } = useAuthStore();
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";
  const isAdmin = authUser && authUser?.user?.role === "admin";

  return (
    <nav className="bg-gray-800 shadow py-4 mb-6 border-b border-gray-700">
      <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
        <Link to="/">
          <h1 className="text-xl font-semibold text-white">Book Store</h1>
        </Link>
        {!isAuthPage && authUser && (
          <div className="flex items-center gap-4">
            {isAdmin && (
              <Link
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                to="/adminOnly"
              >
                Add Book
              </Link>
            )}
            {location.pathname === "/profile" ? (
              <Link
                className="text-blue-400 hover:underline hover:text-blue-300"
                to="/"
              >
                Home
              </Link>
            ) : (
              <Link
                className="text-blue-400 hover:underline hover:text-blue-300"
                to="/profile"
              >
                Profile
              </Link>
            )}
            <button
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              type="button"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
