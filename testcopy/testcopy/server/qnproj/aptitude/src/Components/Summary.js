import React, { useEffect, useState } from "react";
import "./Summary.css";
import Divider from "@mui/material/Divider";
import { Button, Tab } from "@mui/material";
import axios from "axios";
// import Button from "@mui/material/Button";


function Summary({ url, logout }) {

  const api = axios.create({
    baseURL: `http://${url}:8000`,
  });

  const [results, setResults] = useState();

  useEffect(() => {
    setResults(JSON.parse(window.sessionStorage.getItem("marks")));
  }, []);

  const gotohome = () => {
    window.location.pathname = "/"
  }
  return (
    <div className="summary">
      <div className="heading">
        <h1>SUMMARY</h1>
      </div>
      <div class="rowone">
        <div class="columnone">
          <div class="sessiono">
            <div className="circle one">{results?.mark1}</div>
          </div>

          <Divider className="divider1">SESSION-I</Divider>

          <div class="content">
            <div className="con">
              <p>
                <b>
                  Total no. of questions
                  <br />
                  No. of correct answers
                  <br />
                  No. of incorrect answers
                </b>
              </p>
            </div>
          </div>
        </div>

        <div class="columnone">
          <div class="sessiono">
            <div className="circle two">{results?.mark2}</div>
          </div>
          <Divider className="divider2">SESSION-II</Divider>

          <div className="content">
            <div className="con">
              <p>
                <b>
                  Total no. of questions
                  <br />
                  No. of correct answers
                  <br />
                  No. of incorrect answers
                </b>
              </p>
            </div>
          </div>
        </div>

        <div class="columnone">
          <div class="sessiono">
            <div className="circle three">{results?.mark3}</div>
          </div>
          <Divider className="divider3">SESSION-III</Divider>

          <div className="content">
            <div className="con">
              <p>
                <b>
                  Total no. of questions
                  <br />
                  No. of correct answers
                  <br />
                  No. of incorrect answers
                </b>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="submit_button"><Button onClick={() => {
        gotohome()
        logout()
      }} variant="contained">submit</Button></div>
    </div>
  );
}

export default Summary;
