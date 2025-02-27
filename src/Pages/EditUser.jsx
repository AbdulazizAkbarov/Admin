import { Button, Drawer, Form, Input, InputNumber, Radio, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import useMyStore from "../Store/my-store";

function EditUser({ refresh, setOpen, open, user }) {
  const [loading, SetLoading] = useState(false);

  const state = useMyStore();

  return (
    <div>
      <Drawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        destroyOnClose
      >
        <Form
          layout="vertical"
          initialValues={user}
          onFinish={(value) => {
            SetLoading(true);
            axios
              .post(
                "https://library.softly.uz/api/users",
                { ...value, phone: value.phone.toString() },
                {
                  headers: {
                    Authorization: `Bearer ${state.token}`,
                  },
                }
              )
              .then((res) => {
                setOpen(false);
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
