"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter } from 'next/navigation'

function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center p-8 z-0">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Healthy Bedok North!</h1>
      <p className="text-lg text-gray-600 mb-6">Improving health of residents and patients</p>
      <div className="grid grid-cols-1 gap-4 mb-6">
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/calendar")}
          className="p-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition"
        >
          Go to Calendar
        </button>
        <button
          onClick={() => router.push("/feed")}
          className="p-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition"
        >
          Go to Feed
        </button>
        <button
          onClick={() => router.push("/about")}
          className="p-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition"
        >
          Learn More
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="landing-content flex flex-col items-center gap-5 overflow-hidden text-center"
      style={{
      backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4)), url(/gallery/WetlandsBlur.webp)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      flexGrow: 1,
      }}
    >
      <LandingPage />
    </div>
  );
}
