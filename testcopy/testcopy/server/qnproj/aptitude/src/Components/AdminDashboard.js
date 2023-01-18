import React from "react";
import "./AdminDashboard.css";
import axios from "axios";
import Navbar from "./Navbar";

function AdminDashboard({ logout, url }) {
  const api = axios.create({
    baseURL: `http://${url}:8000`,
  });

<<<<<<< HEAD
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8";
  const fileExtension = ".xlsx";
=======
function AdminDashboard({ logout }) {
>>>>>>> c850823708cf120c648d7c8d5276b558932a5c52



  return (
    <div className="main1">
      <Navbar logout={logout} />
      <div className="cont">
        <div className="cont1">
          <h1>PANIMALAR ENGINEERING COLLEGE</h1>

          <img class="img" src={require("../logo.jpg")} alt=" " />

          <p>
            <span>An Autonomous Institution</span>
            <br />
            Affliated to Anna University,Chennai
            <br />
            (JAISAKTHI EDUCATIONAL TRUST)
          </p>
        </div>
      </div>
    </div>
  );
}
export default AdminDashboard;
