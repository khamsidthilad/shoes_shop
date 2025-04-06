import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from "./english.json";
import lao from "./lao.json";
import config from "../config/configs";

export const LANG_KEY = `${config.APP_NAME}_LANG`;

const lang = localStorage.getItem(LANG_KEY) || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: english },
    la: { translation: lao },
  },
  lng: lang,
  fallbackLng: lang,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
