import React, { useState } from "react";
import { useUserStore } from "../store/UserStore";
import { Loader2, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

function PasswordChangeForm({ onComplete }) {
  const { changePassword, isLoading } = useUserStore();
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.currentPassword) {
      return toast.error("Current password is required");
    }

    if (formData.newPassword.length < 6) {
      return toast.error("New password must be at least 6 characters");
    }

    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("New passwords don't match");
    }

    const success = await changePassword({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    });

    if (success && onComplete) {
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      onComplete();
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-medium text-white">Change Password</h3>

      <div>
        <label className="block text-sm font-medium text-gray-300">
          Current Password:
        </label>
        <div className="relative">
          <input
            type={showPassword.current ? "text" : "password"}
            value={formData.currentPassword}
            onChange={(e) =>
              setFormData({ ...formData, currentPassword: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-600 rounded focus:outline-none focus:ring focus:border-blue-500 pr-10 bg-gray-700 text-white"
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility("current")}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
          >
            {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">
          New Password:
        </label>
        <div className="relative">
          <input
            type={showPassword.new ? "text" : "password"}
            value={formData.newPassword}
            onChange={(e) =>
              setFormData({ ...formData, newPassword: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-600 rounded focus:outline-none focus:ring focus:border-blue-500 pr-10 bg-gray-700 text-white"
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility("new")}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
          >
            {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">
          Confirm New Password:
        </label>
        <div className="relative">
          <input
            type={showPassword.confirm ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-600 rounded focus:outline-none focus:ring focus:border-blue-500 pr-10 bg-gray-700 text-white"
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility("confirm")}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
          >
            {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 flex-1"
        >
          {isLoading ? (
            <Loader2 className="animate-spin mx-auto" size={20} />
          ) : (
            "Change Password"
          )}
        </button>

        <button
          type="button"
          onClick={onComplete}
          className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-300 flex-1"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default PasswordChangeForm;
