import React, { FC, useEffect, useState } from "react";

import { getMinutes, getSeconds } from "../../helpers";
import SetTimesForm from "../set-times-form";

import styles from "./timer.module.css";

const Timer: FC = () => {
  const [title, setTitle] = useState("start pomodoro");
  const [workTime, setWorkTime] = useState(10);
  const [restTime, setRestTime] = useState(5);
  const [isWork, setIsWork] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(workTime);
  const [isTimerStarted, setIsTimerStarted] = useState(false);

  const [isFormVisible, setIsFormVisible] = useState(false);

  const minutes = getMinutes(secondsLeft).toString().padStart(2, "0");
  const seconds = getSeconds(secondsLeft).toString().padStart(2, "0");

  const startTimer = () => {
    setIsTimerStarted(true);
    setTitle("focus on your task");
  };
  const pauseTimer = () => {
    setTitle("pause...");
    setIsTimerStarted(false);
  };
  const stopTimer = () => {
    setTitle("start pomodoro");
    setIsTimerStarted(false);
    setSecondsLeft(workTime);
    setIsWork(true);
  };

  const onSubmit = (newWorkTime: number, newRestTime: number): void => {
    setWorkTime(newWorkTime);
    setRestTime(newRestTime);
    //setSecondsLeft(newWorkTime);
  };

  const showForm = () => {
    setIsFormVisible(true);
  };

  const hideForm = () => {
    setIsFormVisible(false);
  };

  useEffect(() => {
    if (isTimerStarted) {
      const interval = setInterval(() => {
        if (secondsLeft > 0) {
          setSecondsLeft((secondsLeft) => secondsLeft - 1);
        } else {
          // if secondsLeft == 0 (timer ended) and it was work time
          if (isWork) {
            // set secondsLeft to restTime
            setSecondsLeft(restTime);
            // change status to rest time
            setIsWork(false);
            //set title for rest time
            setTitle("short break");
          } else {
            // if it was rest time
            // stop timer
            setIsTimerStarted(false);
            // set timer interval to work time
            setSecondsLeft(workTime);
            // set status to workTime
            setIsWork(true);
            // set title for default
            setTitle("start pomodoro");
          }
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  });

  return (
    <div className={styles.timer}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.clock}>
        {minutes} : {seconds}
      </div>
      <div className={styles.buttons}>
        <button
          onClick={isTimerStarted ? pauseTimer : startTimer}
          className={isTimerStarted ? styles.pause_btn : styles.start_btn}
        >
          {isTimerStarted ? (
            <i className="fa fa-pause"></i>
          ) : (
            <i className="fa fa-play"></i>
          )}
        </button>
        <button onClick={stopTimer} className={styles.stop_btn}>
          <i className="fa fa-stop"></i>
        </button>
      </div>
      <SetTimesForm
        onSubmit={onSubmit}
        workTime={workTime}
        restTime={restTime}
        isFormVisible={isFormVisible}
        hideForm={hideForm}
      />
      <button className={styles.cog_btn} onClick={showForm}>
        <i className="fa fa-cog"></i>
      </button>
    </div>
  );
};

export default Timer;
