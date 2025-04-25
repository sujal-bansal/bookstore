import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/UserStore";
import ProfileEditForm from "../components/ProfileEditForm";
import { Loader2 } from "lucide-react";

function ProfilePage() {
  const { user, getProfile, isLoading } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <Loader2 className="animate-spin text-blue-400" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow space-y-4 border border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-100 mb-4 text-center">
          My Profile
        </h2>

        {isEditing ? (
          <ProfileEditForm
            user={user || ""}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-400">
                Username:
              </label>
              <p className="text-gray-200 font-medium">{user?.username}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">
                Email:
              </label>
              <p className="text-gray-200 font-medium">{user?.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">
                Bio:
              </label>
              <p className="text-gray-200 font-medium">
                {user?.bio || "No bio available"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">
                Created At:
              </label>
              <p className="text-gray-200 font-medium">
                {new Date(user?.createdAt).toLocaleDateString()}
              </p>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300 mt-4"
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
