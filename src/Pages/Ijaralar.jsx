import { Switch, Table, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useMyStore from "../Store/my-store";

function Ijaralar() {
  const [malumot, setMalumot] = useState([]);
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 10;
  const state = useMyStore();

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://library.softly.uz/api/rents", {
        params: {
          size: pageSize,
          page: current,
        },
        headers: {
          Authorization: `Bearer ${state.token}`,
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
      <h2 className="text-2xl font-bold mb-2">Ijara</h2>
      <Table
        rowKey="id"
        bordered
        columns={[
          {
            title: "id",
            dataIndex: "id",
          },
          {
            title: "KvId",
            dataIndex: "customId",
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
            dataIndex: "returningDate",
            render: (value) =>
              new Date(value).toLocaleString("ru", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
          },
          {
            title: "Qoldi/Jami",
            dataIndex: "returnedAt",
            render: (value) =>
              value
                ? new Date(value).toLocaleString("ru", {
                    month: "2-digit",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "-",
          },
          {
            title: "Qaytgan",
            dataIndex: "returnedAt",
            render: (value) => <Switch defaultChecked={!!value} />,
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

export default Ijaralar;
