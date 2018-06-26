import store from "store";

export const getAccessToken = () => store.get("roombelt-access-token");
export const setAccessToken = value => store.set("roombelt-access-token", value);
