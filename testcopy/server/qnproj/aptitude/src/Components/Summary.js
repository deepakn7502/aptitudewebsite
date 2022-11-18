import React, { useEffect, useState } from "react";
import "./Summary.css";
import Divider from "@mui/material/Divider";
import { Tab } from "@mui/material";
// import Button from "@mui/material/Button";

function Summary({api}) {
  const [results, setResults] = useState();

  useEffect(() => {
    setResults(JSON.parse(window.sessionStorage.getItem("marks")));
  }, []);
  return (
    <div className="summary1">
      <div className="headingx">
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
                  No. of questions attended
                  <br />
                  No. of questions unattended
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
                  No. of questions attended
                  <br />
                  No. of questions unattended
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
                  No. of questions attended
                  <br />
                  No. of questions unattended
                </b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
