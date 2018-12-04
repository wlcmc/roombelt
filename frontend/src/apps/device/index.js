import React from "react";
import { Provider } from "react-redux";

import store from "./store";
import { deviceActions } from "./store/actions";
import Router from "./router";

class DeviceApp extends React.PureComponent {
  componentDidMount() {
    store.dispatch(deviceActions.initialize());
  }

  render() {
    return (
      <Provider store={store}>
        <Router/>
      </Provider>
    );
  }
}

export default DeviceApp;
