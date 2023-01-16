import { Button, Checkbox } from "@mui/material";
import React, { useState } from "react";
import "./Instructions.css";
import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:8000`,
});

function Instructions() {
  const instructions =
    "An instruction set is a group of commands for a central processing unit (CPU) in machine language. The term can refer to all possible instructions for a CPU or a subset of instructions to enhance its performance in certain situations.An instruction set is a group of commands for a central processing unit (CPU) in machine language. The term can refer to all possible instructions for a CPU or a subset of instructions to enhance its performance in certain situations.An instruction set is a group of commands for a central processing unit (CPU) in machine language. The term can refer to all possible instructions for a CPU or a subset of instructions to enhance its performance in certain situations.An instruction set is a group of commands for a central processing unit (CPU) in machine language. The term can refer to all possible instructions for a CPU or a subset of instructions to enhance its performance in certain situations.An instruction set is a group of commands for a central processing unit (CPU) in machine language. The term can refer to all possible instructions for a CPU or a subset of instructions to enhance its performance in certain situations.An instruction set is a group of commands for a central processing unit (CPU) in machine language. The term can refer to all possible instructions for a CPU or a subset of instructions to enhance its performance in certain situations.An instruction set is a group of commands for a central processing unit (CPU) in machine language. The term can refer to all possible instructions for a CPU or a subset of instructions to enhance its performance in certain situations.An instruction set is a group of commands for a central processing unit (CPU) in machine language. The term can refer to all possible instructions for a CPU or a subset of instructions to enhance its performance in certain situations.An instruction set is a group of commands for a central processing unit (CPU) in machine language. The term can refer to all possible instructions for a CPU or a subset of instructions to enhance its performance in certain situations.An instruction set is a group of commands for a central processing unit (CPU) in machine language. The term can refer to all possible instructions for a CPU or a subset of instructions to enhance its performance in certain situations.";

  const [ischecked, setIsChecked] = useState(false);

  const handleStart = () => {
    window.location.pathname = "/sections";
    window.sessionStorage.setItem("sec", 0);
    window.sessionStorage.setItem("min", 30);
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
  };

  return (
    <div className="instructions">
      <h1>General Instructions</h1>
      <div className="instructions-text">
        <p>{instructions}</p>
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
