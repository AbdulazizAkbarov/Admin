import { Table } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

function ProductPage() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get("https://67458ca9512ddbd807f88427.mockapi.io/products")
      .then((res) => {
        setProduct(res.data);
        console.log(res.data);
      });
  }, []);
  return (
    <div className="p-2 bg-gray-300">
      <h2 className="font-bold text-xl p-2">Product Page</h2>
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
            title: "Code",
            dataIndex: "createdAt",
          },
          {
            title: "Rasm",
            dataIndex: "image",
            render: (image) => {
              return <img className="h-8 w-10" src={image}></img>;
            },
          },
        ]}
        dataSource={product}
      />
    </div>
  );
}

export default ProductPage;
