"use client";

import { useStore } from "@/store";
import { FeedItemProps } from "@/types";
import { useState, useEffect } from "react";
import { BsFillHeartFill, BsFillChatFill } from "react-icons/bs";
import UserAvatar from "./UserAvatar";

const FeedItem = ({
  id,
  userId,
  content,
  createdAt,
  likesCount,
  commentsCount,
  user: feedUser,
}: FeedItemProps) => {
  const { supabaseUrl } = useStore();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Implement logic to check if the current user has liked the post
    // Use the useStore hook to fetch data from Supabase and determine if the post is liked by the user.
    // Update the setIsLiked state accordingly.
  }, []);

  const handleLike = () => {
    // Implement logic to like or unlike the post
    // Use the useStore hook to send a request to Supabase to update the likes count and user likes.
    // Update the setIsLiked state accordingly.
  };

  const handleComment = () => {
    // Implement logic to navigate to the comment section
    // Use the useStore hook or a custom routing function to navigate to the comment section of the post.
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <div className="flex items-center gap-3 mb-2">
        <UserAvatar user={feedUser} />
        <div>
          <p className="font-medium">{feedUser.name}</p>
          <p className="text-gray-500 text-sm">{createdAt}</p>
        </div>
      </div>
      <p>{content}</p>
      <div className="flex items-center gap-4 mt-2">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors duration-200 ${
            isLiked ? "text-red-500" : ""
          }`}
        >
          {isLiked ? (
            <BsFillHeartFill className="h-5 w-5" />
          ) : (
            <BsFillHeartFill className="h-5 w-5" />
          )}
          <span>{likesCount}</span>
        </button>
        <button
          onClick={handleComment}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <BsFillChatFill className="h-5 w-5" />
          <span>{commentsCount}</span>
        </button>
      </div>
    </div>
  );
};

export default FeedItem;