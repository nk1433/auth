import React, { useState, useEffect } from "react";
import Table from "./table";

const TableComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3006/data", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      response
        .json()
        .then((res) => setData(res))
        .catch(() => setData("unauthorized"));
    };

    fetchData();
  }, []);

  return typeof data === "string" ? <div>{data}</div> : <Table data={data} />;
};

export default TableComponent;
