"use client";

import { useState, useEffect } from "react";
import Create from "./create/page";
import SideMenu from "./components/sidebar";
import HomePg from "./pages/HomePg";
import PostThreadPg from "./posts/PostPg";
import { useRouter, usePathname } from "next/navigation";

export default function App() {
  const [isClient, setIsClient] = useState(false); // State to check if the component is rendered on the client
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true); // Set to true once the component is mounted on the client side
  }, []);

  if (!isClient) {
    // Optionally render loading screen while waiting for client-side rendering
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-5 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <SideMenu />
      {pathname === "/create" && <Create />}
      {pathname === "/" && <HomePg />}
      {pathname.startsWith("/post/") && <PostThreadPg />}
    </div>
  );
}
