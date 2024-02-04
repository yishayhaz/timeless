import {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";

export type SettingsContextType = {
  lifeExpectancy: number;
  setLifeExpectancy: (value: number) => void;

  birthDate: string;
  setBirthDate: (value: Date) => void;
};

export const SettingsContext = createContext<SettingsContextType>(
  {} as SettingsContextType
);

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactElement[];
}) => {
  const [lifeExpectancy, _setLifeExpectancy] = useState<number>(80);
  const [birthDate, _setBirthDate] = useState<string>(
    new Date("2002-08-20").toISOString().split("T")[0]
  );

  const _fetchSettings = useCallback(() => {
    const lifeExpectancy = localStorage.getItem("lifeExpectancy");
    const birthDate = localStorage.getItem("birthDate");

    if (lifeExpectancy && Number(lifeExpectancy)) {
      _setLifeExpectancy(Number(lifeExpectancy));
    }

    if (birthDate && new Date(birthDate) instanceof Date) {
      _setBirthDate(new Date(birthDate).toISOString().split("T")[0]);
    }
  }, []);

  useEffect(() => {
    _fetchSettings();
  }, [_fetchSettings]);

  const setLifeExpectancy = (value: number) => {
    _setLifeExpectancy(value);
    localStorage.setItem("lifeExpectancy", value.toString());
  };

  const setBirthDate = (value: Date) => {
    _setBirthDate(value.toISOString().split("T")[0]);
    localStorage.setItem("birthDate", value.toISOString());
  };

  return (
    <SettingsContext.Provider
      value={{
        lifeExpectancy,
        setLifeExpectancy,
        birthDate: birthDate,
        setBirthDate,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
