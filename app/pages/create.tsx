import React, { useState } from 'react';
import { create } from '../actions';

export default function Create() {
  const [postTitle, setPostTitle] = useState('');
  const [postText, setPostText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('post_title', postTitle);
    formData.append('post_text', postText);
    await create(formData);
    setPostTitle('');
    setPostText('');
  };

  return (
    <div>
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
          <label htmlFor="post_text">Text:</label>
          <textarea
            id="post_text"
            name="post_text"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}