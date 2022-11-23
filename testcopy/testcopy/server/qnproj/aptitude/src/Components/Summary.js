import React from "react";
import "./Summary.css";
import Divider from "@mui/material/Divider";
import { Tab } from "@mui/material";
// import Button from "@mui/material/Button";

function Summary() {
  return (
    <div className="summary">
      <div className="heading">
        <h1>SUMMARY</h1>
      </div>
      <div class="rowone">
        <div class="columnone">
          <div class="sessiono">
            <div className="circle one">11</div>
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
            <div className="circle two">12</div>
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
            <div className="circle three">14</div>
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
    </div>
  );
}

export default Summary;
