import { useState } from "react";
import { initialUiParams, UiParamsContext } from "./models/context/UiParams/lib";
import { UiParams } from "./models/context/UiParams/type";
import EditPage from "./pages/EditPage";

const App = () => {
  const [ timeZone, setTimeZone ] = useState(initialUiParams.LocalSetting.TimeZone);
  const initialUiParamsValue: UiParams = {
    ...initialUiParams,
    LocalSetting: {
      ...initialUiParams.LocalSetting,
      TimeZone: timeZone,
      UpdateTimeZone: (timeZone) => setTimeZone(timeZone),
    }
  }
  return (
    <UiParamsContext.Provider value={initialUiParamsValue}>
      <EditPage />
    </UiParamsContext.Provider>
  );
}

export default App;
