import { Button, Drawer, Switch, Table, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useMyStore from "../Store/my-store";
import Ijaralar_qoshish from "./Ijaralar_qoshish";
import Edit_rents from "./Edit_rents";
import api from "./Axios";

function Ijaralar() {
  const [malumot, setMalumot] = useState([]);
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [open, setOpen] = useState(false);
  const [books,setBooks]=useState()
  const [item,setItem]=useState([])


  const pageSize = 10;

  const ijaralarRents = ()=>{
    setLoading(true);
    api
      .get(`api/rents`, {
        params: {
          size: pageSize,
          page: current,
        },
      })
      .then((res) => {
        const books_id =res.data.items.map((item)=>{
          return item.stock.bookId
        })


        api.get("/api/books",{
          params:{
            id:books_id
          }
        }).then((res)=>{
          setBooks(res.data.items)
        })
        setMalumot(res.data.items);
        setLoading(false);
      })
      .catch((e) => {
        message.error("Xatolik yuz berdi");
        setLoading(false);
        console.error(e);
      });
  }

  useEffect(() => {
  ijaralarRents()
  }, [current]);

  return (
    <div className="p-3 bg-gray-300">
      <div className="flex items-center justify-between mx-3">
        <h2 className="text-2xl font-bold mb-2">Ijara</h2>

        <Ijaralar_qoshish setOpen={setOpen} open={open} onRefresh={ijaralarRents} />
      </div>

      <Edit_rents open={open} setOpen={setOpen} user={user} setItem={setItem} item={item} />

      <Table
      
        rowKey="id"
        bordered
        size="middle"
        columns={[
          {
            title: "id",
            dataIndex: "id",
            render: (id, item) => (
              <div
                onClick={() => {
                  setOpen(true);
                  setItem(item)
                }}
              >
                {id}
              </div>
            ),
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

          {
            title: "Kitobxonlar",
            dataIndex: "user",
            render: (user) => `${user.firstName} ${user.lastName}`,
          },
          {
            title: "Zaxira Kitob",
            dataIndex: "stock",
            render: (i)=>{
              return (
                <ZaxiraKitob stock={i} books={books}/>
              )
            }
          },
          
        ]}
        dataSource={malumot}
        pagination={{
          pageSize: pageSize,
          current: current,
          total: malumot.length * pageSize,
          onChange: (page) => setCurrent(page),
        }}
        loading={loading}
      />
    </div>
  );

}

function ZaxiraKitob({stock,books}) {
  const book =books?.find((i)=>{
    return i.id===stock.bookId
  })
  return(
    <div>
      {stock.id}/{stock.bookId}{book?.name}
    </div>
  )
  
}

export default Ijaralar;
