import { Table, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useMyStore from "../Store/my-store";
import Kitobxon_qoshish from "./Kitobxon_qoshish";

function Users() {
  const [malumot, setMalumot] = useState([]);
  const [loading, SetLoading] = useState(false);
  const state = useMyStore();

  const nomi = () => {
    axios
      .get("https://library.softly.uz/api/users", {
        params: {
          size: 20,
          page: 1,
        },
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((res) => {
        setMalumot(res.data.items);
        console.log(res.data.items);
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
  }, []);
  return (
    <div className="p-3  bg-gray-300">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-2 ">Kitobxonlar</h2>

        <Kitobxon_qoshish refresh={nomi} />
      </div>
      <Table
        bordered
        columns={[
          {
            title: "id",
            dataIndex: "id",
            key: "sdfsdg",
          },
          {
            title: "First Name",
            dataIndex: "firstName",
          },
          {
            title: "Last Name",
            dataIndex: "lastName",
          },
        ]}
        dataSource={malumot}
        loading={loading}
      />
    </div>
  );
}

export default Users;
