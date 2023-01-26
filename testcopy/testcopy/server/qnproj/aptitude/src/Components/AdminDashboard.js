import React from "react";
import "./AdminDashboard.css";
import axios from "axios";
import Navbar from "./Navbar";

function AdminDashboard({ url }) {
  const api = axios.create({
    baseURL: `http://${url}:8000`,
  });


  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8";
  const fileExtension = ".xlsx";

  return (
    <div className="main1">
      <Navbar  url={url} />
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
