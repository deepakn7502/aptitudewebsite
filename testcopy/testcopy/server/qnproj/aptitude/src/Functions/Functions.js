import { useEffect, useState } from "react";

export function Timer() {
  const [seconds, setSeconds] = useState(window.sessionStorage.getItem("sec"));
  const [minutes, setMinutes] = useState(window.sessionStorage.getItem("min"));

  var time;

  useEffect(() => {
    time = setInterval(() => {
      // seconds = window.sessionStorage.getItem("sec");
      // minutes = window.sessionStorage.getItem("min");
      if (seconds === 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
      if (seconds === 0 && minutes === 0) {
        setMinutes(0);
        setSeconds(0);
      }
      window.sessionStorage.setItem("sec", seconds);
      window.sessionStorage.setItem("min", minutes);
    }, 1000);
    return () => clearInterval(time);
  });
  return { minutes, seconds };
}
