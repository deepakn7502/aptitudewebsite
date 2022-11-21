import { Button, Checkbox } from "@mui/material";
import React, { useState } from "react";
import "./Instructions.css";

function Instructions() {
  const instructions =
    "An instruction set is a group of commands for a central processing unit (CPU) in machine language. The term can refer to all possible instructions for a CPU or a subset of instructions to enhance its performance in certain situations.An instruction set is a group of commands for a central processing unit (CPU) in machine language. The term can refer to all possible instructions for a CPU or a subset of instructions to enhance its performance in certain situations.An instruction set is a group of commands for a central processing unit (CPU) in machine language. The term can refer to all possible instructions for a CPU or a subset of instructions to enhance its performance in certain situations.An instruction set is a group of commands for a central processing unit (CPU) in machine language. The term can refer to all possible instructions for a CPU or a subset of instructions to enhance its performance in certain situations.An instruction set is a group of commands for a central processing unit (CPU) in machine language. The term can refer to all possible instructions for a CPU or a subset of instructions to enhance its performance in certain situations.An instruction set is a group of commands for a central processing unit (CPU) in machine language. The term can refer to all possible instructions for a CPU or a subset of instructions to enhance its performance in certain situations.An instruction set is a group of commands for a central processing unit (CPU) in machine language. The term can refer to all possible instructions for a CPU or a subset of instructions to enhance its performance in certain situations.An instruction set is a group of commands for a central processing unit (CPU) in machine language. The term can refer to all possible instructions for a CPU or a subset of instructions to enhance its performance in certain situations.An instruction set is a group of commands for a central processing unit (CPU) in machine language. The term can refer to all possible instructions for a CPU or a subset of instructions to enhance its performance in certain situations.An instruction set is a group of commands for a central processing unit (CPU) in machine language. The term can refer to all possible instructions for a CPU or a subset of instructions to enhance its performance in certain situations.";

  const [ischecked, setIsChecked] = useState(false);

  const handleStart = () => {
    if (ischecked) {
      window.location.pathname = "/sections";
    } else {
      alert("Error");
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
        <Button>I Accept</Button>
      </div>
      <div className="start">
        <Button variant="contained" color="success" onClick={handleStart}>
          Start Test
        </Button>
      </div>
    </div>
  );
}

export default Instructions;
