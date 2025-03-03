import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AppstoreOutlined, BookOutlined, HomeFilled, MailOutlined, ReconciliationOutlined, UserAddOutlined } from "@ant-design/icons";
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
        {
          icon: <ReconciliationOutlined />,
          key: 4,
          label: <Link to={"ijaralar"}>Ijaralar</Link>,
        },
        {
          icon: <UserAddOutlined />,
          key: 5,
          label: <Link to={"user"}>Kitobxonlar</Link>,
        },
        {
          icon: <BookOutlined />,
          key: 6,
          label: <Link to={"kitoblarim"}>Kitoblarim</Link>,
        },
        {
          icon: <BookOutlined />,
          key:7,
          label: <Link to={"books"}>Kitoblar</Link>,
        }
      ]}
    />
  );
}

export default Sidebar;
