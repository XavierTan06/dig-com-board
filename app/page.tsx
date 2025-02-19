"use client";

import { useState, useEffect } from "react";
import Create from "./create/page";
import SideMenu from "./components/sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import HomePg from "./pages/HomePg";

export default function App() {
  const [isSideOpen, setIsSideOpen] = useState(false); // State to check if the sidebar is open
  const [isClient, setIsClient] = useState(false); // State to check if the component is rendered on the client
  const onSetSidebarOpen = (open: boolean) => {
    setIsSideOpen(open);
    alert("Sidebar is now " + (open ? "open" : "closed"));
};
  useEffect(() => {
    setIsClient(true); // Set to true once the component is mounted on the client side
  }, []);

  if (!isClient) {
    // Optionally render loading screen while waiting for client-side rendering
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-5 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <Header
          toggleSidebar={() => {setIsSideOpen(!isSideOpen)}}
        />
        /
        <SideMenu sidebarOpen={isSideOpen} onSetSidebarOpen={onSetSidebarOpen} />
        <Routes>
          <Route path="/create" element={<Create />} />
          <Route path="/" element={<HomePg />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
