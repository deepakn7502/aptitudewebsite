import { Button } from "@mui/material";
import React from "react";
import "./Main.css";
import axios from "axios";

function Main({ url }) {
  const api = axios.create({
    baseURL: `http://${url}:8000`,
  });
  return (
    <div className="main">
      <div className="cont">
        <div className="cont1">
          <h1>PANIMALAR ENGINEERING COLLEGE</h1>

          <img class="img" src={require("../logo.jpg")} alt=" "></img>

          <p>
            <span>An Autonomous Institution</span>
            <br />
            Affliated to Anna University,Chennai
            <br />
            (JAISAKTHI EDUCATIONAL TRUST)
          </p>
          <div className="buttons">
            <Button
              className="b1"
              onClick={() => {
                if (localStorage.getItem("student")) {
                  window.location.pathname = "/instructions";
                } else {
                  window.location.pathname = "/login";
                }
              }}
              variant="contained"
            >
              Login
            </Button>
            <Button
              className="b2"
              onClick={() => {
                window.location.pathname = "/adminlogin";
              }}
              variant="contained"
            >
              Staff Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
