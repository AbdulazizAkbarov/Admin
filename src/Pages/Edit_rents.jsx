import { Button, Drawer, Form, Input, InputNumber, Radio, Select, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useMyStore from "../Store/my-store";
import api from "./Axios";

function Edit_rents({ onRefresh, setOpen, open, item }) {
  const [loading, SetLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [stocks, setStocks] = useState([]);


  useEffect(() => {
    api.get(`api/users`).then((res) => {
      setUsers(res.data.items);
      console.log(res.data.items);
    });

    api
      .get("api/stocks", {
        params: {
          "filters[busy]": false,
        },
      })
      .then((res) => {
        setStocks(res.data.items);
      });
  }, []);

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
          initialValues={{
            ...item,
            leasedAt:item.leasedAt ?.slice(0,10),
            returningDate:item.returningDate ?.slice(0,10)

          }}

          onFinish={(value) => {
            SetLoading(true);
            api
              .put(`api/rents/${item.id}`, value )
              .then((res) => {
                setOpen(false);
                console.log(res.data);
                onRefresh?.();

                message.success("O'zgartirildi");
              })
              .catch((e) => {
                message.error(e.response.data.message);
                console.error(e.response.data);
              })
              .finally(() => {
                SetLoading(false);
              });
          }}
        >
          <Form.Item label="Kitobxonlar " name={"userId"}>
            <Select
              showSearch
              placeholder="Kitobxonlar"
              options={users.map((item) => {
                return { value: item.id, label: item.firstName };
              })}
            />
          </Form.Item>

          <Form.Item label={"Kitob qoshish"} name={"stockId"}>
            <Select
              showSearch
              placeholder="Kitob Qoshish"
              options={stocks.map((item) => {
                return { value: item.id, label: item.book.name };
              })}
            />
          </Form.Item>

          <div className="flex gap-2">
            <Form.Item
              label="Topshirilgan Sana "
              name={"leasedAt"}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input type="date" />
            </Form.Item>

            <Form.Item
              label="Topshirilgan Sana "
              name={"returningDate"}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input type="date"  />
            </Form.Item>
          </div>

          <Button loading={loading} type="primary" htmlType="submit">
            {loading ? "Saqlanmoqda " : "Saqlash"}
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}

export default Edit_rents;