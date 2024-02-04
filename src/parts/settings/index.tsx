import React, { useEffect, useMemo, useState } from "react";
import styles from "./style.module.scss";
import { useSettings } from "@/ctx/settings";

export function Settings() {
  const settings = useSettings();
  const [showPopup, _setShowPopup] = useState(false);

  const [lifeExpectancy, setLifeExpectancy] = useState<number>(
    settings.lifeExpectancy
  );
  const [birthDate, setBirthDate] = useState<string>(settings.birthDate);

  const setShowPopup = (value: boolean) => {
    _setShowPopup(value);

    document.body.style.overflow = value ? "hidden" : "auto";
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    settings.setLifeExpectancy(lifeExpectancy);
    settings.setBirthDate(new Date(birthDate));
    setShowPopup(false);
  };

  useEffect(() => {
    setLifeExpectancy(settings.lifeExpectancy);
    setBirthDate(settings.birthDate);
  }, [settings]);

  const isChanged = useMemo(() => {
    return (
      settings.lifeExpectancy !== lifeExpectancy ||
      settings.birthDate !== birthDate
    );
  }, [settings, lifeExpectancy, birthDate]);

  return (
    <>
      {!showPopup ? null : (
        <div className={styles.settings_popup}>
          <div className={styles.settings_popup__header}>
            <h2>Settings</h2>
            <button onClick={() => setShowPopup(false)}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z"></path>
              </svg>
            </button>
          </div>
          <div className={styles.settings_popup__content}>
            <form onSubmit={handleSave}>
              <div className={styles.form_fields}>
                <label htmlFor="birthdate">
                  <span>Birth date</span>
                  <input
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    defaultValue={settings.birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </label>
                <label htmlFor="life-expectancy">
                  <span>Life expectancy</span>
                  <input
                    type="number"
                    id="life-expectancy"
                    name="life-expectancy"
                    value={lifeExpectancy}
                    onChange={(e) => setLifeExpectancy(Number(e.target.value))}
                  />
                  <small>Avg - Male: 70.8, Female: 76</small>
                </label>
              </div>
              <button disabled={!isChanged}>Save</button>
            </form>
          </div>
        </div>
      )}

      <div className={styles.settings_action}>
        <button onClick={() => setShowPopup(true)}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"></path>
          </svg>
        </button>
      </div>
    </>
  );
}
