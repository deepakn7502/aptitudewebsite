import React, { useEffect, useRef, useState } from "react";
import "./DisplayData.css";
import axios from "axios";
import { Button, MenuItem, TextField } from "@mui/material";
import Navbar from "./Navbar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  DownloadTableExcel,
  useDownloadExcel,
} from "react-export-table-to-excel";

const departments = [
  {
    value: "",
    label: "None",
  },
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
    value: "",
    label: "None",
  },
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

const section = [
  {
    value: "",
    label: "None",
  },
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

function DisplayData({ logout, url }) {
  const api = axios.create({
    baseURL: `http://${url}:8000`,
  });

  var [data, setData] = useState();
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
    });
  };

  // let exporttoexcel = () => {

  // let exporttoexcel = async (e) => {

  //   const ws = XLSX.utils.json_to_sheet(data);

  //   const wb = { Sheets: { "Sheet1": ws }, SheetNames: ["Sheet1"] };

  //   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  //   const exportdata = new Blob([excelBuffer], { type: fileType });

  //   const fname = tid + dept + year + sec;
  //   FileSaver.saveAs(exportdata, fname + fileExtension);
  // };

  const h1 = "         PANIMALAR ENGINERRING COLLEGE";
  const h2 = "APTITUDE TEST";
  const h3 = "TESTID:" + tid;
  const h4 = "CLASS:" + year + "-" + dept + "-" + sec;

  let exportpdf = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = h1 + "\n" + h2 + "\n" + h3 + "\n" + h4;
    const headers = [
      [
        "REGISTER NO",
        "ROLL NO",
        "NMAE",
        "DEPARTMENT",
        "YEAR",
        "SECTION",
        "APTITUDE",
        "TECHNICAL",
        "VERBAL",
        "TOTAL",
      ],
    ];

    const exportdata = data.map((dt) => [
      dt.username,
      dt.rollno,
      dt.name,
      dt.department,
      dt.year,
      dt.section,
      dt.aptitude,
      dt.verbal,
      dt.technical,
      dt.total,
    ]);

    let content = {
      startY: 100,
      head: headers,
      body: exportdata,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save(tid + "-" + dept + "-" + year + "-" + sec + ".pdf");
  };

  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: tid + dept + year + sec,
    sheet: dept + year + sec,
  });

  return (
    <div className="display-data">
      <Navbar logout={logout} />
      <br />
      <div className="input-fields">
        <div className="input">
          <TextField
            type="text"
            label="Test ID"
            onChange={(e) => {
              setTestID(e.target.value);
            }}
          />
          <Button onClick={search} variant="contained" color="success">
            Search
          </Button>
        </div>
        <div className="input">
          <TextField
            select
            label="Department"
            value={dept}
            onChange={(e) => {
              setDept(e.target.value);
            }}
          >
            {departments.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Year"
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
            }}
          >
            {years.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Section"
            value={sec}
            onChange={(e) => {
              setSec(e.target.value);
            }}
          >
            {section.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button onClick={filter} variant="contained" color="success">
            Filter
          </Button>
        </div>
      </div>
      <div className="table" ref={tableRef}>
        <table>
          <thead>
            <tr>
              <h1>{h1}</h1>
            </tr>
            <tr>
              <h2>PLACEMENT DEPARTMENT</h2>
            </tr>
            <h3>TESTID:{tid}</h3>
            <tr colSpan="5">
              <h4>CLASS:{year + " " + dept + " " + sec}</h4>
            </tr>

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
          </thead>
          <tbody>
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
          </tbody>
        </table>
      </div>
      <br />

      <div className="dexcel">
        {" "}
        <Button onClick={onDownload} variant="contained">
          Download EXCEL
        </Button>
        <div className="pdfbt"> </div>
      </div>

      <br />
      <div className="dpdf">
        <Button onClick={exportpdf} variant="contained">
          {" "}
          Download PDF{" "}
        </Button>
      </div>
    </div>
  );
}
export default DisplayData;
