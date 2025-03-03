import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useMyStore from "../Store/my-store";
import dayjs from "dayjs";
import api from "./Axios";

function Ijaralar_qoshish({ setClose, open, setOpen }) {
  const [loading, SetLoading] = useState(false);
  const [rent, setRents] = useState([]);
  const [books, setBooks] = useState([]);
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

  // const state = useMyStore();

  useEffect(() => {
    api
      .get(`api/rents`, {
   
      })
      .then((res) => {
        setRents(res.data.items);
        const ids = res.data.items.map((i) => {
          return i.stock.bookId;
        });

        api
          .get("api/books", {
            params: {
              id: ids,
            },
        
          })
          .then((res) => {
            setBooks(res.data.items);
          });
      });
  }, []);

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Qoshish
      </Button>

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
              .post(
                `api/stocks`,
                { ...value },
                {
                 
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
          <Form.Item label="Kitobxonlar " name={"bookId"}>
            <Select
              showSearch
              placeholder="Kitobxonlar"
              options={rent.map((item) => {
                return { value: item.id, label: item.user.firstName };
              })}
            />
          </Form.Item>

          <Form.Item label={"Kitob qoshish"} name={"ids"}>
            <Select
              showSearch
              placeholder="Kitob Qoshish"
              options={books.map((item) => {
                return { value: item.id, label: item.name };
              })}
            />
          </Form.Item>

          <div className="flex gap-2">
            <Form.Item label="olish ">
              <DatePicker
                defaultValue={dayjs("01/01/2015", dateFormatList[0])}
                format={dateFormatList}
              />
            </Form.Item>

            <Form.Item label="topshirish ">
              <DatePicker
                defaultValue={dayjs("01/01/2015", dateFormatList[0])}
                format={dateFormatList}
              />
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

export default Ijaralar_qoshish;
