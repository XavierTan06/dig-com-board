import { useMemo } from 'react';
import Image from 'next/image';

const images = [
  "/gallery/ParkDesignBigLabels.webp",
  "/gallery/SculptureParkVF.webp",
  "/gallery/BambooForest.webp",
  "/gallery/MeditativePond.webp",
  "/gallery/SocialKitchen.webp"
];

export default function ImageGrid() {
  const memoizedContent = useMemo(() => (
    <div className="text-white flex overflow-x-auto space-x-4 pt-4">
      {images.map((src, index) => (
      <Image
        key={index}
        src={src}
        alt={`Image ${index + 1}`}
        width={240}
        height={160}
        className="object-cover rounded-lg shadow-md flex-shrink-0"
        loading="lazy"
      />
      ))}
    </div>
  ), []); // Memoize so it doesn't re-render on state change

  return memoizedContent;
};