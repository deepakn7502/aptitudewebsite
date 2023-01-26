import React, { useEffect, useState } from "react";
import "./DisplayData.css";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import Navbar from "./Navbar";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

function DisplayData({ logout, url }) {
  const api = axios.create({
    baseURL: `http://${url}:8000`,
  });

  const [data, setData] = useState();
  const [tid, setTestID] = useState("");
  const [dept, setDept] = useState("");
  const [year, setYear] = useState("");
  const [sec, setSec] = useState("");

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8";
  const fileExtension = ".xlsx";

  // useEffect(() => {
  //   let disp = async (e) => {
  //     let res = await api.get("rst/").then((res) => {
  //       setData(res.data);
  //     });
  //   };
  //   disp();
  // }, []);


  let filter = async () => {
    let res = await api
      .post("search/", {
        tid: tid,
        dept: dept,
        sec: sec,
        year: year,
      })
      .then((res) => {
        setData(res.data);
        // console.log(res.data);
      });
  };

  let search = async () => {
    let res = await api.post("rst/",{ tid : tid}).then((res) => {
      setData(res.data);
      // console.log(res.data);
    });
  };

let exporttoexcel = () => {

  const ws = XLSX.utils.json_to_sheet(data);

  const wb = { Sheets: { tid: ws }, SheetNames: [tid] };

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });

  const fname = tid + dept + year + sec;
  FileSaver.saveAs(data, fname + fileExtension);
}


  // const displayData = {}

  return (
    <div className="display-data">
      <Navbar logout={logout} />
      <div className="input-fields">
        <div className="input">
          <TextField
            type="text"
            label="Test ID"
            onChange={(e) => {
              setTestID(e.target.value);
            }}
          />
          <Button onClick={search}>Search</Button>
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
          <Button onClick={filter}>Filter</Button>
        </div>
      </div>
      <div className="table">
        <table>
        <thead>
          <tr>
            <th>Register Number</th>
            <th>Roll No</th>
            <th>Name</th>
            <th>Department</th>
            <th>Section</th>

            <th colSpan="3">Marks</th>
            <th>Total</th>
          </tr>
          </thead>
          <tbody>
          {
             data?.map((data) => {
              return (
                <tr key={data.username}>
                  <td>{data.username}</td>
                  <td>{data.rollno}</td>
                  <td>{data.name}</td>
                  {/* <td>{tid}</td> */}
                  <td>{data.sec1}</td>
                  <td>{data.sec2}</td>
                  <td>{data.sec3}</td>
                  <td>{data.total}</td>
                </tr>
              )
              })
          }
          </tbody>
          
        </table>
      </div>
      <br />

      <Button onClick={exporttoexcel}>Download Pdf</Button>
    </div>
  );
}

export default DisplayData;
