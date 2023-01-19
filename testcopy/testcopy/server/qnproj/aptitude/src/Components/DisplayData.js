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

  const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8";
const fileExtension = ".xlsx";

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
