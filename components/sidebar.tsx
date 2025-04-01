import React, { useState } from "react";
import Sidebar from "react-sidebar";
import Header from "./header";
import Link from "next/link";

const SideMenu: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const onSetSidebarOpen = (open: boolean) => {
    setSidebarOpen(open);
  };

  return (
    <Sidebar
      sidebar={
        <div>
          <Link href="/">
            <b>Healthy Bedok North</b>
          </Link>
          <ul>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/feed">Feed</Link>
            </li>
            <li>
              <Link href="/create">Create Post</Link>
            </li>
            <li>
              <Link href="/calendar">Events</Link>
            </li>
          </ul>
        </div>
      }
      open={sidebarOpen}
      onSetOpen={onSetSidebarOpen}
      styles={{
        sidebar: {
          background: "#df8f28",
          color: "white",
          zIndex: "70",
          position: "fixed", // Added to make the sidebar fixed
        },
        overlay: { zIndex: "60" },
      }}
    >
      <Header toggleSidebar={() => onSetSidebarOpen(!sidebarOpen)} />
      {/* The Outlet renders the nested routes like Home or Create */}
    </Sidebar>
  );
};

export default SideMenu;
