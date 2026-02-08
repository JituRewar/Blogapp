import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

function PostCard({ title, featuredimage, id }) {
  const imageUrl = featuredimage
    ? appwriteService.getFileView(featuredimage)
    : "/placeholder.png";

  return (
    <Link to={`/post/${id}`}>
      <div className="w-full bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
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
    </Link>
  );
}

export default PostCard;
