import React, { useState } from "react";
import { useAuthStore } from "../store/AuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow space-y-4 border border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email:
            </label>
            <input
              type="text"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full pr-10 px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            {isLoading ? (
              <Loader2 className="animate-spin mx-auto" />
            ) : (
              "Submit"
            )}
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
