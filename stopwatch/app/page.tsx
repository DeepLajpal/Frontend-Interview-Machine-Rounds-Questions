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
export default function Home() {
  const [timerDetails, setTimerDetails] = useState<timer>({
    hrs: 0,
    min: 0,
    sec: 0,
    ms: 0,
  });
  // const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  const handleTimerTrigger = () => {
    if (intervalId.current) {
      console.log(intervalId.current);
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
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
    // setIntervalId(localIntervalId);
    intervalId.current = localIntervalId;
    console.log(localIntervalId);
    console.log(intervalId);
  };
  const handleResetTimer = () => {
    if (intervalId.current) {
      console.log(intervalId.current);
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

  return (
    <div className={styles.page}>
      <h1>Stopwatch</h1>
      <p>
        {/* {timerDetails?.hrs != 0 &&
          `${String(timerDetails?.hrs).padStart(2, "0")}:`}
        {timerDetails?.min != 0 &&
          `${String(timerDetails?.min).padStart(2, "0")}:`}
        {String(timerDetails?.sec).padStart(2, "0")}. */}
        {timerDetails?.ms}
      </p>
      <div>
        <button onClick={handleTimerTrigger}>Start</button>
        <button onClick={handleResetTimer}>Stop</button>
      </div>
    </div>
  );
}
