"use client";

import { useContext, useState } from "react";
import { NicknameContext } from "@/context/context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function LandingPage() {
  const router = useRouter();
  const [showMore, setShowMore] = useState(false); // State to toggle "Show More" content

  return (
    <div className="flex flex-col items-center bg-gray-100 p-8 z-0">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Healthy Bedok North!</h1>
      <p className="text-lg text-gray-600 mb-6">Improving health of residents and patients</p>
      {/* Image Container - will need modification eventually when pics furnished */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        <img src="/250221_wetlands_v1.png" alt="Image 1" className="w-60 h-40 object-cover rounded-lg shadow-md" />
        <img src="/250226_sculpturepark.png" alt="Image 2" className="w-60 h-40 object-cover rounded-lg shadow-md" />
      </div>

      {/* Show More Section */}
      <div className="mb-6">
        <button
          onClick={() => setShowMore(!showMore)}
          className="p-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition"
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
        {showMore && (
          <div className="mt-4 text-gray-700">
            <p>Here is some additional content that was previously hidden.</p>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
{/*       <div className="flex gap-4">
        <button
          onClick={() => router.push("/calendar")}
          className="p-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition"
        >
          Go to Calendar
        </button>
        <button
          onClick={() => router.push("/dashboard")}
          className="p-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition"
        >
          Go to Dashboard
        </button>
        <button
          onClick={() => router.push("/about")}
          className="p-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition"
        >
          About the Project
        </button>
      </div> */}
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
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-5">
      <LandingPage />
    </div>
  );
}
