import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./QuestionSection.css";

function QuestionSection({ question }) {
  const [answers, setAnswers] = useState([]);

  const [value, setValue] = useState("");

  useEffect(() => {
    const handleOption = () => {
      answers[question.qnno - 1] = value;
    };
    handleOption();
  }, [value]);

 

  useEffect(() => {
    console.log(answers);
  }, [question, value]);

  const handleSelect = (e) => {
    setValue(e.target.value);
  };




  
  return (
    <div className="question-section">
      <div className="question">
        <p>{question.qnno}</p>
        <img
          src={require(`..build/static/media/${question.qn}`)}
          height="auto"
          width="300px"
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
                checked={answers[question.qnno - 1] === "A"}
              />
            </div>
            <div className="option">
              <FormControlLabel
                value="B"
                control={<Radio />}
                label="B"
                checked={answers[question.qnno - 1] === "B"}
              />
            </div>
            <div className="option">
              <FormControlLabel
                value="C"
                control={<Radio />}
                label="C"
                checked={answers[question.qnno - 1] === "C"}
              />
            </div>
            <div className="option">
              <FormControlLabel
                value="D"
                control={<Radio />}
                label="D"
                checked={answers[question.qnno - 1] === "D"}
              />
            </div>
          </div>
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default QuestionSection;
