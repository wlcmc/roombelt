import store from "store";

export const getAccessToken = () => store.get("roombelt-access-token");
export const setAccessToken = value => store.set("roombelt-access-token", value);

export const getLanguage = () => store.get("roombelt-language") || "en";
export const setLanguage = value => store.set("roombelt-language", value);
