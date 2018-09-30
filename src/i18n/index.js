import i18next from "i18next";
import { getLanguage, setLanguage } from "../services/persistent-store";

const context = require.context("./", false, /\.json$/);
export const translations = context.keys().reduce((acc, file) => ({ ...acc, [context(file).key]: context(file) }), {});

export const changeLanguage = language => {
  if (language !== getLanguage()) {
    setLanguage(language);
    window.location.reload();
  }
};

export default () => new Promise(resolve => {
  i18next
    .use({ type: "backend", read: (language, namespace, callback) => callback(null, translations[language]) })
    .init({ lng: getLanguage(), fallbackLng: "en-US" }, () => resolve());
});

