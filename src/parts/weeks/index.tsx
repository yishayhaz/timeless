import { useSettings } from "@/ctx/settings";
import { useMemo } from "react";
import styles from "./style.module.scss";

export function WeeksCompletion() {
  const settings = useSettings();

  const age = useMemo(() => {
    const birthDate = new Date(settings.birthDate);
    const now = new Date();

    return (now.getTime() - birthDate.getTime()) / 86400000 / 365;
  }, [settings.birthDate]);

  const line = useMemo(() => {
    const totalWeeks = settings.lifeExpectancy * 52;
    const weeksLived = Math.floor(age * 52);
    const completion = (weeksLived / totalWeeks) * 100;

    return `You lived ${weeksLived} out of ${totalWeeks} 
    expected weeks (${completion.toFixed(2)}%).`;
  }, [settings.lifeExpectancy, age]);

  return (
    <div className={styles.container}>
      <div>
        <span>{line}</span>
      </div>
      <div className={styles.weeks}>
        {Array.from({ length: settings.lifeExpectancy }).map((_, weekIdx) =>
          Array.from({ length: 52 }).map((_, yearIdx) => (
            <div
              key={yearIdx}
              className={styles.weeks__cell}
              data-has-passed={weekIdx * 52 + yearIdx < age * 52}
            ></div>
          ))
        )}
      </div>
    </div>
  );
}
