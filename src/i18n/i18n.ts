import i18n from "i18next";
import VI from "./vi.json";
import EN from "./en.json";
import { initReactI18next } from "react-i18next";

export const resources = {
  en: {
    LANGUAGE: EN,
  },
  vi: {
    LANGUAGE: VI,
  },
};

export const defaultNS = "LANGUAGE";
i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  ns: ["LANGUAGE"],
  defaultNS,
  // debug: true,
  interpolation: {
    escapeValue: false,
  },
});
