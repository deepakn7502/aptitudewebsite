import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import "./StudentDashboard.css";
import axios from "axios";


function StudentDashboard({ logout, url }) {
  
  const api = axios.create({
    baseURL: `http://${url}:8000`,
  });
  const [tid, Settid] = useState("");

  let disp = (e) => {
    var d = new Date(e.target.value);
    const day = d.getDate();
    var mon = d.getMonth();
    mon++;
    Settid("PEC" + day + mon);
  };


  const log = async (e) => {
    try {
      const res = await api.post("check/", { tid : tid  });
      window.location.pathname = "/instructions";
    } catch (error) {
      alert(error);
    }
  };


  return (
    <div className="student">
      <div className="nav">
        <Button onClick={logout} endIcon={<LogoutIcon />}>
          Log out
        </Button>
      </div>
      <div className="block">
        <div className="container">
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
            variant="contained"
          >
            Start Test
          </Button>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
