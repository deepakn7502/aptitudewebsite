import React, { useEffect, useState } from "react";
import "./Summary.css";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";

function Summary({ logout, setStart }) {
  const [results, setResults] = useState();

  useEffect(() => {
    setResults(JSON.parse(window.sessionStorage.getItem("marks")));
  }, []);

  const gotohome = () => {
    window.location.pathname = "/";
    setStart(false);
  };
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

          <Divider className="divider1">APTITUDE</Divider>

          <div class="content">
            <div className="con">
              <p>
                <b>
                  Total no. of questions:
                  <br />
                  No. of Attended:
                  </b>
              </p>
            </div>
          </div>
        </div>

        <div class="columnone">
          <div class="sessiono">
            <div className="circle two">{results?.mark2}</div>
          </div>
          <Divider className="divider2">VERBAL</Divider>

          <div className="content">
            <div className="con">
              <p>
                <b>
                  Total no. of questions:
                  <br />
                  No. of Attended:
                  
                </b>
              </p>
            </div>
          </div>
        </div>

        <div class="columnone">
          <div class="sessiono">
            <div className="circle three">{results?.mark3}</div>
          </div>
          <Divider className="divider3">TECHNICAL</Divider>

          <div className="content">
            <div className="con">
              <p>
                <b>
                  Total no. of questions:
                  <br />
                  No. of Attended:
                  
                </b>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="submit_button">
        <Button
          onClick={() => {
            logout();
            gotohome();
          }}
          variant="contained"
        >
          submit
        </Button>
      </div>
    </div>
  );
}

export default Summary;
