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
  const [user, setUser] = useState();

  let disp = (e) => {
    var d = new Date(e.target.value);
    var day = d.getDate();
    var mon = d.getMonth();
    mon++;
    if (day < 10) {
      day = "0" + day;
    }
    if (mon < 10) {
      mon = "0" + mon;
    }
    Settid("PEC" + day + mon);
  };

  const check = async (e) => {
    setUser(JSON.parse(window.localStorage.getItem("student")));

    const res = await api
      .post("check/", { tid: tid, username: user.username })
      .then(() => {
        window.sessionStorage.setItem("testid", tid);
        window.location.pathname = "/instructions";
      })
      .catch((error) => {
        console.log("Select Valid Date");
      });
      
    const log = async (e) => {
      try {
        const res = await api.post("check/", { tid: tid });
        window.location.pathname = "/instructions";
      } catch (error) {
        alert(error);
      }
    };
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
          <Button onClick={check} variant="contained">
            Start Test
          </Button>
        </div>
      </div>
    </div>
  );
}
export default StudentDashboard;
