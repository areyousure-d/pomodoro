import React, { FC, useEffect, useState } from "react";

const Timer: FC = () => {
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [isTimerStarted, setIsTimerStarted] = useState(false);

  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsLeft - Number(minutes) * 60)
    .toString()
    .padStart(2, "0");

  const startTimer = () => {
    setIsTimerStarted(true);
  };
  const stopTimer = () => {
    setIsTimerStarted(false);
  };
  const resetTimer = () => {
    setIsTimerStarted(false);
    setSecondsLeft(10);
  };

  useEffect(() => {
    if (isTimerStarted) {
      const interval = setInterval(() => {
        if (secondsLeft > 1) {
          setSecondsLeft((secondsLeft) => secondsLeft - 1);
        } else {
          setSecondsLeft(0);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  });

  return (
    <div>
      <div>
        {minutes} : {seconds}
      </div>
      <div>
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;
