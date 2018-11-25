import store from "store";

export const getLanguage = () => store.get("roombelt-language") || "en-US";
export const setLanguage = value => store.set("roombelt-language", value);
