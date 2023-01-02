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
import axios from "axios";
import QuestionDisplay from "./Components/QuestionDisplay";

const api = axios.create({
  baseURL: `http://localhost:8000`,
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
      window.sessionStorage.clear();
      window.location.pathname = "/";
    });
  };
  if (user) {
    if (user === "student") {
      return (
        <Router>
          <Routes>
            <Route path="/" element={<StudentDashboard logout={logout} />} />
            <Route path="/instructions" element={<Instructions />} />
            <Route path="/sections" element={<Sections />} />
            <Route path="/questions" element={<QuestionDisplay />} />
            <Route path="/summary" element={<Summary />} />
          </Routes>
        </Router>
      );
    } else if (user === "staff") {
      return (
        <Router>
          <Routes>
            <Route path="/" element={<AdminDashboard logout={logout} />} />
            <Route path="/upload" element={<UploadFile />} />
            <Route path="/displaydata" element={<DisplayData />} />
          </Routes>
        </Router>
      );
    }
  } else {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    );
  }
}
export default App;
