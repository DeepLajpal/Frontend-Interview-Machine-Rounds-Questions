"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [counter, setCounter] = useState<number>(0);
  const onIncrease = () => {
    setCounter((prev) => prev + 1);
  };
  return (
    <div className={styles["home__container"]}>
      <h1>Question 1: Counter</h1>
      <button onClick={onIncrease}> Click {counter}</button>
    </div>
  );
}
