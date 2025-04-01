import ImageCard from "@/components/ImageCard";

const imagesList = {
    "/gallery/ParkDesignBigLabels.webp": "caption 1",
    "/gallery/SculptureParkVF.webp": "caption 2",
    "/gallery/BambooForest.webp": "caption 3",
    "/gallery/MeditativePond.webp": "caption 4",
    "/gallery/SocialKitchen.webp": "caption 5"
};

const info = `Envision a vibrant health-promoting park for the residents in Bedok North and patients of the future Eastern General Hospital where social connections, active lifestyles, healing spaces and quiet retreats come together to foster a healthier community. 

At its heart is the Wellness Ring, an interactive social space that integrates diverse activity zones such as an arts zone, an outdoor kitchen and sensory gardens.`;

function Images() {
  return <div>
    <div className="flex flex-col justify-center">
      {Object.entries(imagesList).map(([src, caption]) => (
        <ImageCard key={src} src={src} alt={caption} caption={caption} />
      ))}
    </div>
  </div>;
}

function Writeup() {
  return <div className="pt-4">
    <h1 className="text-center text-xl font-bold text-black mb-2">Healthy Bedok North!</h1>
    <p className="text-center text-gray-900 pt-4">{info}</p>
    <div className="flex justify-center items-center gap-4 pt-4">
      <span className="text-gray-700 font-medium">A project by</span>
      <img src="/gallery/ParkDesignBigLabels.webp" alt="SUTD Logo" className="h-8" />
      <span className="text-gray-700 font-medium">In collaboration with</span>
      <img src="/gallery/ParkDesignBigLabels.webp" alt="EGH Logo" className="h-8" />
    </div>
  </div>;
}

export default function AboutPage() {
    return <div className="flex flex-col items-center gap-4 z-10">
        <Writeup />
        <Images />
    </div>
}