import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AppstoreOutlined, HomeFilled, MailOutlined } from "@ant-design/icons";
import { Button, Menu } from "antd";
function Sidebar({ collapsed }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Menu
      defaultSelectedKeys={[location.pathname]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      theme="dark"
      style={{
        maxWidth: "200px",
      }}
      inlineCollapsed={collapsed}
      items={[
        {
          icon: <HomeFilled />,
          key: 1,
          label: <Link to={"/"}>Home</Link>,
        },
        {
          icon: <MailOutlined />,
          key: 2,
          label: "Mahsulotlar",
          onClick: () => {
            navigate("/product");
          },
        },

        {
          icon: <AppstoreOutlined />,
          key: 3,
          label: <Link to={"catigories"}>Katigoriya</Link>,
        },
      ]}
    />
  );
}

export default Sidebar;
