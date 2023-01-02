import React, { useEffect, useState } from "react";
import axios from "axios";
import Question from "./Question";

const api = axios.create({
  baseURL: `http://127.0.0.1:8000/`,
});


function QuestionDisplay() {
  const [questions, setQstns] = useState([]);

  const tid = sessionStorage.getItem("testid");

  const section = sessionStorage.getItem("section");

  useEffect(() => {
    let submit = () => {
      let res = api.get("qn/",tid,"/").then((res) => {
        setQstns(res.data);
      });
    };
    submit();
  }, []);

  const section1 = questions.slice(0, 15);
  const section2 = questions.slice(15, 30);
  const section3 = questions.slice(30, 45);

  const [answers1, setAnswers1] = useState([]);
  const [answers2, setAnswers2] = useState([]);
  const [answers3, setAnswers3] = useState([]);

  useEffect(() => {
    setAnswers1(JSON.parse(window.sessionStorage.getItem("section1")));
    setAnswers2(JSON.parse(window.sessionStorage.getItem("section2")));
    setAnswers3(JSON.parse(window.sessionStorage.getItem("section3")));
    console.log(answers1);
    console.log(answers2);
    console.log(answers3);
  }, []);

  if (section === "section1") {
    return (
      <div>
        <Question
          questions={section1}
          tid={tid}
          section={section}
          answers={answers1}
        />
      </div>
    );
  } else if (section === "section2") {
    return (
      <div>
        <Question
          questions={section2}
          tid={tid}
          section={section}
          answers={answers2}
        />
      </div>
    );
  } else if (section === "section3") {
    return (
      <div>
        <Question
          questions={section3}
          tid={tid}
          section={section}
          answers={answers3}
        />
      </div>
    );
  }
}

export default QuestionDisplay;
