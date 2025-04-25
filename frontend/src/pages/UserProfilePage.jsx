import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUserStore } from "../store/UserStore";
import { Loader2 } from "lucide-react";

function UserProfilePage() {
  const { userId } = useParams();
  const { user, getUserProfile, isLoading } = useUserStore();

  useEffect(() => {
    if (userId) {
      getUserProfile(userId);
    }
  }, [userId, getUserProfile]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <Loader2 className="animate-spin text-blue-400" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-8">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow space-y-4 border border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-100 mb-4 text-center">
          User Profile
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-400">
            Username:
          </label>
          <p className="text-gray-200 font-medium">{user?.username}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">
            Bio:
          </label>
          <p className="text-gray-200 font-medium">
            {user?.Bio || "No bio available"}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">
            Member Since:
          </label>
          <p className="text-gray-200 font-medium">
            {new Date(user?.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
