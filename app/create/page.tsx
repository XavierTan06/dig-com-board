"use client";
import React, { useState } from "react";
import { create } from "../actions";
import dynamic from "next/dynamic";
import { NicknameContext } from "@/context/context";
import { useContext } from "react";
import NameModal from "@/components/Modal";

// Dynamically import QuillForm with ssr: false to disable SSR for this component
const QuillForm = dynamic(() => import('@/components/quillform'), { ssr: false });

export default function Create() {
  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");
  const nicknameContext = useContext(NicknameContext);
  const [showModal, setShowModal] = useState(false);
  const [nickname, setNickname] = useState(nicknameContext?.nickname || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim()) {
      alert("Please fill in all fields!");
      return;
    }
    if (!nickname.trim()) {
      setShowModal(true);
      return;
    }

    const formData = new FormData();
    formData.append("post_title", postTitle);
    formData.append("post_text", postText);
    const postID = await create(formData, nickname);
    setPostTitle("");
    setPostText("");
    window.location.href = `/post/${postID}`;
    
  };

  const handleModalSubmit = () => {
    setShowModal(false);
    if (nicknameContext) {
      nicknameContext.setNickname(nickname);
    }
    handleSubmit(new Event("submit") as unknown as React.FormEvent);
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
        {/* Render QuillForm, but it will now only render on the client */}
        <div>
          <label htmlFor="post_text">Text:</label>
          <QuillForm value={postText} onChange={setPostText} />
        </div>
        <button type="submit">Submit</button>
      </form>
      {showModal && (
        <NameModal onClose={() => setShowModal(false)}>
          <h2>Enter your Nickname</h2>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Anonymous"
          />
          <button onClick={handleModalSubmit}>Submit</button>
          <button onClick={() => setShowModal(false)}>Close</button>
        </NameModal>
      )}
    </div>
  );
}
