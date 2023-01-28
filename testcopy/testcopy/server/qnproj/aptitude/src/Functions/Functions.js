import { useEffect, useState } from "react";

export function Timer() {
  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(29);

  var time;

  useEffect(() => {
    time = setInterval(() => {
      if (seconds === 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        setSeconds(seconds - 1);
      }

      if (minutes === 0 && seconds === 0) {
        setMinutes(0);
        setSeconds(0);
      }
    }, 1);
    return () => clearInterval(time);
  });
  return { minutes, seconds };
}
