import React from "react";
import i18next from "i18next";
import { connect } from "react-redux";
import { connectionCodeSelector, isDeviceConnectedSelector, isCalendarSelectedSelector } from "./store/selectors";

import Display from "./display";
import ConnectionCode from "./connect/ConnectionCode";
import NoCalendar from "./connect/NoCalendar";
import FatalError from "../../theme/layouts/FatalError";

const Router = ({ connectionCode, isCalendarSelected, isDeviceConnected, isOffline, unexpectedError, t }) => {
  if (unexpectedError) return <FatalError title={unexpectedError.message}/>;
  if (isOffline) return <FatalError title={i18next.t("errors.unable-to-connect-server")}/>;
  if (connectionCode) return <ConnectionCode connectionCode={connectionCode}/>;
  if (isCalendarSelected) return <Display/>;
  if (isDeviceConnected) return <NoCalendar/>;

  return null;
};

const mapStateToProps = state => ({
  language: state.language,
  unexpectedError: state.appState.unexpectedError,
  isOffline: state.appState.isOffline,
  connectionCode: connectionCodeSelector(state),
  isDeviceConnected: isDeviceConnectedSelector(state),
  isCalendarSelected: isCalendarSelectedSelector(state)
});

export default connect(mapStateToProps)(Router);
