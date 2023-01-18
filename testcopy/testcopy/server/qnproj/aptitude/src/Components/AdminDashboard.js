import React from "react";
import "./AdminDashboard.css";
import axios from "axios";
import Navbar from "./Navbar";

const api = axios.create({
  baseURL: `http://127.0.0.1:8000/` ,
});

function AdminDashboard({ logout }) {



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
