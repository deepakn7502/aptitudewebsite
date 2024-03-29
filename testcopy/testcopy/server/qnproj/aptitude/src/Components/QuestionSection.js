import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./QuestionSection.css";
import axios from "axios";

function QuestionSection({ question, answers, url }) {
  const api = axios.create({
    baseURL: `http://${url}:8000`,
  });

  var [index, setIndex] = useState(0);
  const data = question.qn;

  const handleSelect = (e) => {
    const selected = e.target.value;
    if (sessionStorage.getItem("section") === "section1") {
      index = question.qnno - 1;
      answers[index] = selected;
    } else if (sessionStorage.getItem("section") === "section2") {
      index = question.qnno - 16;
      answers[index] = selected;
    } else if (sessionStorage.getItem("section") === "section3") {
      index = question.qnno - 31;
      answers[index] = selected;
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("section") === "section1") {
      setIndex(question.qnno - 1);
    } else if (sessionStorage.getItem("section") === "section2") {
      setIndex(question.qnno - 16);
    } else if (sessionStorage.getItem("section") === "section3") {
      setIndex(question.qnno - 31);
    }
  }, [question]);

  return (
    <div className="question-section">
      <div className="question" key={question.qnno}>
        <p>{question.qnno}</p>
        <img
          src={`data:image/jpeg;base64,${data}`}
          height="250px"
          width="750px"
        />
      </div>
      <FormControl>
        <RadioGroup
          onChange={(e) => {
            handleSelect(e);
          }}
        >
          <div className="options">
            <div className="option">
              <FormControlLabel
                value="A"
                control={<Radio />}
                label="A"
                checked={answers[index] === "A"}
              />
            </div>
            <div className="option">
              <FormControlLabel
                value="B"
                control={<Radio />}
                label="B"
                checked={answers[index] === "B"}
              />
            </div>
            <div className="option">
              <FormControlLabel
                value="C"
                control={<Radio />}
                label="C"
                checked={answers[index] === "C"}
              />
            </div>
            <div className="option">
              <FormControlLabel
                value="D"
                control={<Radio />}
                label="D"
                checked={answers[index] === "D"}
              />
            </div>
          </div>
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default QuestionSection;
