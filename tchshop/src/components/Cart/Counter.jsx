import { useEffect, useRef, useState } from "react";

const formatTime = time => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);

  if (minutes <= 10) minutes = "0" + minutes;
  if (seconds <= 10) seconds = "0" + seconds;
  return minutes + ':' + seconds
};
const Counter = () => {
  const [countdown, setCountDown] = useState(3600);
  const timerId = useRef();

  useEffect(() => {
    timerId.current = setInterval(() => {
      setCountDown(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timerId.current);
  }, []);

  useEffect(() => {
      if (countdown <= 0) {
          clearInterval(timerId.current)
      }
  }, [countdown])

  return (<p>Timer: {formatTime(countdown)}</p>)
};

export default Counter;
