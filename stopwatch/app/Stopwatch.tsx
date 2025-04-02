"use client";
import { useRef, useState } from "react";
// My Highest Time Taken to solve this question is : 1.5hr + 1hr

import styles from "./page.module.css";
interface timer {
  hrs: number;
  min: number;
  sec: number;
  ms: number;
}
export default function Stopwatch() {
  const timerObj = {
    hrs: 0,
    min: 0,
    sec: 0,
    ms: 0,
  };
  const [timerDetails, setTimerDetails] = useState<timer>(timerObj);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  const handleTimerTrigger = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
      setIsTimerRunning(false);
    }
    if (intervalId.current === null && !isTimerRunning) {
      const timerDetailsCopy = { ...timerDetails };
      const localIntervalId = setInterval(() => {
        timerDetailsCopy.ms = timerDetailsCopy.ms + 1;
        if (timerDetailsCopy.ms === 100) {
          timerDetailsCopy.sec = timerDetailsCopy.sec + 1;
          timerDetailsCopy.ms = 0;
        }
        if (timerDetailsCopy.sec === 60) {
          timerDetailsCopy.min = timerDetailsCopy.min + 1;
          timerDetailsCopy.sec = 0;
        }
        if (timerDetailsCopy.min === 60) {
          timerDetailsCopy.hrs = timerDetailsCopy.hrs + 1;
          timerDetailsCopy.min = 0;
        }
        setTimerDetails({ ...timerDetailsCopy });
      }, 10);
      intervalId.current = localIntervalId;
      setIsTimerRunning(true);
    }
  };
  const handleResetTimer = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
      setTimerDetails(timerObj);
      setIsTimerRunning(false);
    } else {
      setTimerDetails(timerObj);
    }
  };

  return (
    <div className={styles.page}>
      <h1>Stopwatch</h1>
      <p>
        {timerDetails?.hrs != 0 && `${timerDetails?.hrs}:`}
        {timerDetails?.min != 0 && `${timerDetails?.min}:`}
        {timerDetails?.min === 0
          ? timerDetails?.sec
          : `${String(timerDetails?.sec).padStart(2, "0")}`}
        .{String(timerDetails?.ms).padStart(2, "0")}
      </p>
      <div>
        <button onClick={handleTimerTrigger}>
          {!isTimerRunning ? "Start" : "Stop"}
        </button>
        <button onClick={handleResetTimer}>Reset</button>
      </div>
    </div>
  );
}
