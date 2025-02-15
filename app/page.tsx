"use client";

import { useState, useEffect } from "react";
import { getPosts } from './actions';
import Create from "./create";
import SideMenu from "./sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState<Record<string, any>[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      setPosts(posts);
      console.log(posts);
    };

    fetchPosts();
  }, []);

  return (
    <BrowserRouter>
      <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-5 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <SideMenu></SideMenu>
        <Routes>
          <Route path="/tester" element={<Create />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}