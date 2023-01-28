import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Question.css";
import { Timer } from "../Functions/Functions";
import QuestionSection from "./QuestionSection";
import { Button } from "@mui/material";
import ReactPagination from "react-paginate";

function Question({ answers, questions, section, tid, url }) {
  const api = axios.create({
    baseURL: `http://${url}:8000`,
  });

  const timer = Timer();

  const [pageNmbr, setPageNmbr] = useState(0);
  const qstnPerPage = 1;
  const qstnVisited = pageNmbr * qstnPerPage;

  const dispalyQuestion = questions
    ?.slice(qstnVisited, qstnVisited + qstnPerPage)
    .map((data) => {
      return <QuestionSection answers={answers} question={data} url={url} />;
    });

  const changePage = ({ selected }) => {
    setPageNmbr(selected);
  };

  const pagecount = Math.ceil(questions.length / qstnPerPage);

  const [user, setUser] = useState();

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem("student")));
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown, true);
  }, []);

  const detectKeyDown = (e) => {
    console.log(e.key);
  };

  const saveAns = () => {
    const answer = JSON.stringify(answers);
    sessionStorage.setItem(`${section}`, answer);
    window.location.pathname = "/sections";
  }

  // useEffect(() => {
  //  const  min = window.sessionStorage.getItem("min")
  //  const  sec = window.sessionStorage.getItem("sec")

  //   if (min === 0 & sec === 0) {
  //     saveAns()
  //   }
  // })

  return (
    <div className="question">
      <div className="user-container">
        <div className="info">
          <b>ROLL NO:</b>
          <h4>{user?.rollno}</h4>
        </div>
        <div className="info">
          <b>YEAR:</b>
          <h4>{user?.year}</h4>
        </div>
        <div className="info">
          <b>Section:</b>
          <h4>{user?.sec}</h4>
        </div>
        <div className="info">
          <b>TEST ID:</b>
          <h4>{tid}</h4>
        </div>
        <div className="info">
          <b>NO Of Questions:</b>
          <h4>15</h4>
        </div>
      </div>
      <div className="qstn-container">
        <div className="qstn-info">
          <div className="section">
            <h1>{section}</h1>
          </div>
          <div className="timer">
            <h1>
              <span>
                {timer.minutes < 10 ? "0" + timer.minutes : timer.minutes}
              </span>
              :
              <span>
                {timer.seconds < 10 ? "0" + timer.seconds : timer.seconds}
              </span>
            </h1>
          </div>
        </div>
        <div className="display-question">
          {dispalyQuestion}
          <br />
          <div className="pagination">
            <ReactPagination
              previousLabel={
                <Button variant="contained" color="success">
                  Previous
                </Button>
              }
              nextLabel={
                <Button variant="contained" color="success">
                  Next
                </Button>
              }
              pageCount={pagecount}
              onPageChange={changePage}
              containerClassName={"qstn-buttons"}
              previousLinkClassName={"prev-qstn"}
              nextLinkClassName={"next-qstn"}
              pageLinkClassName={"pagelink"}
            />
          </div>
        </div>
        <div className="nxt-section">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              saveAns()

            }}
          >
            Next Section
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Question;
