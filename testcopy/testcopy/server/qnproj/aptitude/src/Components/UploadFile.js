import { Button, Divider, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import _ from "lodash";
import "./UploadFile.css";
import Icon from "@mui/icons-material/DriveFolderUploadSharp";
import Arrow from "@mui/icons-material/ArrowDropDown";



function UploadFile({api}) {
  const [username, setId] = useState("");
  const [password, setRegno] = useState("");
  const [tid, setid] = useState("CSE04011");
  const [session, setsession] = React.useState("");

  const handleChange = (event) => {
    setsession(event.target.value);
  };
  const [imgs, setimgs] = useState([]);

  //file upload api call
  let upload = async () => {
    const uploaddata = new FormData();

    _.forEach(imgs, (file) => {
      uploaddata.append("qns", file);
    });
    uploaddata.append("testid", tid);
    let res = await api.post("qn/", uploaddata).then((res) => {
      localStorage.setItem("testid", tid);
      alert(JSON.stringify(res.data));
    });
  };

  let disp = (e) => {
    var d = new Date(e.target.value);
    const day = d.getDate();
    var mon = d.getMonth();
    mon++;
    setid("CSE" + day + mon + "0");
  };

  return (
    <div className="up">
      <div className="head">
        <h1>UPLOAD PAGE</h1>
      </div>
      <div className="UploadFile">
        <div className="p">ENTER THE DATE:</div>
        <TextField
          className="def"
          type="date"
          onChange={(e) => disp(e)}
        ></TextField>
        <br />
        <br />
        <div className="pp">CHOOSE FILES TO BE UPLOADED:</div>
        <div className="bt">
          <Button variant="contained" endIcon={<Arrow />} component="label">
            Question Upload
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              className="form-control"
              onChange={(e) => setimgs(e.target.files)}
              required
            />
          </Button>
        </div>
        <br />
        <div className="btn">
          <Button variant="contained" endIcon={<Arrow />} component="label">
            Answers Upload
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              className="form-control"
              onChange={(e) => setimgs(e.target.files)}
              required
            />
          </Button>
        </div>
        <div className="ppp">SELECT SESSION:</div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel className="default" id="demo-simple-select-helper-label">
            Session
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={session}
            label="session"
            onChange={handleChange}
          >
            <MenuItem value={"A"}>Forenoon</MenuItem>
            <MenuItem value={"B"}>Afternoon</MenuItem>
          </Select>
        </FormControl>
        <div className="divider">
          <Divider>------------------------------------------</Divider>
        </div>
        <div className="btt">
          <Button variant="contained" endIcon={<Icon />} onClick={upload}>
            UPLOAD
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UploadFile;
