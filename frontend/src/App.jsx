import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/AuthStore.js";

import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import AddBookPage from "./pages/AddBookPage.jsx";
import BookDetailPage from "./pages/BookDetailPage.jsx";
import BooksPage from "./pages/BooksPage.jsx";
import Navbar from "./components/Navbar.jsx";
import UserProfilePage from "./pages/UserProfilePage.jsx";

function App() {
  const { authUser, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4">
        <Routes>
          <Route
            path="/signup"
            element={!authUser ? <SignupPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/users/:userId"
            element={authUser ? <UserProfilePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/books"
            element={authUser ? <BooksPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/books/:id"
            element={authUser ? <BookDetailPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/adminOnly"
            element={
              authUser && authUser.role === "admin" ? (
                <AddBookPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
