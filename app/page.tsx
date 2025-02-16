"use client";

import { useState, useEffect } from "react";
import Post from "./components/post";
import Header from "./components/header";
import { getPosts } from './actions';
import Create from "./pages/create";
import SideMenu from "./components/sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePg from "./pages/HomePg";

export default function App() {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [posts, setPosts] = useState<Record<string, any>[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isClient, setIsClient] = useState(false); // State to check if the component is rendered on the client

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    console.log(isSidebarOpen);
  };

  useEffect(() => {
    setIsClient(true); // Set to true once the component is mounted on the client side
  }, []);

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

  if (!isClient) {
    // Optionally render loading screen while waiting for client-side rendering
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-5 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <SideMenu />
        <Routes>
          <Route path="/tester" element={<Create />} />
          <Route path="/" element={<HomePg />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
