import { useCallback, useEffect, useState } from "react";
import styles from "./style.module.scss";
import { daysInYear } from "../../utils";
import { ProgressBar } from "@/components/progress";

export const YearCompletion = () => {
  const [thisYear, setThisYear] = useState(new Date().getFullYear());
  const [completion, setCompletion] = useState(0);

  const handleSetCompletion = useCallback(() => {
    const now = new Date();
    const firstDay = new Date(`${now.getFullYear()}-01-01T00:00:00.000Z`);

    const days = (now.getTime() - firstDay.getTime()) / 86400000;
    const daysThisYear = daysInYear(now.getFullYear());

    setCompletion(Number(((days / daysThisYear) * 100).toFixed(6)));
    setThisYear(now.getFullYear());
  }, []);

  useEffect(() => {
    const interval = setInterval(handleSetCompletion, 10);

    return () => clearInterval(interval);
  }, [handleSetCompletion]);

  return (
    <div className={styles.container}>
      <span>
        {thisYear} is {completion + "%"} complete
      </span>
      <ProgressBar completion={completion} />
    </div>
  );
};
