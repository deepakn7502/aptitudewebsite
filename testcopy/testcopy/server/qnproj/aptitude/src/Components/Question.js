import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Question.css";
import { Timer } from "../Functions/Functions";
import QuestionSection from "./QuestionSection";
import { Button } from "@mui/material";
import ReactPagination from "react-paginate";

const api = axios.create({
<<<<<<< HEAD:testcopy/server/qnproj/aptitude/src/Components/Question.js
  baseURL: `http://192.168.1.2:8000/`,
=======
  baseURL: `http://localhost:8000/`,
>>>>>>> e8fc769e2764e0bf17b6dda1a6f395c7dda75050:testcopy/testcopy/server/qnproj/aptitude/src/Components/Question.js
});

function Question() {
  const timer = Timer();

  //question get api call

  const [questions, setQstns] = useState([]);
  const [smp, setsmp] = useState([]);
  const [qns, setQns] = useState({});
  // const tid = "CSE8110";
  const tid = localStorage.getItem("testid");

  useEffect(() => {
    let submit = () => {
      console.log(tid)
<<<<<<< HEAD:testcopy/server/qnproj/aptitude/src/Components/Question.js
      let res = api.get("qn/PEC2211/").then((res) => {
        console.log("Hello")
=======
      let res = api.get("qn/" + tid + "/").then((res) => {
>>>>>>> e8fc769e2764e0bf17b6dda1a6f395c7dda75050:testcopy/testcopy/server/qnproj/aptitude/src/Components/Question.js
        setQstns(res.data);
      });
    };

    submit();
  }, []);

  let validate = (ans) => {
    let res = api.post("validate/", ans).then(() => {
      alert(res.data);
    });
  };

  const [pageNmbr, setPageNmbr] = useState(0);
  const qstnPerPage = 1;
  const qstnVisited = pageNmbr * qstnPerPage;

  const dispalyQuestion = questions
    .slice(qstnVisited, qstnVisited + qstnPerPage)
    .map((data) => {
      return <QuestionSection question={data} />;
    });

  const changePage = ({ selected }) => {
    setPageNmbr(selected);
  };

  const pagecount = Math.ceil(questions.length / qstnPerPage);
  return (
    <div className="question">
      <div className="user-container">
        <p>ROLL NO:</p>
        <p>YEAR:</p>
        <p>Section:</p>
        <p>TEST ID:</p>
        <p>NO Of Questions:</p>
      </div>
      <div className="qstn-container">
        <div className="qstn-info">
          <div className="section">
            <h1>Section Name</h1>
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
              previousLabel={<Button variant="contained">Prev question</Button>}
              nextLabel={<Button variant="contained">Next question</Button>}
              pageCount={pagecount}
              onPageChange={changePage}
              containerClassName={"qstn-buttons"}
              previousLinkClassName={"prev-qstn"}
              nextLinkClassName={"next-qstn"}
              activeClassName={"active-page"}
            />
          </div>
        </div>
        <div className="nxt-section">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              window.location.pathname = "summary";
            }}
          >
            Next section
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Question;
