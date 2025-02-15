import React from "react";
import Sidebar from "react-sidebar";
import Header from "./header";
import { Link } from "react-router-dom";

interface SideMenuState {
  sidebarOpen: boolean;
}

class SideMenu extends React.Component<{}, SideMenuState> {
  constructor(props: any) {
    super(props);
    this.state = {
      sidebarOpen: true
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open: boolean) {
    this.setState({ sidebarOpen: open });
  }

  render() {
    return (
      <Sidebar
        sidebar={
          <div>
            <b>Sidebar content</b>
            <ul>
            </ul>
          </div>
        }
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "green" } }}
      >
        <Header toggleSidebar={() => this.onSetSidebarOpen(!this.state.sidebarOpen)} />
      </Sidebar>
    );
  }
}

export default SideMenu;
