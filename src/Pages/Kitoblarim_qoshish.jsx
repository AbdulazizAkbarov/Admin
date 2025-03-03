import { Button, Drawer, Form, Select, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useMyStore from "../Store/my-store";
import api from "./Axios";

function Kitoblarim_qoshish({ refresh }) {
  const [open, setOpen] = useState(false);
  const [loading, SetLoading] = useState(false);
  const [books, setBooks] = useState([]);

  const state = useMyStore();

  useEffect(() => {
    api
      .get("api/books",{
      
      })
      .then((res) => {
        setBooks(res.data.items);
        console.log(res.data.items);
      });
  }, []);
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
          onFinish={(value) => {
            SetLoading(true);
            api
              .post("/stocks", value, {
              
              })
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
          <Form.Item label="Kitoblar Qoshish " name={"bookId"}>
            <Select
              showSearch
              placeholder="Kitob Qidirish"
              options={books.map((item) => {
                return { value: item.id, label: item.name };
              })} 
            />
          </Form.Item>

          {/* <Form.Item>
            <Select
              showSearch
              placeholder="ID"
              options={books.map((item, index) => {
                return {value: item.name, label: item.id}
              })}
            />
          </Form.Item> */}

          <Button loading={loading} type="primary" htmlType="submit">
            {loading ? "Saqlanmoqda " : "Saqlash"}
          </Button>
        </Form>
      </Drawer>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Qo'shish
      </Button>
    </div>
  );
}

export default Kitoblarim_qoshish;
