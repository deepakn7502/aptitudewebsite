import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import "./StudentDashboard.css";
import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:8000`,
});

function StudentDashboard({ logout }) {
  const [tid, Settid] = useState("");

  let disp = (e) => {
    var d = new Date(e.target.value);
    const day = d.getDate();
    var mon = d.getMonth();
    mon++;
    Settid("PEC" + day + mon);
  };

  return (
    <div>
      StudentDashboard
      <TextField
        type="date"
        onChange={(event) => {
          disp(event);
        }}
      />
      <Button
        onClick={() => {
          window.sessionStorage.setItem("testid", tid);
          if (window.sessionStorage.getItem("testid")) {
            window.location.pathname = "/instructions";
          } else {
            alert("Select Test Date");
          }
        }}
      >
        Start Test
      </Button>
      <Button onClick={logout}>Log out</Button>
      <br />
      <br />
    </div>
  );
}

export default StudentDashboard;
