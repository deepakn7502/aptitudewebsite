import React, { useEffect, useState } from "react";
import "./Sections.css";
import Button from "@mui/material/Button";
import axios from "axios";
import Question from "./Question";

function Sections() {
  const api = axios.create({
    baseURL: `http://192.168.1.15:8000/`,
  });

  const [questions, setQstns] = useState([]);
  const tid = localStorage.getItem("testid");

  const [section1, setSection1] = useState([]);
  const [section2, setSection2] = useState([]);
  const [section3, setSection3] = useState([]);

  const openSection = () => {};

  useEffect(() => {
    let submit = () => {
      let res = api.get("qn/" + tid + "/").then((res) => {
        setQstns(res.data);
      });
    };
    submit();
  }, []);

  useEffect(() => {
    const one = questions.slice(0, 15);
    const two = questions.slice(15, 30);
    const three = questions.slice(30, questions.length);
    setSection1(one);
    setSection2(two);
    setSection3(three);
  }, [questions]);

  return (
    <div className="summary">
      <div className="heading">
        <h1>SECTIONS</h1>
      </div>
      <div class="row">
        <div className="cone">
          <div className="conehead">
            <h2>SECTION-I</h2>
            <h2>APTITUDE</h2>
            <h2>SECTION-I</h2>
            <h2>APTITUDE</h2>
          </div>
          <div class="column one">
            <div class="session"></div>

            <div class="content">
              <div className="con"></div>
            </div>
          </div>
          <button
            onClick={() => {
              window.location.pathname = "/questions";
            }}
          >
            START
          </button>
        </div>

        <div className="ctwo">
          <div className="conehead">
            <h2>SECTION-II</h2>
            <h2>TECHNICAL</h2>

            <h2>TECHNICAL</h2>
          </div>
          <div class="column two">
            <div class="session"></div>

            <div className="content">
              <div className="con">
                <p></p>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              window.location.pathname = "/questions";
            }}
          >
            START
          </button>
        </div>

        <div className="cthree">
          <div className="conehead">
            <h2>SECTION-III</h2>

            <h2>VERBAL</h2>
            <h2>SECTION-III</h2>
            <h2>VERBAL</h2>
          </div>
          <div class="column three">
            <div class="session"></div>

            <div className="content">
              <div className="con"></div>
            </div>
          </div>
          <button
            onClick={() => {
              window.location.pathname = "/questions";
            }}
          >
            START
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sections;
