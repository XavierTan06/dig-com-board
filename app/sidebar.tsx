import React, { useState } from "react";
import Sidebar from "react-sidebar";
import Header from "./header";
import { Link, Outlet } from "react-router-dom";

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
          </ul>
        </div>
      }
      open={sidebarOpen}
      onSetOpen={onSetSidebarOpen}
      styles={{ sidebar: { background: "green" } }}
    >
      <Header toggleSidebar={() => onSetSidebarOpen(!sidebarOpen)} />
      {/* The Outlet renders the nested routes like Home or Create */}
      <div>
        <Outlet />
      </div>
    </Sidebar>
  );
};

export default SideMenu;
