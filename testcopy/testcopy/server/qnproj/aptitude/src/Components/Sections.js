import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Sections.css";
import axios from "axios";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";


function Sections() {

  const api = axios.create({
    baseURL: `http://192.168.1.2:8000/`,
  });
  
  const [questions, setQstns] = useState([]);
  const tid = localStorage.getItem("testid");

function Sections({api}) {
  const [answers1, setAnswers1] = useState([]);
  const [answers2, setAnswers2] = useState([]);
  const [answers3, setAnswers3] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    setAnswers1(JSON.parse(window.sessionStorage.getItem("section1")));
    setAnswers2(JSON.parse(window.sessionStorage.getItem("section2")));
    setAnswers3(JSON.parse(window.sessionStorage.getItem("section3")));
    setUser(JSON.parse(window.localStorage.getItem("student")));
  }, []);

  const setSection = (value) => {
    window.sessionStorage.setItem("section", value);
    window.location.pathname = "/questions";
  };

  let validate = () => {
    let res = api
      .post("validate/", {
        username: user.username,
        ans1: answers1,
        ans2: answers2,
        ans3: answers3,
      })
      .then((res) => {
        window.sessionStorage.setItem("marks", JSON.stringify(res.data));
        window.location.pathname = "/summary";
      });
  };

  return (
    <div className="summary">
      <div className="heading">
        <h1>SECTIONS</h1>
      </div>
      <div className="row">
        <div className="card">
          <div className="conehead">
            <h2>APTITUDE</h2>
          </div>
          <div className="column one">
            <div className="session"></div>

            <div className="content">
              <div className="con"></div>
            </div>
          </div>
          <button
            onClick={() => {
              setSection("section1");
            }}
          >
            START
          </button>
        </div>

        <div className="card">
          <div className="conehead">
            <h2>TECHNICAL</h2>
          </div>
          <div className="column two">
            <div className="session"></div>

            <div className="content">
              <div className="con">
                <p></p>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setSection("section2");
            }}
          >
            START
          </button>
        </div>

        <div className="card">
          <div className="conehead">
            <h2>VERBAL</h2>
          </div>
          <div className="column three">
            <div className="session"></div>

            <div className="content">
              <div className="con"></div>
            </div>
          </div>
          <button
            onClick={() => {
              setSection("section3");
            }}
          >
            START
          </button>
        </div>
      </div>
      <div className="end-test">
        <Button
          variant="contained"
          onClick={() => {
            validate();
          }}
          endIcon={<ArrowForwardIosIcon />}
        >
          END TEST
        </Button>
      </div>
    </div>
  );
}
}
export default Sections;
