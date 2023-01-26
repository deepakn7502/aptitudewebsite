import React, { useEffect, useRef, useState } from "react";
import "./DisplayData.css";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import Navbar from "./Navbar";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import {
  DownloadTableExcel,
  useDownloadExcel,
} from "react-export-table-to-excel";

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
    let res = await api.post("rst/", { tid: tid }).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  };

  // let exporttoexcel = () => {
  //   const ws = XLSX.utils.json_to_sheet(data);

  //   const wb = { Sheets: { tid: ws }, SheetNames: [tid] };

  //   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  //   const exportdata = new Blob([excelBuffer], { type: fileType });

  //   const fname = tid + dept + year + sec;
  //   FileSaver.saveAs(exportdata, fname + fileExtension);
  // };

  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: tid + dept + year + sec,
    sheet: dept + year + sec,
  });

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
        <table ref={tableRef}>
          <tr>
            <th rowSpan="2">Register Number</th>
            <th rowSpan="2">Roll No</th>
            <th rowSpan="2">Name</th>
            <th rowSpan="2">Department</th>
            <th rowSpan="2">Year</th>
            <th rowSpan="2">Section</th>
            <th colSpan="3">Marks</th>
            <th rowSpan="2">Total</th>
          </tr>
          <tr>
            <th>Aptitude</th>
            <th>Verbal</th>
            <th>Technical</th>
          </tr>
          {data?.map((data) => {
            return (
              <tr key={data.username}>
                <td>{data.username}</td>
                <td>{data.rollno}</td>
                <td>{data.name}</td>
                <td>{data.department}</td>
                <td>{data.year}</td>
                <td>{data.section}</td>
                <td>{data.aptitude}</td>
                <td>{data.verbal}</td>
                <td>{data.technical}</td>
                <td>{data.total}</td>
              </tr>
            );
          })}
        </table>
      </div>
      <br />

      <Button onClick={onDownload}>Download Pdf</Button>
      {/* <DownloadTableExcel
        filename="users table"
        sheet="users"
        currentTableRef={tableRef.current}
      >
        <Button>Download Pdf</Button>
      </DownloadTableExcel> */}
    </div>
  );
}

export default DisplayData;
