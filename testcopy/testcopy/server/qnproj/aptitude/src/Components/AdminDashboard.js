import React from "react";
import "./AdminDashboard.css";
import axios from "axios";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import Navbar from "./Navbar";

function AdminDashboard({ logout, url }) {
  const api = axios.create({
    baseURL: `http://${url}:8000`,
  });

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8";
  const fileExtension = ".xlsx";

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

  return (
    <div className="main1">
      <Navbar logout={logout} />
      <div className="cont">
        <div className="cont1">
          <h1>PANIMALAR ENGINEERING COLLEGE</h1>

          <img class="img" src={require("../logo.jpg")} alt=" " />

          <p>
            <span>An Autonomous Institution</span>
            <br />
            Affliated to Anna University,Chennai
            <br />
            (JAISAKTHI EDUCATIONAL TRUST)
          </p>
        </div>
      </div>
    </div>
  );
}
export default AdminDashboard;
