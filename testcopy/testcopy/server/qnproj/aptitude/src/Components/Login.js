import React, { useState, useEffect } from "react";
import "./Login.css";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Lock from "@mui/icons-material/Https";
import Button from "@mui/material/Button";
import { Divider, InputAdornment } from "@mui/material";
import axios from "axios";
// import { Divider} from "antd";

function Login({ url }) {
  const api = axios.create({
    baseURL: `http://${url}:8000`,
  });

  const [regno, setreg] = useState("");
  const [pass, setpass] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("student");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  const log = async (e) => {
    try {
      console.log(regno, pass);
      const res = await api.post("log/", { username: regno, password: pass });
      setUser(res.data);
      const student = JSON.stringify(res.data);
      console.log(student);
      localStorage.setItem("student", student);
      window.location.pathname = "/";
    } catch (error) {
      alert(error.message);
    }
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
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
