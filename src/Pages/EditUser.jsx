import { Button, Drawer, Form, Input, InputNumber, Radio, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import useMyStore from "../Store/my-store";
import api from "./Axios";

function EditUser({ refresh, setOpen, open, user }) {
  const [loading, SetLoading] = useState(false);


  return (
    <div>
      <Drawer
        open={open ? true : false}
        onClose={() => {
          setOpen(null);
        }}
        destroyOnClose
      >
        <Form
          layout="vertical"
          initialValues={user}
          onFinish={(value) => {
            SetLoading(true);
            api
              .put(
                `api/users/${user.id}`,
                { ...value, phone: value.phone.toString() },
                {
              
                }
              )
              .then((res) => {
                setOpen(null);
                console.log(res.data);
                message.success("Qoshildi");
                refresh?.();
              })
              .catch((e) => {
                message.error("Error");
                console.error(e);
              })
              .finally(() => {
                SetLoading(false);
              });
          }}
        >
          <Form.Item 
            label="Ism"
            name={"firstName"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Familya"
            name={"lastName"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{
              width: "100%",
            }}
            label="Telefon Raqam"
            name={"phone"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            label="Jinsi"
            name={"gender"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Radio.Group
              block
              options={[
                { label: "Erkak", value: "male" },

                { label: "Ayol", value: "female" },
              ]}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>

          <Button loading={loading} type="primary" htmlType="submit">
            {loading ? "Saqlanmoqda " : "Saqlash"}
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}

export default EditUser;
