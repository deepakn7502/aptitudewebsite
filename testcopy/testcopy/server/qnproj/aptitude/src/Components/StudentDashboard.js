import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import "./StudentDashboard.css";

function StudentDashboard({ logout,api }) {
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
    </div>
  );
}

export default StudentDashboard;
