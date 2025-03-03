import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { Table, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useMyStore from "../Store/my-store";
import EditUser from "./EditUser";
import Kitoblarim_qoshish from "./Kitoblarim_qoshish";
import api from "./Axios";

function Kiroblarim() {
  const [open, setOpen] = useState(false);
  const [malumot, setMalumot] = useState([]);
  const [current, setCurrent] = useState(1);
  const [loading, SetLoading] = useState(false);
  const [user, setUser] = useState();
  const state = useMyStore();
  const pageSize = 10;

  const nomi = () => {
    SetLoading(true);
    api
      .get("/api/stocks", {
        params: {
          size: pageSize,
          page: current,
        },
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((res) => {
        setMalumot(res.data);
      })
      .catch((e) => {
        message.error("Error");
        console.error(e);
      })
      .finally(() => {
        SetLoading(false);
      });
  };


  useEffect(() => {
    nomi();
  }, [current]);

  return (
    <div className="p-3 bg-gray-300">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-2">Kitoblarim</h2>
        <Kitoblarim_qoshish refresh={nomi} />
      </div>
      <EditUser open={open} setOpen={setOpen} user={user} />
      <Table
        rowKey="id"
        bordered
        columns={[
          {
            title: "id",
            dataIndex: "id",
            key: "sdfsdg",
            render: (id, item) => (
              <div
                onClick={() => {
                  setOpen(true);
                  setUser(item);
                }}
              >
                {id}
              </div>
            ),
          },
          {
            title: "Kitob",
            dataIndex: "book",
            render: (book) => (
              <div>
               {book ? book.name : "Noma'lum"}
              </div>
            ),
          },
          {
            title: "Bandlik",
            dataIndex: "busy",
            render: (busy) => (
              <div>
                {busy ? (
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                ) : (
                  <CloseCircleTwoTone twoToneColor="#eb2f96" />
                )}
              </div>
            ),
          },
          {
            title: "Yasalgan",
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
            title: "Yangilangan",
            dataIndex: "updatedAt",
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
        ]}
        dataSource={malumot.items}
        loading={loading}
        pagination={{
          pageSize: pageSize,
          current: current,
          total: malumot.totalCount,
        }}
        onChange={(pagination) => {
          console.log(pagination);
          setCurrent(pagination.current);
        }}
      />
    </div>
  );
}

export default Kiroblarim;
