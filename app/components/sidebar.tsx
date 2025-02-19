import React, { useState } from "react";
import Sidebar from "react-sidebar";
import Header from "./header";
import { Link, Outlet } from "react-router-dom";

interface SideBarProps {
  sidebarOpen: boolean;
  onSetSidebarOpen: (open: boolean) => void;
}

const SideMenu: React.FC<SideBarProps> = ({ sidebarOpen, onSetSidebarOpen }) => {
  return (
    <Sidebar
      sidebar={
        <div>
          <b>Sidebar content</b>
          <ul>
            <li>
              <Link to="/create">Create</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </div>
      }
      open={sidebarOpen}
      onSetOpen={onSetSidebarOpen}
      styles={{ sidebar: { background: "green" } }}
    >
      {/* The Outlet renders the nested routes like Home or Create */}
      <div>
        <Outlet />
      </div>
    </Sidebar>
  );
};

export default SideMenu;
