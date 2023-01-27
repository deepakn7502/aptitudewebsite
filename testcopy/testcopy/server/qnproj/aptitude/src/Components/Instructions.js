import { Button, Checkbox } from "@mui/material";
import React, { useState } from "react";
import "./Instructions.css";
import axios from "axios";

function Instructions({ url, setStart }) {
  const api = axios.create({
    baseURL: `http://${url}:8000`,
  });

  const int1 =
    "Fill up your personal details carefully. All questions are compulsory.";
  const int2 = " Try to submit the paper in 30-35 minutes.";
  const int3 =
    " You are allowed to submit only once, make sure that you have correctly attempted all the questions before submission.";
  const int4 =
    " Make sure you clicked on submit button to successfully complete the test.";
  const int5 = " Form will be active for two hours only.";
  const int6 =
    " For session-I 10.45AM to 11.25AM and for session-II 11.25AM to 12.05 PM.";
  //  const int7="For Queries Contact Mr. DEEPAK N, Mr.ARUN KUMAR J, Mr. BHARATHWAJ M, Mr. DANIEL GEORGE S."
  const [ischecked, setIsChecked] = useState(false);

  const handleStart = () => {
    window.location.pathname = "/sections";
  };

  const [answers1, setAnswers1] = useState([]);
  const [answers2, setAnswers2] = useState([]);
  const [answers3, setAnswers3] = useState([]);

  const handleDeclaration = () => {
    for (var i = 0; i < 16; i++) {
      if (i < 15) {
        answers1[i] = "";
        answers2[i] = "";
        answers3[i] = "";
      } else if (i === 15) {
        const section1 = JSON.stringify(answers1);
        const section2 = JSON.stringify(answers2);
        const section3 = JSON.stringify(answers3);
        window.sessionStorage.setItem("section1", section1);
        window.sessionStorage.setItem("section2", section2);
        window.sessionStorage.setItem("section3", section3);
      }
    }
    setStart(true);
  };

  return (
    <div className="instructions">
      <h1>General Instructions</h1>
      <div className="instructions-text">
        <p>{int1}</p>
        <p>{int2}</p>
        <p>{int3}</p>
        <p>{int4}</p>
        <p>{int5}</p>
        <p>{int6}</p>
        {/* <p>{int7}</p> */}
      </div>
      <div className="accept">
        <Checkbox
          onChange={(e) => {
            setIsChecked(e.target.checked);
          }}
        />
        <Button>Agree</Button>
      </div>
      <div className="start">
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            handleStart();
            handleDeclaration();
          }}
          disabled={!ischecked}
        >
          Start Test
        </Button>
      </div>
    </div>
  );
}

export default Instructions;
