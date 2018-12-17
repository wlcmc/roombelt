import React, { useEffect } from "react";
import { Provider } from "react-redux";

import store from "./store";
import { deviceActions } from "./store/actions";
import Router from "./router";
import { useHotReload } from "utils/react";

export default () => {
  useHotReload(update => module.hot.accept("./router", update));

  useEffect(() => {
    store.dispatch(deviceActions.initialize());
  }, []);

  return <Provider store={store} children={<Router/>}/>;
};
