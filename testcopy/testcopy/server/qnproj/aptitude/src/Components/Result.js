import React, { useState } from "react";
// import "./AdminDashboard.css";
import { Button, MenuItem, TextField } from "@mui/material";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import axios from "axios";

const dept = [
  {
    value: "CSE",
    label: "CSE",
  },
  {
    value: "ECE",
    label: "ECE",
  },
  {
    value: "EEE",
    label: "EEE",
  },
  {
    value: "IT",
    label: "IT",
  },
  {
    value: "ME",
    label: "ME",
  },
  {
    value: "AIDS",
    label: "AIDS",
  },
  {
    value: "EI",
    label: "EI",
  },
  {
    value: "CSBS",
    label: "CSBS",
  },
  {
    value: "CCE",
    label: "CCE",
  },
  {
    value: "CIVIL",
    label: "CIVIL",
  },
];
const years = [
  {
    value: "I",
    label: "I",
  },
  {
    value: "II",
    label: "II",
  },
  {
    value: "III",
    label: "III",
  },
  {
    value: "IV",
    label: "IV",
  },
];
const sec = [
  {
    value: "A",
    label: "A",
  },
  {
    value: "B",
    label: "B",
  },
  {
    value: "C",
    label: "C",
  },
  {
    value: "D",
    label: "D",
  },
  {
    value: "E",
    label: "E",
  },
];

function Result({ url }) {
  const api = axios.create({
    baseURL: `http://${url}:8000`,
  });

  const [departments, setDepartment] = useState("");
  const [section, setSection] = useState("");
  const [year, setYear] = useState("");
  const [tid, setid] = useState("PEC212");

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8";
  const fileExtension = ".xlsx";

  let exportToExcel = async () => {
    let res = api
      .post("rst/", {
        tid: tid,
        dept: departments,
        sec: section,
      })
      .then((res) => {
        const ws = XLSX.utils.json_to_sheet(res.data);

        const wb = { Sheets: { PEC2211: ws }, SheetNames: ["PEC2211"] };

        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });

        FileSaver.saveAs(data, "sample-result" + fileExtension);
      });
  };

  let disp = (e) => {
    var d = new Date(e.target.value);
    const day = d.getDate();
    var mon = d.getMonth();
    mon++;
    setid("PEC" + day + mon);
  };

  return (
    <div className="main1">
      <TextField
        className="def"
        type="date"
        onChange={(e) => disp(e)}
      ></TextField>

      <div className="inputfield">
        <TextField
          select
          label="Year"
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
          }}
          helperText="DEPARTMENT"
        >
          {years.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="inputfield">
        <TextField
          select
          label="Section"
          value={section}
          onChange={(e) => {
            setSection(e.target.value);
          }}
          helperText="Please select your section"
        >
          {sec.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <div className="inputfield">
        <TextField
          select
          label="Department"
          value={departments}
          onChange={(e) => {
            setDepartment(e.target.value);
          }}
          helperText="Please select your department"
        >
          {dept.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>

      {/* <TextField
            label="DEPARTMENT"
            type="text"
            onChange={(e) => {
              setreg(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />

<TextField
            label="SECTION"
            type="text"
            onChange={(e) => {
              setreg(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccountCircle />
                </InputAdornment>
              ),
            }} 
            /> */}

      <Button className="bt4" onClick={exportToExcel} variant="outlined">
        Download
      </Button>
    </div>
  );
}

export default Result;
