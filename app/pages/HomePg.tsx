"use client";

import { useState, useEffect } from "react";
import Post from "../components/post";
import { getPosts } from '../actions';

export default function HomePg() {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [posts, setPosts] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize(); // Set initial size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      setPosts(posts);
      console.log(posts);
    };

    fetchPosts();
  }, []);

  return (
    <><div className="posts-container grid gap-8 sm:grid-cols-1 lg:grid-cols-1 mt-8">
          {posts.map((post, index) => (
              <Post
                  key={index}
                  title={post.post_title}
                  text={post.post_text}
                  like_count={post.like_count}
                  reply_count={post.reply_count}
                  date={post.date}
                  id={post.post_id} />
          ))}
      </div><main className="flex flex-col gap-8 items-center sm:items-start mt-8">
              <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                  <li>Save and see your changes instantly. Your screen size is {screenSize.width} by {screenSize.height}!</li>
              </ol>
          </main></>
  )
}