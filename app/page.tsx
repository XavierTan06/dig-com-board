"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const ImageGrid = dynamic(() => import("../components/ImageGrid"));

function LandingPage() {
  const [showMore, setShowMore] = useState(false);
  
  const toggleShowMore = useCallback(() => {
    setShowMore((prev) => !prev);
  }, []);

  return (
    <div className="flex flex-col items-center p-8 z-0">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Healthy Bedok North!</h1>
      <p className="text-lg text-gray-600 mb-6">Improving health of residents and patients</p>
      <div className="grid grid-cols-1 gap-4 mb-6">
        <Image
          src="/gallery/250226_sculpturepark.png"
          alt="Image 1"
          width={240}
          height={160}
          className="object-cover rounded-lg shadow-md"
          loading="eager"
          priority
        />
      </div>

      {/* Show More Section */}
      <div className="mb-6 justify-items-center">
        <button
          onClick={toggleShowMore}
          className=" bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition"
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
        <div className={showMore ? "block" : "hidden"}>
        <p className="text-center text-white pt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <Suspense fallback={<div>Loading images...</div>}>
            <ImageGrid />
          </Suspense>
        </div>
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
      backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4)), url(/gallery/250221_wetlands_v1.png)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      flexGrow: 1,
      }}
    >
      <LandingPage />
    </div>
  );
}
