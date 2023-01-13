import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import "./Navbar.css";

function Navbar({ logout }) {
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
      <Button variant="none">Start test</Button>
      <Button onClick={logout} variant="none" endIcon={<LogoutIcon />}>
        Logout
      </Button>
    </div>
  );
}

export default Navbar;
