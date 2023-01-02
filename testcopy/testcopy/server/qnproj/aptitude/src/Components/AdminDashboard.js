import { Button, SwipeableDrawer } from "@mui/material";
import React, { useState } from "react";
import "./AdminDashboard.css";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

const api = axios.create({
  baseURL: `http://localhost:8000`,
});

function AdminDashboard({ logout }) {
  const [open, setOpen] = useState(false);

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
      <MenuIcon
        onClick={() => {
          setOpen(true);
        }}
      />
      <SwipeableDrawer
        anchor="right"
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      >
        <div>
          <Button variant="outlined" className="bt1">
            Home
          </Button>
          <Button
            className="bt2"
            variant="outlined"
            onClick={() => {
              window.location.pathname = "/upload";
            }}
          >
            Upload
          </Button>
          <Button variant="outlined" className="bt3">
            Results
          </Button>
          <Button className="bt4" onClick={logout} variant="outlined">
            Log out
          </Button>
        </div>
      </SwipeableDrawer>
    </div>
  );
}
export default AdminDashboard;
