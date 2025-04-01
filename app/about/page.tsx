import ImageCard from "@/components/ImageCard";

function Images() {
  return <div>
    <h1 className="text-4xl font-bold text-black mb-2">Images</h1>
    <div className="flex flex-wrap justify-center">
      <ImageCard src="/gallery/250207_Wellness Park Plan_Labeled.webp" alt="Image 1" caption="Lorem ipsum dolor sit amet" />
      <ImageCard src="/images/image2.jpg" alt="Image 2" caption="Image 2" />
      <ImageCard src="/images/image3.jpg" alt="Image 3" caption="Image 3" />
      <ImageCard src="/images/image4.jpg" alt="Image 4" caption="Image 4" />
    </div>
  </div>;
}

function Writeup() {
  return <div>
    <h1 className="text-4xl font-bold text-black mb-2">About Our Project</h1>
    <p className="text-center text-gray-900 pt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </div>;
}

export default function AboutPage() {
    return <div className="flex flex-col items-center">
        <Writeup />
        <Images />
    </div>
}