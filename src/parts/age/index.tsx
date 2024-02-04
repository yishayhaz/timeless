import { ProgressBar } from "@/components/progress";
import { useCallback, useEffect, useState } from "react";
import styles from "./style.module.scss";
import { useSettings } from "@/ctx/settings";

export function AgeCompletion() {
  const settings = useSettings();

  const [age, setAge] = useState(0);
  const [completion, setCompletion] = useState(0);

  const getAge = useCallback(() => {
    const birthDate = new Date(settings.birthDate);
    const now = new Date();

    return (now.getTime() - birthDate.getTime()) / 86400000 / 365;
  }, [settings.birthDate]);

  const getCompletion = useCallback(() => {
    return (age / settings.lifeExpectancy) * 100;
  }, [age, settings.lifeExpectancy]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAge(getAge());
    }, 10);

    return () => clearInterval(interval);
  }, [getAge]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCompletion(getCompletion());
    }, 10);

    return () => clearInterval(interval);
  }, [getCompletion]);

  return (
    <div className={styles.container}>
      <span>You are {age.toFixed(9)}% years old.</span>
      <ProgressBar completion={completion} />
      <span>You completed {completion.toFixed(9)}% of your life</span>
    </div>
  );
}
