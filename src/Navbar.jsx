import {
  LeftCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown } from "antd";
import React, { useState } from "react";
import useMyStore from "./Store/my-store";

function Navbar({ collapsed, setCollapsed }) {
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const state = useMyStore();
  return (
    <nav className="bg-slate-800 text-white flex  items-center justify-between px-8 py-2 text-xl ">
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

      <Dropdown
        menu={{
          items: [
            {
              key: 1,
              label: "Sozlamalar",
              icon: <LeftCircleOutlined />,
            },
            {
              key: 2,
              label: "Profilm",
              icon: <LeftCircleOutlined />,
            },
            {
              key: 3,
              label: "Chiqish",
              danger:true,
              icon: <LeftCircleOutlined />,
              onClick: () => {
                localStorage.clear()
                useMyStore.setState({
                  token: "",
                  user: null,
                });
              },
            },
          ],
        }}
      >
        <div>
          <div className="flex items-center gap-3 text-sm">
            <Avatar size="large" icon={<UserOutlined />} />
            <div>
              {state.user.firstName} {state.user.lastName}
            </div>
          </div>
          <div>@{state.user.username}</div>
        </div>
      </Dropdown>
    </nav>
  );
}

export default Navbar;
