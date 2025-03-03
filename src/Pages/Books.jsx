import { Button, Switch, Table, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useMyStore from "../Store/my-store";
import api from "./Axios";

function Books() {
  const [malumot, setMalumot] = useState([]);
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 10;
  const state = useMyStore();

  useEffect(() => {
    setLoading(true);
    api
      .get("api/books", {
        params: {
          size: pageSize,
          page: current,
        },
     
      })
      .then((res) => {
        setMalumot(res.data.items);
        setLoading(false);
      })
      .catch((e) => {
        message.error("Xatolik yuz berdi");
        setLoading(false);
        console.error(e);
      });
  }, [current]);

  return (
    <div className="p-3 bg-gray-300">
 <div>
 <h2 className="text-2xl font-bold mb-2">Kitoblar</h2>
 </div>
      <Table
        rowKey="id"
        bordered
        columns={[
          {
            title: "id",
            dataIndex: "id",
          },
          {
            title: "Nomi",
            dataIndex: "name",
          },
          {
            title: "Tili",
            dataIndex: "language",
          },
          {
            title: "Berildi",
            dataIndex: "createdAt",
            render: (value) =>
              new Date(value).toLocaleString("ru", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }),
          },
          {
            title: "Qaytadi",
            dataIndex: "updatedAt",
            render: (value) =>
              new Date(value).toLocaleString("ru", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
          },
        
          {
            title: "Narxi",
            dataIndex: "price",
           
          },
        ]}
        dataSource={malumot}
        loading={loading}
        pagination={{
          pageSize: pageSize,
          current: current,
          total: malumot.length * pageSize,
          onChange: (page) => setCurrent(page),
        }}
      />
    </div>
  );
}

export default Books;
