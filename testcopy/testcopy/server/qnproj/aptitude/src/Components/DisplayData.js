import React, { useEffect, useState } from "react";
import "./DisplayData.css";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import Navbar from "./Navbar";



function DisplayData({ logout, url }) {

  const api = axios.create({
    baseURL: `http://${url}:8000`,
  });

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

  // const displayData = data?.map((data) => {
  //   return (
  //     <tr>
  //       <td>{data.username}</td>
  //       <td>{data.sec1}</td>
  //       <td>{data.sec2}</td>
  //       <td>{data.sec3}</td>
  //     </tr>
  //   );
  // });

  return (
    <div className="display-data">
      <Navbar logout={logout} />
      <div className="input-fields">
        <TextField type="text" label="Test ID" />
        <div>
          <TextField />
        </div>
      </div>
      <div className="table">
        <table>
          <tr>
            <th>Register Number</th>
            <th>Department</th>
            <th>Section</th>

            <th colSpan="3">Marks</th>
          </tr>
          {/* {displayData} */}
        </table>
      </div>
      <br />

      <Button>Download Pdf</Button>
    </div>
  );
}

export default DisplayData;
