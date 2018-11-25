import React from "react";
import { Provider } from "react-redux";

import { initialFetch } from "apps/admin/store/actions";

import store from "./store";

class AdminApp extends React.PureComponent {
  componentDidMount() {
    store.dispatch(initialFetch());

    if (module.hot) {
      module.hot.accept("./Dashboard", () => this.forceUpdate());
    }
  }

  render() {
    const Dashboard = require("./Dashboard").default;

    return (
      <Provider store={store}>
        <Dashboard/>
      </Provider>
    );
  }
}

export default AdminApp;
