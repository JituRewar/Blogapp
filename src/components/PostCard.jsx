import React from "react";
import appwriteService from "../appwrite/config";

function PostCard({ title, featuredimage }) {
  const imageUrl = featuredimage
    ? appwriteService.getFileView(featuredimage)
    : "/placeholder.png";

  return (
    <div className="w-full bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.currentTarget.src = "/placeholder.png";
        }}
      />
      <h2 className="p-4 text-gray-900 font-semibold text-lg">
        {title}
      </h2>
    </div>
  );
}

export default PostCard;
