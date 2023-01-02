import { Button, SwipeableDrawer } from "@mui/material";
import React, { useState } from "react";
import "./AdminDashboard.css";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";


const api = axios.create({
  baseURL: `http://localhost:8000`,
});

function AdminDashboard({ logout }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="main1">
      <MenuIcon
        onClick={() => {
          setOpen(true);
        }}
      />
      <SwipeableDrawer
        anchor="right"
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      >
        <div>
          <Button variant="outlined" className="bt1">
            Home
          </Button>
          <Button
            className="bt2"
            variant="outlined"
            onClick={() => {
              window.location.pathname = "/upload";
            }}
          >
            Upload
          </Button>
          <Button variant="outlined" className="bt3">
            Results
          </Button>
          <Button className="bt4" onClick={logout} variant="outlined">
            Log out
          </Button>
        </div>
      </SwipeableDrawer>
    </div>
  );
}

export default AdminDashboard;
