import React from "react";
import { Provider } from "react-redux";

import { initialFetch } from "apps/admin/store/actions";

import store from "./store";
import Dashboard from "./Dashboard";

class AdminApp extends React.PureComponent {
  componentDidMount() {
    store.dispatch(initialFetch());
  }

  render() {
    return (
      <Provider store={store}>
        <Dashboard/>
      </Provider>
    );
  }
}

export default AdminApp;
