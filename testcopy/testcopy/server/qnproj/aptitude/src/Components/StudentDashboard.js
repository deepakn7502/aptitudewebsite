import { Button, TextField } from "@mui/material";
import React from "react";
import "./StudentDashboard.css";

function StudentDashboard({ logout }) {
  return (
    <div>
      StudentDashboard
      <Button onClick={logout}>Log out</Button>
      <br />
      <br />
    </div>
  );
}

export default StudentDashboard;
