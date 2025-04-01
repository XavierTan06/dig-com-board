import ImageCard from "@/components/ImageCard";

const imagesList = {
    "/gallery/ParkDesignBigLabels.webp": "caption 1",
    "/gallery/SculptureParkVF.webp": "caption 2",
    "/gallery/BambooForest.webp": "caption 3",
    "/gallery/MeditativePond.webp": "caption 4",
    "/gallery/SocialKitchen.webp": "caption 5"
};

function Images() {
  return <div>
    <h1 className="text-center text-4xl font-bold text-black mb-2">Images</h1>
    <div className="flex flex-col justify-center">
      {Object.entries(imagesList).map(([src, caption]) => (
        <ImageCard key={src} src={src} alt={caption} caption={caption} />
      ))}
    </div>
  </div>;
}

function Writeup() {
  return <div className="pt-4">
    <h1 className="text-center text-4xl font-bold text-black mb-2">About Our Project</h1>
    <p className="text-center text-gray-900 pt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </div>;
}

export default function AboutPage() {
    return <div className="flex flex-col items-center gap-4 z-10">
        <Writeup />
        <Images />
    </div>
}