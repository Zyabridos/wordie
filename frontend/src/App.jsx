import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Gameform from "./components/GameForm/Gameform.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/i18n.js";

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <Navbar />
        <Gameform />
      </Provider>
    </I18nextProvider>
  );
};

export default App;
