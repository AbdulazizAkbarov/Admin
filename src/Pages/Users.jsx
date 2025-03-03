import { Table, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useMyStore from "../Store/my-store";
import Kitobxon_qoshish from "./Kitobxon_qoshish";
import EditUser from "./EditUser";
import api from "./Axios";

function Users() {
  const [open, setOpen] = useState(false);

  const [malumot, setMalumot] = useState([]);
  const [current, setCurrent] = useState(1);
  const [loading, SetLoading] = useState(false);
  const [ user,setUSer]=useState()
  const state = useMyStore();
  const pageSize = 10;

  const nomi = () => {
    SetLoading(true);
    api
      .get("api/users", {
        params: {
          size: pageSize,
          page: current,
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
    <div className="p-3  bg-gray-300">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-2 ">Kitobxonlar</h2>

        <Kitobxon_qoshish refresh={nomi} />
      </div>
      <EditUser open={open} setOpen={setOpen} user={user}/>
      <Table
        rowKey="id"
        
        bordered
        columns={[
          {
            title: "id",
            dataIndex: "id",
            key: "sdfsdg",
            render:(id,item)=>{

              
              return <div 
              onClick={()=>{
                setOpen(true)
              setUSer(item)
              }}
              >
                {id}
              </div>
            }
          },
          {
            title: "First Name",
            dataIndex: "firstName",
          },
          {
            title: "Last Name",
            dataIndex: "lastName",
          },

          {
            title: "Telefon Nomer",
            dataIndex: "phone",
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

export default Users;
