import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import "./Navbar.css";
import axios from "axios";

const api = axios.create({
  baseURL: `http://127.0.0.1:8000/` ,
});



function Navbar({ logout }) {

 let host = () =>{
  let tid = prompt("Please enter your name:","PEC51");
  let res = api.put("qn/", {  tid: tid }).then(() => {
    alert("The test is Hosted");
  });
 }


  return (
    <div className="navbar">
      <Button
        variant="none"
        onClick={() => {
          window.location.pathname = "/";
        }}
      >
        Home
      </Button>
      <Button
        variant="none"
        onClick={() => {
          window.location.pathname = "/upload";
        }}
      >
        Upload
      </Button>
      <Button
        variant="none"
        onClick={() => {
          window.location.pathname = "/displaydata";
        }}
      >
        Results
      </Button>

      <Button onClick={host} variant="none" >
        HOST
      </Button>

      <Button onClick={logout} variant="none" endIcon={<LogoutIcon />}>
        Logout
      </Button>
    </div>
  );
}

export default Navbar;
