"use client";

import { useState, useEffect } from "react";
import Post from "../../components/post";
import { getPosts } from '../actions';

function HomePage() {
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
      const sortedPosts = posts.sort((a, b) => new Date(b.post_date).getTime() - new Date(a.post_date).getTime());
      setPosts(sortedPosts);
      console.log(posts);
    };

    fetchPosts();
  }, []);

  return (
    <><div className="posts-container grid gap-0 sm:grid-cols-1 lg:grid-cols-1 mt-0">
          {posts.map((post, index) => (
              <Post
                  key={index}
                  title={post.post_title}
                  text={post.post_text}
                  like_count={post.like_count}
                  reply_count={post.reply_count}
                  date={new Date(post.post_date).toLocaleString()}
                  id={post.post_id}
                  author={post.author} />
          ))}
      </div><main className="flex flex-col gap-8 items-center sm:items-start mt-8">
              <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                  <li>Save and see your changes instantly. Your screen size is {screenSize.width} by {screenSize.height}!</li>
              </ol>
          </main></>
  )
}

export default function App() {
  const [isClient, setIsClient] = useState(false); // State to check if the component is rendered on the client

  useEffect(() => {
    setIsClient(true); // Set to true once the component is mounted on the client side
  }, []);

  if (!isClient) {
    // Optionally render loading screen while waiting for client-side rendering
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-5 mt-4">
      <HomePage />
    </div>
  );
}
