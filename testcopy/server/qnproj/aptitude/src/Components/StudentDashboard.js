import { Button } from "@mui/material";
import React from "react";
import "./StudentDashboard.css";

function StudentDashboard({ logout }) {


  let direct=() => {
    window.location.pathname = "/instructions";
  }
  return (
    <div>
      StudentDashboard
      <Button onClick={(e) => direct()}>direct</Button>
      <Button onClick={logout}>Log out</Button>
    </div>
  );
}

export default StudentDashboard;
