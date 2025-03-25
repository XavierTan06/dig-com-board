"use client";

import React, { useState, useEffect, useMemo } from "react";
import { FaThumbsUp, FaComment } from "react-icons/fa";
import { incrementLike } from "../app/actions";

interface PostProps {
  title: string;
  text: string;
  like_count: number;
  reply_count: number;
  date: string;
  id: string;
  author: string;
}

const Post: React.FC<PostProps> = ({
  title,
  text,
  like_count,
  reply_count,
  date,
  id,
  author,
}) => {
  const [likes, setLikes] = useState(like_count);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isDisabledOnPage, setIsDisabledOnPage] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Track mount status

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true); // Set to true after the component mounts
      setIsDisabledOnPage(window.location.pathname === `/post/${id}`);
    }
  }, [id]);

  const handleLikeClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    if (isButtonDisabled) return;
    setLikes(likes + 1);
    setIsButtonDisabled(true);
    await incrementLike(id);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 10000);
  };

  const handleClick = (id: string) => {
    if (isDisabledOnPage) return;
    window.location.href = `/post/${id}`;
    alert("Redirecting to post page...");
  };

  return (
    <div
      className="p-0 rounded-lg mb-1 border-5 md:p-6 lg:p-8 cursor-pointer z-40 pl-1"
      onClick={() => handleClick(id)}
      style={{
        cursor: isDisabledOnPage ? "default" : "pointer",
        borderColor: "#df8f28",
        borderWidth: "1px",
        backgroundColor: "white",
      }}
    >
      <p className="text-blue-400 italic">{author}</p>
      <h2 className="text-blue-600 text-xl font-semibold md:text-2xl lg:text-3xl">
        {title}
      </h2>

      {/* Only apply dangerouslySetInnerHTML after mount */}
      {isMounted && (
        <p
          className="text-blue-500 mt-2 md:mt-4 lg:mt-6"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      )}

      <div className="flex items-center mt-3 md:mt-4 lg:mt-6">
        <div className="flex items-center text-blue-500 mr-6">
          <FaThumbsUp
            className={`mr-2 cursor-pointer ${
              isButtonDisabled ? "opacity-50" : ""
            } z-50`}
            onClick={handleLikeClick}
          />
          {likes}
        </div>
        <div className="flex items-center text-blue-500">
          <FaComment className="mr-2" /> {reply_count}
        </div>
      </div>
      {isMounted && (
        <small className="text-blue-400 mt-2 block md:mt-4 lg:mt-6">
          {date}
        </small>
      )}
    </div>
  );
};

export default Post;
