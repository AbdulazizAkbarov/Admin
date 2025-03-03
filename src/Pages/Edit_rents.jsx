import { Button, Drawer, Form, Input, InputNumber, Radio, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import useMyStore from "../Store/my-store";

function Edit_rents({ refresh, setOpen, open, user }) {
  const [loading, SetLoading] = useState(false);

  const state = useMyStore();

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
            axios
              .put(
                `api/rents/${user.id}`,
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
         <Form.Item>
            
         </Form.Item>

          <Button loading={loading} type="primary" htmlType="submit">
            {loading ? "Saqlanmoqda " : "Saqlash"}
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}

export default Edit_rents;
