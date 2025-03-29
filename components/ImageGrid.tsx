import { useMemo } from 'react';
import Image from 'next/image';

const images = [
  "/gallery/Wellness Park Design - With big labels-14.webp",
  "/gallery/250324_Sculpture Park_VF.webp",
  "/gallery/250326_Bamboo Forest Final.webp",
  "/gallery/250326_Meditative Pond.webp",
  "/gallery/Social Kitchen.webp"
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