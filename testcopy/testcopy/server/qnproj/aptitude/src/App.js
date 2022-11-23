import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from "./Components/Test";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Main from "./Components/Main";
import Question from "./Components/Question";
import Summary from "./Components/Summary";
import Instructions from "./Components/Instructions";
import Sections from "./Components/Sections";
import AdminLogin from "./Components/AdminLogin";
import UploadFile from "./Components/UploadFile";
import DisplayData from "./Components/DisplayData";
import AdminDashboard from "./Components/AdminDashboard";
import StudentDashboard from "./Components/StudentDashboard";
import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const api = axios.create({
<<<<<<< HEAD:testcopy/server/qnproj/aptitude/src/App.js
  baseURL: `http://192.168.1.2:8000/`,
=======
  baseURL: `http://localhost:8000/`,
>>>>>>> e8fc769e2764e0bf17b6dda1a6f395c7dda75050:testcopy/testcopy/server/qnproj/aptitude/src/App.js
});

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
    console.log(user);
  }, [user]);

  let logout = () => {
    const user = localStorage.getItem("student");
    let res = api.put("login/", { user: user }).then(() => {
      localStorage.clear();
      window.location.pathname = "/";
    });
  };

  // return (
  //   <div>
  //     <Router>
  //       <Routes>
  //         <Route path="/" element={<Main />} />
  //         **
  //         <Route path="/login" element={<Login />} />
  //         **
  //         <Route path="/practice" element={<Test />} />
  //         <Route path="/register" element={<Register />} />
  //         **
  //         <Route path="/questions" element={<Question />} />
  //         <Route path="/summary" element={<Summary />} />*
  //         <Route path="/instructions" element={<Instructions />} />
  //         <Route path="/sections" element={<Sections />} />
  //         <Route path="/adminlogin" element={<AdminLogin />} />
  //         <Route path="/upload" element={<UploadFile />} />
  //       </Routes>
  //     </Router>
  //   </div>
  // );

  if (user) {
    if (user === "student") {
      return (
        <Router>
          <Routes>
            <Route path="/" element={<StudentDashboard logout={logout} />} />
            <Route path="/instructions" element={<Instructions />} />
            <Route path="/sections" element={<Sections />} />
            <Route path="/questions" element={<Question />} />
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
