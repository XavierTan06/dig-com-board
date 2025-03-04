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
          <b>Sidebar content</b>
          <ul>
            <li>
              <Link href="/create">Create</Link>
            </li>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/calendar">Calendar</Link>
            </li>
          </ul>
        </div>
      }
      open={sidebarOpen}
      onSetOpen={onSetSidebarOpen}
      styles={{ sidebar: { background: "green", zIndex: "70" }, overlay: { zIndex: "60" }}}
    >
      <Header toggleSidebar={() => onSetSidebarOpen(!sidebarOpen)} />
      {/* The Outlet renders the nested routes like Home or Create */}
      <div>
        {/* Render children components here */}
      </div>
    </Sidebar>
  );
};

export default SideMenu;
