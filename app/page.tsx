"use client";

import { useState, useEffect } from "react";

function LandingPage() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Project Title</h1>
  
        {/* Subheader */}
        <p className="text-lg text-gray-600 mb-6">A short description of the project.</p>
  
        {/* Image Container */}
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
          <img src="/placeholder1.jpg" alt="Image 1" className="w-32 h-32 object-cover rounded-lg shadow-md" />
          <img src="/placeholder2.jpg" alt="Image 2" className="w-32 h-32 object-cover rounded-lg shadow-md" />
          <img src="/placeholder3.jpg" alt="Image 3" className="w-32 h-32 object-cover rounded-lg shadow-md" />
        </div>
      </div>
    );
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
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-5 font-[family-name:var(--font-geist-sans)]">
    <LandingPage />
    </div>
  );
}
