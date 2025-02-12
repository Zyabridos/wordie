import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
  },
  lng: "en",
});

export default i18n;
