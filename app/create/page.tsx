"use client";
import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { create } from '../actions';

export default function Create() {
  const [postTitle, setPostTitle] = useState('');
  const [postText, setPostText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    if (!postText){
      alert('Please fill in all fields!');
      return;
    }
    e.preventDefault();
    const formData = new FormData();
    formData.append('post_title', postTitle);
    formData.append('post_text', postText);
    await create(formData);
    setPostTitle('');
    setPostText('');
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ]
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-5 sm:p-20 font-[family-name:var(--font-geist-sans)]">
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
          <ReactQuill
            theme="snow"
            value={postText}
            onChange={setPostText}
            modules={modules}
            formats={formats}
            placeholder='Write your post content here'
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}