import React, { useEffect, useState } from "react";
import "./DisplayData.css";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import Navbar from "./Navbar";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import { data } from "../Functions/data";

function Practice({ logout, url }) {
  const api = axios.create({
    baseURL: `http://${url}:8000`,
  });

  // const [data, setData] = useState();

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8";
  const fileExtension = ".xlsx";

  // useEffect(() => {
  //   let disp = async (e) => {
  //     let res = await api.get("rst/").then((res) => {
  //       setData(res.data);
  //       console.log(res.data);
  //     });
  //   };
  //   disp();
  // }, []);

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

  let exportToExcel = async () => {
    let res = api.get("rst/PEC2211/").then((res) => {
      console.log(res.data);
      const ws = XLSX.utils.json_to_sheet(res.data);

      const wb = { Sheets: { PEC2211: ws }, SheetNames: ["PEC2211"] };

      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });

      FileSaver.saveAs(data, "sample-result" + fileExtension);
    });
  };

  const [testid, setTestID] = useState("");
  const [dept, setDept] = useState("");
  const [year, setYear] = useState("");
  const [sec, setSec] = useState("");
  console.log(data);

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
      <Navbar logout={logout} />
      <div className="input-fields">
        <div className="input">
          <TextField type="text" label="Test ID" />
          <Button>Search</Button>
        </div>
        <div className="input">
          <TextField
            type="text"
            label="Department"
            onChange={(e) => {
              setDept(e.target.value);
            }}
          />
          <TextField
            type="text"
            label="Year"
            onChange={(e) => {
              setYear(e.target.value);
            }}
          />
          <TextField
            type="text"
            label="Section"
            onChange={(e) => {
              setSec(e.target.value);
            }}
          />
          <Button>Filter</Button>
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
      <table>
        <tbody>
          {data.map((item) => {
            <tr>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Practice;
