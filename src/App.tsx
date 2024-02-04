import { SettingsProvider } from "./ctx/settings";
import { WeeksCompletion } from "./parts/weeks";
import { Settings } from "./parts/settings";
import { YearCompletion } from "./parts/year";
import { AgeCompletion } from "./parts/age";

export const App = () => {
  return (
    <SettingsProvider>
      <Settings />
      <AgeCompletion />
      <WeeksCompletion />
      <YearCompletion />
    </SettingsProvider>
  );
};
