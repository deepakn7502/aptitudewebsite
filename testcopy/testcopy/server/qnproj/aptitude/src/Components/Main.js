import { Button } from "@mui/material";
import React from "react";
import "./Main.css";
import axios from "axios";

<<<<<<< HEAD
const api = axios.create({
  baseURL: `http://192.168.1.2:8000/`,
});
=======
>>>>>>> f42e648177787ef8b573432c5232c2838fc4c350


function Main({api}) {
  return (
    <div className="main">
      <div className="cont">
        <div className="cont1">
          <h1>PANIMALAR ENGINEERING COLLEGE</h1>
<<<<<<< HEAD
          <img class="img" src={require("../logo.jpg")} alt=" "></img>
=======
          <img class="img" src="logo123.png" alt=" "></img>
>>>>>>> f42e648177787ef8b573432c5232c2838fc4c350
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
