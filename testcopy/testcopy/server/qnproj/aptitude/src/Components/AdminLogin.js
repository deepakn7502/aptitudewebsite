import React, { useState,useEffect } from "react";
import "./AdminLogin.css";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Lock from "@mui/icons-material/Https";
import Button from "@mui/material/Button";
import { InputAdornment } from "@mui/material";
import axios from "axios";

const api = axios.create({
<<<<<<< HEAD:testcopy/server/qnproj/aptitude/src/Components/AdminLogin.js
  baseURL: `http://192.168.1.2:8000/`,
=======
  baseURL: `http://localhost:8000/`,
>>>>>>> e8fc769e2764e0bf17b6dda1a6f395c7dda75050:testcopy/testcopy/server/qnproj/aptitude/src/Components/AdminLogin.js
});


function AdminLogin() {
  
  const [username, setname] = useState("");
  const [password, setpass] = useState("");
  const [user, setUser] = useState();
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem("staff");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setname(foundUser);
    }
  }, []);

  // if (user) {
  //   window.location.pathname = "/upload";
  //   return <div>{user.name} is loggged in</div>;
  // }



  let log = async (e) => {
    try {
      const res = await api.post("stafflg/", { username: username, password: password});
      setUser(res.data);
      console.log(user)
      localStorage.setItem("staff", res.data);
      window.location.pathname = "/";
    } catch (error) {
      window.location.pathname = "/adminlogin";
      alert(error);
      
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
            label="Username"
            type="text"
            value={username}
            onChange={(e) => {setname(e.target.value)}}
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
            onChange={(e) => {setpass(e.target.value)}}
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
            LOGIN
          </Button>
        </div>
      </div>
    </div>
  );

  

}

export default AdminLogin;
