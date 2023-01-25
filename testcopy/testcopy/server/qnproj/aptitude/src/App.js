import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Main from "./Components/Main";
import Summary from "./Components/Summary";
import Instructions from "./Components/Instructions";
import Sections from "./Components/Sections";
import AdminLogin from "./Components/AdminLogin";
import UploadFile from "./Components/UploadFile";
import DisplayData from "./Components/DisplayData";
import AdminDashboard from "./Components/AdminDashboard";
import StudentDashboard from "./Components/StudentDashboard";
import Result from "./Components/Result";
import axios from "axios";
import QuestionDisplay from "./Components/QuestionDisplay";

const url = window.location.hostname;

const api = axios.create({
  baseURL: `http://${url}:8000`,
});


axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const student = localStorage.getItem("student");
    if (student) {
      setUser("student");
    }
    const staff = localStorage.getItem("staff");
    if (staff) {
      setUser("staff");
    }
  }, [user]);

  let logout = () => {
    const user = localStorage.getItem("student");
    let res = api.put("log/", { user: user }).then(() => {
      window.localStorage.clear();
      window.location.pathname = "/";
    });
  };
  if (user) {
    if (user === "student") {
      return (
        <Router>
          <Routes>
            <Route
              path="/"
              element={<StudentDashboard logout={logout} url={url} />}
            />
            <Route path="/instructions" element={<Instructions url={url} />} />
            <Route path="/sections" element={<Sections url={url} />} />
            <Route path="/questions" element={<QuestionDisplay url={url} />} />
            <Route path="/summary" element={<Summary url={url} />} />
          </Routes>
        </Router>
      );
    } else if (user === "staff") {
      return (
        <Router>
          <Routes>
            <Route
              path="/"
              element={<AdminDashboard  url={url} />}
            />
            <Route
              path="/upload"
              element={<UploadFile logout={logout} url={url} />}
            />
            <Route
              path="/displaydata"
              element={<DisplayData logout={logout} url={url} />}
            />
            <Route path="/result" element={<Result url={url} />} />
          </Routes>
        </Router>
      );
    }
  } else {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Main url={url} />} />
          <Route path="/login" element={<Login url={url} />} />
          <Route path="/adminlogin" element={<AdminLogin url={url} />} />
          <Route path="/register" element={<Register url={url} />} />
        </Routes>
      </Router>
    );
  }
}
export default App;
