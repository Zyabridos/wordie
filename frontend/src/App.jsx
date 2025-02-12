import { Provider } from "react-redux";
import store from "./store/store.js";
import Temp from "./components/GameForm/Gameform.jsx";
import { I18nextProvider } from "react-i18next";
import i18n from './i18n/i18n.js'

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <Temp />
    </Provider>
    </I18nextProvider>
  );
};

export default App;
