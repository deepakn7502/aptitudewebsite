import React, { useState, useRef, useEffect } from "react";
import "./Practice.css";
import { Button } from "@mui/material"
function Practics() {
  return (
    <div className="main">
      <div className="cont">
        <div className="head">
          <b> PEC-APTITUDE</b>
          <br />
        </div>
      </div>
      <div className="grid">
          <div >
            <p className="i1">ROLL NO:</p>
            <p className="i1">YEAR:</p>
            <p className="i1">TEST ID:</p>
            <p className="i1">Total Marks:</p>
            <p className="i1">Section:</p>
            <p className="i1">NO Of Questions:</p>
            
            </div>
            
        
      </div>
      <Button variant="contained">Next sec</Button>
      <div className="nq">
      <Button variant="contained">Next question</Button>
      </div>
      <div className="pq">
      <Button variant="contained">prev question</Button>
      </div>
    </div>
  );
}

export default Practics;
