import { Switch, Table, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Ijaralar() {
  const [malumot, setMalumot] = useState([]);
  useEffect(() => {
    axios
      .get("https://library.softly.uz/api/rents", {
        params: {
          size: 20,
          page: 1,
        },
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDUyLCJsaWJyYXJpYW4iOnRydWUsImxpYnJhcnlJZCI6MiwibG9jYXRpb25JZCI6Miwib3duZXIiOmZhbHNlLCJtb2RlcmF0b3IiOmZhbHNlLCJleHAiOjE3NDE0MTI1MDYsImlhdCI6MTc0MDM3NTcwNn0.-VquFrhK-7FacUJRENCAsXaEqLIeVYRK6ObBcnmcYSg",
        },
      })
      .then((res) => {
        setMalumot(res.data.items);
        console.log(res.data.items);
      })
      .catch((e) => {
        message.error("Error");
        console.error(e);
      });
  }, []);
  return (
    <div className="p-3  bg-gray-300">
      <h2 className="text-2xl font-bold mb-2 ">Ijara</h2>
      <Table
        bordered
        columns={[
          {
            title: "id",
            dataIndex: "id",
            key: "sdfsdg",
          },
          {
            title: "KvId",
            dataIndex: "customId",
          },
          {
            title: "Berildi",
            dataIndex: "createdAt",
            render: (value) => {
              return new Date(value).toLocaleString("ru", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });
            },
          },
          {
            title: "Qaytadi",
            dataIndex: "returningDate",
            render: (value) => {
              return new Date(value).toLocaleString("ru", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });
            },
          },
          {
            title: "Qoldi/Jami",
            dataIndex: "returnedAt",
            render: (value) => {
              if (!value) {
                return "-";
              }
              return new Date(value).toLocaleString("ru", {
                month: "2-digit",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });
            },
          },
          {
            title: "Qaytgan",
            dataIndex: "returnedAt",
            render: (checkbox) => {
              if (checkbox) {
                return <Switch defaultChecked onChange={checkbox} />;
              }
              else{
                return <Switch onChange={checkbox}/>
              }
            },
          },
        ]}
        dataSource={malumot}
      />
    </div>
  );
}

export default Ijaralar;
