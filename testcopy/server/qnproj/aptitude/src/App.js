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
  baseURL: `/`,
});

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

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
    let res = api.put("login/", { user: user }).then(() => {
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
            <Route path="/" element={<StudentDashboard logout={logout} api={api} />} />
            <Route path="/instructions" element={<Instructions />} api={api}/>
            <Route path="/sections" element={<Sections />} api={api}/>
            <Route path="/questions" element={<QuestionDisplay />} api={api}/>
            <Route path="/summary" element={<Summary />} api={api}/>
          </Routes>
        </Router>
      );
    } else if (user === "staff") {
      return (
        <Router>
          <Routes>
            <Route path="/" element={<AdminDashboard logout={logout} />} api={api}/>
            <Route path="/upload" element={<UploadFile />} api={api}/>
            <Route path="/displaydata" element={<DisplayData />} api={api}/>
          </Routes>
        </Router>
      );
    }
  } else {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Main />} api={api}/>
          <Route path="/login" element={<Login />} api={api}/>
          <Route path="/adminlogin" element={<AdminLogin />} api={api}/>
          <Route path="/register" element={<Register />} api={api}/>
        </Routes>
      </Router>
    );
  }
}
export default App;
