import { useMemo } from 'react';
import Image from 'next/image';

export default function ImageGrid() {
  const memoizedContent = useMemo(() => (
    <div className="mt-4 text-white grid grid-cols-1 gap-4 justify-items-center">
      <p className="text-center">Here is some additional content that was previously hidden.</p>
      <Image
        src="/gallery/250207_Wellness Park Plan_Labeled.webp"
        alt="Image 2"
        width={240}
        height={160}
        className="object-cover rounded-lg shadow-md"
        loading="lazy"
      />
      <Image
        src="/gallery/250226_therapeutic garden_motion blur.webp"
        alt="Image 3"
        width={240}
        height={160}
        className="object-cover rounded-lg shadow-md"
        loading="lazy"
      />
    </div>
  ), []); // Memoize so it doesn't re-render on state change

  return memoizedContent;
};