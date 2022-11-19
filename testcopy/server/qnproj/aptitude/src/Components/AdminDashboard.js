import { Button } from "@mui/material";
import React from "react";
import "./AdminDashboard.css";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import axios from "axios";

const api = axios.create({
  baseURL: `http://192.168.1.15:8000/`,
});

function AdminDashboard({ logout }) {


  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8";
  const fileExtension = ".xlsx";

  let exportToExcel = async () => {
    let res = api.get("rst/PEC1911/").then((res) => {
    
    console.log(res.data);
    const ws = XLSX.utils.json_to_sheet(res.data);
   
    const wb = { Sheets: { "PEC1911": ws }, SheetNames: ["PEC1911"] };
   
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    
    FileSaver.saveAs(data, "sample-result" + fileExtension);
     });
  };

  return (
    <div>
      AdminDashboard
      <Button onClick={(e) => exportToExcel()}>DOWNLOAD RESULT</Button>
      <Button onClick={logout}>Log out</Button>
    </div>
  );
}

export default AdminDashboard;
