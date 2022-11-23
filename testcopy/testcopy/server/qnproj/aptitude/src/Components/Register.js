import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { Button, MenuItem, TextField } from "@mui/material";


const api = axios.create({
  baseURL: `http://192.168.1.2:8000/`,
});


const sections = [
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

function Register({api}) {
  const [departments, setDepartment] = useState("");
  const [section, setSection] = useState("");
  const [year, setYear] = useState("");

  const [regno, seteg] = useState("");
  const [rno, setrno] = useState("");
  const [pass, setpass] = useState("");
  const [name, setname] = useState("");

  let register = async (e) => {
    let res = await api
      .post("reg/", {
        username: regno,
        rollno: rno,
        name: name,
        year: year,
        sec: section,
        dept: departments,
        password: pass,
      })
      .then((res) => {
        console.log(JSON.stringify(res.data));
        window.location.pathname = "/login";
      });
  };

  return (
    <div class="register">
      <div className="register-container">
        <h2>PANIMALAR ENGINEERING</h2>
        <h2>COLLEGE</h2>

        <img class="img" src="logo.jpg" alt=" "></img>

        <h2 class="reg">REGISTER</h2>
        <div className="inputs">
          <div class="inputfield">
            <TextField
              label="Register Number"
              type="text"
              onChange={(e) => {
                seteg(e.target.value);
              }}
            />
          </div>
          <div class="inputfield">
            <TextField
              label="Roll Number"
              type="text"
              onChange={(e) => {
                setrno(e.target.value);
              }}
            />
          </div>

          <div class="inputfield">
            <TextField
              label="Enter Password"
              type="password"
              onChange={(e) => {
                setpass(e.target.value);
              }}
            />
          </div>
          <div class="inputfield">
            <TextField label="Re-Enter Password" type="password" />
          </div>
          <div class="inputfield">
            <TextField
              label="Full Name"
              type="text"
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
          </div>

          <div className="inputfield">
            <TextField
              select
              label="Year"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
              }}
              helperText="Please select your year of study"
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
              {sections.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
        <div class="button">
          <Button variant="contained" onClick={register}>
            REGISTER
          </Button>
        </div>
        <div className="">
          Already have an account?
          <Button
            onClick={() => {
              window.location.pathname = "/login";
            }}
          >
            Login
          </Button>{" "}
        </div>
      </div>
    </div>
  );
}
export default Register;
