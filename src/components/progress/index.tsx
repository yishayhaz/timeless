import React from "react";
import styles from "./style.module.scss";

export type ProgressBarProps = {
  completion: number;
};

export function ProgressBar({ completion }: ProgressBarProps) {
  return (
    <div className={styles.bar}>
      <div
        className={styles.bar__progress}
        style={{ left: 0 - (100 - completion) + "%" }}
      />
    </div>
  );
}
