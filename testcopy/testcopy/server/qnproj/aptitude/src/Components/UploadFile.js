import { Button, Divider, FormLabel, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import * as React from "react";
import _ from "lodash";
import "./UploadFile.css";
import Navbar from "./Navbar";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";



function UploadFile({ logout, url }) {
  const api = axios.create({
    baseURL: `http://${url}:8000`,
  });

  const [tid, setid] = useState("PEC212");
  const [imgs, setimgs] = useState();
  const [ans, setans] = useState();
  const reader = new FileReader();

  //file upload api call
  let upload = async () => {
    const uploaddata = new FormData();

    _.forEach(imgs, (file) => {
      uploaddata.append("qns", file);
    });

    uploaddata.append("ans", ans);
    uploaddata.append("testid", tid);

    let res = await api.post("qn/", uploaddata).then((res) => {
      localStorage.setItem("testid", tid);
      alert(JSON.stringify(res.data));
    });
  };

  let setTestID = (e) => {
    var d = new Date(e.target.value);
    var day = d.getDate();
    var mon = d.getMonth();
    mon++;
    if (day < 10) {
      day = "0" + day;
    }
    if (mon < 10) {
      mon = "0" + mon;
    }
    setid("PEC" + day + mon);
  };

  return (
    <div className="upload">
      <Navbar logout={logout} />
      <div className="head">UPLOAD PAGE</div>
      <div className="uploadfile">
        <label>ENTER THE DATE:</label>
        <TextField type="date" onChange={(e) => setTestID(e)} />
        <label>CHOOSE FILES TO BE UPLOADED:</label>
        <Button variant="contained" component="label">
          Questions
          <input
            hidden
            accept="*"
            multiple
            type="file"
            onChange={(e) => setimgs(e.target.files)}
          />
        </Button>
        <Button variant="contained" component="label">
          Answer
          <input
            hidden
            type="file"
            onChange={(e) => reader.readAsText(e.target.files[0])}
          />
        </Button>
        <Button
          variant="contained"
          color="success"
          endIcon={<DriveFolderUploadIcon />}
          onClick={upload}
        >
          UPLOAD
        </Button>
      </div>
    </div>
  );
}

export default UploadFile;
