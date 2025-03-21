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
          <b>Healthy Bedok North</b>
          <ul>
            <li>
              <Link href="/">About</Link>
            </li>
            <li>
              <Link href="/feed">Home</Link>
            </li>
            <li>
              <Link href="/create">Create</Link>
            </li>
            <li>
              <Link href="/calendar">Calendar</Link>
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
