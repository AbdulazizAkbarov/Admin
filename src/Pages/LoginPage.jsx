import { LoadingOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import useMyStore from "../Store/my-store";

function LoginPage() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex justify-center mx-auto items-center h-full w-96">
      <Card>
        <Form
        layout="vertical"
        initialValues={{
          username:"lib2",
          password:"lib22"

        }}
        onFinish={(values) => {
            setLoading(false);

            axios
              .post("https://library.softly.uz/auth/signin", values)
              .then((res) => {
                setLoading(false);
                console.log(res);
                useMyStore.setState({
                  token: res.data.token,
                  user: res.data.user,
                });

                localStorage.setItem("auth",JSON.stringify(res.data))
                message.success("uraa");
              })
              .catch((e) => {
                setLoading(false);
                message.success("error");
              });
          }}
        >
          <Form.Item
            style={{
              display: "flex",
            }}
            label="Login"
            name={"username"}
            rules={[{ required: true, message: "Login Yozing" }]}
          >
            <Input
              size="large"
              placeholder="large size"
              prefix={<UserOutlined />}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name={"password"}
            rules={[{ required: true, message: "Login Yozing" }]}
          >
            <Input.Password
              className="mt-2"
              size="large"
              placeholder="large size"
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="mt-3"
              onClick={() => {}}
            >
              Kirish {loading && <LoadingOutlined />}{" "}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default LoginPage;
