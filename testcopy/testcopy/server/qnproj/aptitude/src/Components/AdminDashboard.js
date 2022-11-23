import { Button } from "@mui/material";
import React from "react";
import "./AdminDashboard.css";

function AdminDashboard({ logout }) {
  return (
    <div>
      AdminDashboard
      <Button onClick={logout}>Log out</Button>
    </div>
  );
}

export default AdminDashboard;
