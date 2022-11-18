import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import _ from "lodash";
import "./UploadFile.css";

const api = axios.create({
  baseURL: `http://localhost:8000/`,
});

function UploadFile() {
  const [ans, setans] = useState("");
  const [imgs, setimgs] = useState([]);
  const [tid, setid] = useState("");

  const [session, setsession] = React.useState("");

  const handleChange = (event) => {
    setsession(event.target.value);
  };

  //file upload api call
  let upload = async () => {
    const uploaddata = new FormData();

    _.forEach(imgs, (file) => {
      uploaddata.append("qns", file);
    });
    uploaddata.append("testid", tid);
    uploaddata.append("ans", ans);

    let res = await api.post("qn/", uploaddata).then((res) => {
      localStorage.setItem("testid", tid);
      alert(JSON.stringify(res.data));
    });
  };

  let disp = (e) => {
    var d = new Date(e.target.value);
    console.log(d);
    const day = d.getDate();
    var mon = d.getUTCMonth();
    mon++;
    setid("PEC" + day + mon);
    console.log(tid);
  };

  let updans = (e) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      setans(e.target.result);
    };
    reader.readAsText(e.target.files[0]);
  };

  return (
    <div className="UploadFile">
      <TextField type="date" onChange={(e) => disp(e)}></TextField>
      <br />
      <br />
      <input
        type="file"
        multiple
        className="form-control"
        onChange={(e) => setimgs(e.target.files)}
        required
      />
      <input
        type="file"
        multiple
        className="form-control"
        onChange={(e) => updans(e)}
        required
      />
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Session</InputLabel>
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

      <Button onClick={upload}>SUBMIT</Button>
    </div>
  );
}

export default UploadFile;
