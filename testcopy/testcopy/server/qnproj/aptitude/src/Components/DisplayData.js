import React, { useEffect, useState } from "react";
import "./DisplayData.css";
import axios from "axios";
import { Button } from "@mui/material";



function DisplayData({api}) {
  const [data, setData] = useState();

  useEffect(() => {
    let disp = async (e) => {
      let res = await api.get("rst/").then((res) => {
        setData(res.data);
        console.log(res.data);
      });
    };
    disp();
  }, []);

  
  const displayData = data?.map((data) => {
    return (
      <tr>
        <td>{data.username}</td>
        <td>testid</td>
        <td>{data.sec1}</td>
        <td>{data.sec2}</td>
        <td>{data.sec3}</td>
      </tr>
    );
  });

  return (
    <div className="display-data">
      <table>
        <tr>
          <th>Register Number</th>
          <th>Test ID</th>
          <th>Section 1</th>
          <th>Section 2</th>
          <th>Section 3</th>
        </tr>
        {displayData}
      </table>
      <br />

      <Button>Download Pdf</Button>
    </div>
  );
}

export default DisplayData;
