import React, { useState } from "react";

function EnhancedReviewComparison({
  originalReview,
  enhancedReview,
  onChooseOriginal,
  onChooseEnhanced,
  onCancel,
}) {
  const [editedOriginal, setEditedOriginal] = useState(originalReview);
  const [editedEnhanced, setEditedEnhanced] = useState(enhancedReview);
  const [activeTab, setActiveTab] = useState("compare");

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-white mb-2">
          Choose Your Review Version
        </h4>
        <p className="text-gray-400 text-sm">
          Compare your original review with the AI-enhanced version, or edit
          either before submitting.
        </p>
      </div>

      <div className="flex border-b border-gray-700 mb-4">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "compare"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400 hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("compare")}
        >
          Compare
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "original"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400 hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("original")}
        >
          Original
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "enhanced"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400 hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("enhanced")}
        >
          Enhanced
        </button>
      </div>
      {activeTab === "compare" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-700 rounded p-3">
            <h5 className="font-medium text-white mb-2">
              Your Original Review
            </h5>
            <p className="text-gray-300 text-sm whitespace-pre-wrap">
              {originalReview}
            </p>
          </div>
          <div className="border border-gray-700 rounded p-3 bg-gray-750">
            <h5 className="font-medium text-white mb-2">AI-Enhanced Review</h5>
            <p className="text-gray-300 text-sm whitespace-pre-wrap">
              {enhancedReview}
            </p>
          </div>
        </div>
      )}

      {activeTab === "original" && (
        <div className="mb-4">
          <h5 className="font-medium text-white mb-2">
            Edit Your Original Review
          </h5>
          <textarea
            className="w-full border border-gray-600 rounded p-2 mb-2 bg-gray-700 text-white"
            rows="5"
            value={editedOriginal}
            onChange={(e) => setEditedOriginal(e.target.value)}
          ></textarea>
        </div>
      )}

      {activeTab === "enhanced" && (
        <div className="mb-4">
          <h5 className="font-medium text-white mb-2">Edit Enhanced Review</h5>
          <textarea
            className="w-full border border-gray-600 rounded p-2 mb-2 bg-gray-700 text-white"
            rows="5"
            value={editedEnhanced}
            onChange={(e) => setEditedEnhanced(e.target.value)}
          ></textarea>
        </div>
      )}

      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={onCancel}
          className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Cancel
        </button>

        {activeTab === "original" || activeTab === "compare" ? (
          <button
            onClick={() => onChooseOriginal(editedOriginal)}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Use Original
          </button>
        ) : null}

        {activeTab === "enhanced" || activeTab === "compare" ? (
          <button
            onClick={() => onChooseEnhanced(editedEnhanced)}
            className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Use Enhanced
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default EnhancedReviewComparison;
