import { useEffect, useState } from "react";

export function Timer() {
  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(29);

  var time;

  useEffect(() => {
    time = setInterval(() => {
      setSeconds(seconds - 1);

      if (seconds === 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
      if (seconds === 0 && minutes === 0) {
        setMinutes(0);
        setSeconds(0);
      }
    }, 1000);
    return () => clearInterval(time);
  });
  return { minutes, seconds };
}
