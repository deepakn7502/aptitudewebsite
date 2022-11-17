import { Button } from "@mui/material";
import React from "react";
import "./StudentDashboard.css";

function StudentDashboard({ logout }) {
  return (
    <div>
      StudentDashboard
      <Button onClick={logout}>Log out</Button>
    </div>
  );
}

export default StudentDashboard;
