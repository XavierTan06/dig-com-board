import { useMemo } from 'react';
import Image from 'next/image';

export default function ImageGrid() {
  const memoizedContent = useMemo(() => (
    <div className="text-white flex overflow-x-auto space-x-4 pt-4">
      <Image
        src="/gallery/250207_Wellness Park Plan_Labeled.webp"
        alt="Image 2"
        width={240}
        height={160}
        className="object-cover rounded-lg shadow-md flex-shrink-0"
        loading="lazy"
      />
      <Image
        src="/gallery/250226_therapeutic garden_motion blur.webp"
        alt="Image 3"
        width={240}
        height={160}
        className="object-cover rounded-lg shadow-md flex-shrink-0"
        loading="lazy"
      />
    </div>
  ), []); // Memoize so it doesn't re-render on state change

  return memoizedContent;
};