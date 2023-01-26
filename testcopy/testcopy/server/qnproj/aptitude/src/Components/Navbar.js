import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import "./Navbar.css";
import axios from "axios";

function Navbar({ url }) {
  const api = axios.create({
    baseURL: `http://${url}:8000`,
  });

  let logout = () => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.location.pathname = "/";
  };

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
        Download
      </Button>

      <Button onClick={logout} variant="none" endIcon={<LogoutIcon />}>
        Logout
      </Button>
    </div>
  );
}

export default Navbar;
