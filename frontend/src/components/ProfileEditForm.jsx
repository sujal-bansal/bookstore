import React, { useState } from "react";
import { useUserStore } from "../store/UserStore";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import PasswordChangeForm from "./PasswordChangeForm";

function ProfileEditForm({ user, onCancel }) {
  const { updateProfile, isLoading } = useUserStore();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    bio: user?.bio || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username.trim()) {
      return toast.error("Username cannot be empty");
    }

    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      return toast.error("Please enter a valid email");
    }

    await updateProfile(formData);
    if (onCancel) onCancel();
  };

  const handlePasswordChangeComplete = () => {
    setShowPasswordForm(false);
  };

  if (showPasswordForm) {
    return <PasswordChangeForm onComplete={handlePasswordChangeComplete} />;
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Username:
          </label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-600 rounded focus:outline-none focus:ring focus:border-blue-500 bg-gray-700 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Email:
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-600 rounded focus:outline-none focus:ring focus:border-blue-500 bg-gray-700 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Bio:
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full px-3 py-2 border border-gray-600 rounded focus:outline-none focus:ring focus:border-blue-500 bg-gray-700 text-white"
            rows="4"
          />
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
              "Save Changes"
            )}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-300 flex-1"
          >
            Cancel
          </button>
        </div>
      </form>

      <div className="border-t border-gray-700 pt-4">
        <button
          type="button"
          onClick={() => setShowPasswordForm(true)}
          className="text-blue-400 hover:text-blue-300 hover:underline flex items-center justify-center w-full py-2"
        >
          Change Password
        </button>
      </div>
    </div>
  );
}

export default ProfileEditForm;
