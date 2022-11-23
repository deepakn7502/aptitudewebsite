import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./QuestionSection.css";

function QuestionSection({ question, answers,api }) {

  var [index, setIndex] = useState(0);

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

<<<<<<< HEAD


  
=======
  useEffect(() => {
    if (sessionStorage.getItem("section") === "section1") {
      setIndex(question.qnno - 1);
    } else if (sessionStorage.getItem("section") === "section2") {
      setIndex(question.qnno - 16);
    } else if (sessionStorage.getItem("section") === "section3") {
      setIndex(question.qnno - 31);
    }
  }, [question]);
>>>>>>> f42e648177787ef8b573432c5232c2838fc4c350
  return (
    <div className="question-section">
      <div className="question" key={question.qnno}>
        <p>{question.qnno}</p>
        <img
<<<<<<< HEAD
          src={question.qn}
          height="auto"
=======
          src={require(`../qnimages/media/${question.qn}`)}
          height="100px"
>>>>>>> f42e648177787ef8b573432c5232c2838fc4c350
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
