"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const ImageGrid = dynamic(() => import("../components/ImageGrid"));

function LandingPage() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="flex flex-col items-center p-8 z-0">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Healthy Bedok North!</h1>
      <p className="text-lg text-gray-700 mb-6">Improving health of residents and patients</p>
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
      <div className="mb-6">
        <button
          onClick={() => setShowMore((prev) => !prev)}
          className="p-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition"
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
        <div className={`transition-opacity duration-300 ${showMore ? "opacity-100" : "opacity-0 hidden"}`}>
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
      className="flex flex-col items-center min-h-screen p-8 pb-20 gap-5"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4)), url(/gallery/250221_wetlands_v1.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <LandingPage />
    </div>
  );
}
