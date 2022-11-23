import React, { useState, useEffect } from "react";
import "./Login.css";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Lock from "@mui/icons-material/Https";
import Button from "@mui/material/Button";
import { Divider, InputAdornment } from "@mui/material";
import axios from "axios";
// import { Divider} from "antd";

const api = axios.create({
<<<<<<< HEAD:testcopy/server/qnproj/aptitude/src/Components/Login.js
  baseURL: `http://192.168.1.2:8000/`,
=======
  baseURL: `http://localhost:8000/`,
>>>>>>> e8fc769e2764e0bf17b6dda1a6f395c7dda75050:testcopy/testcopy/server/qnproj/aptitude/src/Components/Login.js
});

function Login() {
  const [regno, setreg] = useState("");
  const [pass, setpass] = useState("");
  const [user, setUser] = useState();
  const [tid, Settid] = useState("");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("student");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  let log = async (e) => {
    try {
      const res = await api.post("log/", { username: regno, password: pass });
      setUser(res.data);
      localStorage.setItem("student", res.data);
      localStorage.setItem("testid", tid);
      window.location.pathname = "/";
    } catch (error) {
      //window.location.pathname = "/login";
      alert(error);
      console.log("else");
    }
  };
  let disp = (e) => {
    var d = new Date(e.target.value);
    const day = d.getDate();
    var mon = d.getMonth();
    mon++;
    Settid("CSE" + day + mon + "0");
  };
  return (
    <div className="login">
      <div className="login-container">
        <h2 class="pan">PANIMALAR ENGINEERING </h2>
        <h2 class="col">COLLEGE</h2>

        <img class="img" src={require("../logo.jpg")} alt=" "></img>

        <h2 class="log">LOGIN</h2>
        <div class="inputfield">
          <TextField
            label="Register number"
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
        </div>

        <div class="inputfield">
          <TextField
            label="Password"
            type="password"
            onChange={(e) => {
              setpass(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Lock />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div class="button">
          <Button variant="contained" onClick={log}>
            SIGN IN
          </Button>
        </div>
        <div className="divider">
          <Divider>OR</Divider>
        </div>
        <div className="">
          Don't have an account?{" "}
          <Button
            onClick={() => {
              window.location.pathname = "/register";
            }}
          >
            Register
          </Button>{" "}
        </div>
      </div>
    </div>
  );
}

export default Login;
