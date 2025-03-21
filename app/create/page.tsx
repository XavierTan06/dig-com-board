"use client";
import React, { useState } from "react";
import { create } from "../actions";
import dynamic from "next/dynamic";
import { NicknameContext } from "@/context/context";
import { useContext } from "react";

// Dynamically import QuillForm with ssr: false to disable SSR for this component
const QuillForm = dynamic(() => import("@/components/quillform"), {
  ssr: false,
});

export default function Create() {
  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");
  const nicknameContext = useContext(NicknameContext);
  const [nickname, setNickname] = useState(nicknameContext?.nickname || "");
  console.log(nicknameContext);
  console.log(nickname);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim() || !nickname.trim()) {
      alert("Please fill in all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("post_title", postTitle);
    formData.append("post_text", postText);
    const postID = await create(formData, nickname);

    if (nicknameContext) {
      nicknameContext.setNickname(nickname);
    }

    setPostTitle("");
    setPostText("");
    window.location.href = `/post/${postID}`;
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-5 sm:p-20 mt-4">
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="post_title">Title:</label>
          <input
            type="text"
            id="post_title"
            name="post_title"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="nickname">Nickname:</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder={nicknameContext?.nickname || "Anonymous"}
            required
          />
        </div>
        <div>
          <label htmlFor="post_text">Text:</label>
          <QuillForm value={postText} onChange={setPostText} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
