import React from "react";
import i18next from "i18next";
import { connect } from "react-redux";
import {
  connectionCodeSelector,
  isDeviceRemovedSelector,
  isDeviceConnectedSelector,
  isCalendarSelectedSelector
} from "./store/selectors";

import Display from "./display";
import ConnectionCode from "./connect/ConnectionCode";
import NoCalendar from "./connect/NoCalendar";
import FatalError from "../../theme/layouts/FatalError";
import { disconnectDevice } from "apps/device/store/actions";

const Router = ({ connectionCode, isCalendarSelected, isDeviceConnected, isDeviceRemoved, isOffline, unexpectedError, disconnectDevice }) => {
  if (unexpectedError) return <FatalError title={unexpectedError.message}/>;
  if (isOffline) return <FatalError title={i18next.t("errors.unable-to-connect-server")}/>;
  if (isDeviceRemoved) return <FatalError title={i18next.t("errors.device-disconnected-title")}
                                          subtitle={i18next.t("errors.device-disconnected-message")}
                                          onClick={disconnectDevice}
                                          button={"OK"}/>;
  if (isCalendarSelected) return <Display/>;
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
  isCalendarSelected: isCalendarSelectedSelector(state),
  isDeviceRemoved: isDeviceRemovedSelector(state)
});

const mapDispatchToProps = dispatch => ({
  disconnectDevice: () => dispatch(disconnectDevice())
});

export default connect(mapStateToProps, mapDispatchToProps)(Router);
