import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";
import useMyStore from "./Store/my-store";

function Navbar({ collapsed, setCollapsed }) {

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const state =useMyStore();
  return (
    <nav className="bg-slate-800 text-white flex  justify-between px-8 py-2 text-xl ">
      <div className="flex gap-4">
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{ marginBottom: 16 }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>

        <div>Logo</div>
      </div>
      <div>{state.user.username}</div>
    </nav>
  );
}

export default Navbar;
