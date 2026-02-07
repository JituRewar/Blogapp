import React from "react";
import appwriteService from "../appwrite/config";

function PostCard({ title, featuredimage }) {
  const imageUrl = featuredimage
    ? appwriteService.getFilePreview(featuredimage)
    : "/placeholder.png";

  return (
    <div className="w-full bg-gray-800 rounded-lg overflow-hidden">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.currentTarget.src = "/placeholder.png";
        }}
      />
      <h2 className="p-3 text-white font-semibold">{title}</h2>
    </div>
  );
}

export default PostCard;
