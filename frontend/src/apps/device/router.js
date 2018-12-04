import React from "react";
import i18next from "i18next";
import { connect } from "react-redux";
import {
  connectionCodeSelector,
  isDeviceRemovedSelector,
  isDeviceConnectedSelector,
  isDashboardDeviceSelector,
  isCalendarSelectedSelector
} from "./store/selectors";

import Dashboard from "./dashboard";
import SingleCalendar from "./single-calendar";
import ConnectionCode from "./connect/ConnectionCode";
import NoCalendar from "./connect/NoCalendar";
import FatalError from "theme/layouts/FatalError";
import { deviceActions } from "apps/device/store/actions";

const Router = ({ connectionCode, isDashboardDevice, isCalendarSelected, isDeviceConnected, isDeviceRemoved, isOffline, unexpectedError, disconnectDevice }) => {
  if (unexpectedError) return <FatalError title={unexpectedError.message}/>;
  if (isOffline) return <FatalError title={i18next.t("errors.unable-to-connect-server")}/>;
  if (isDeviceRemoved) return <FatalError title={i18next.t("errors.device-disconnected-title")}
                                          subtitle={i18next.t("errors.device-disconnected-message")}
                                          onClick={disconnectDevice}
                                          button={"OK"}/>;
  if (isDashboardDevice) return <Dashboard/>;
  if (isCalendarSelected) return <SingleCalendar/>;
  if (isDeviceConnected) return <NoCalendar/>;
  if (connectionCode) return <ConnectionCode connectionCode={connectionCode}/>;

  return null;
};

const mapStateToProps = state => ({
  language: state.language,
  unexpectedError: state.appState.unexpectedError,
  isOffline: state.appState.isOffline,
  connectionCode: connectionCodeSelector(state),
  isDeviceConnected: isDeviceConnectedSelector(state),
  isDashboardDevice: isDashboardDeviceSelector(state),
  isCalendarSelected: isCalendarSelectedSelector(state),
  isDeviceRemoved: isDeviceRemovedSelector(state)
});

const mapDispatchToProps = dispatch => ({
  disconnectDevice: () => dispatch(deviceActions.disconnectDevice())
});

export default connect(mapStateToProps, mapDispatchToProps)(Router);
