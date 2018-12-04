import {
  deviceActions, meetingActions
} from "apps/device/store/actions";

import { combineReducers } from "redux";

const timestamp = (state = 0, action) => (action.type === deviceActions.updateClock ? action.timestamp : state);
const device = (state = null, action) => (action.type === deviceActions.updateDeviceData ? action.device : state);

const defaultCurrentMeetingActionsState = {
  source: null,
  action: null,
  isError: false,
  isRetrying: false
};

const currentMeetingActions = (state = defaultCurrentMeetingActionsState, action) => {
  switch (action.type) {
    case meetingActions.setActionSource:
      return { ...state, source: action.source };
    case meetingActions.startAction:
      return { ...state, action: action, isError: false, isRetrying: state.action !== null };
    case meetingActions.setActionError:
      return { ...state, isError: true, isRetrying: false };
    case meetingActions.endAction:
      return defaultCurrentMeetingActionsState;
    default:
      return state;
  }
};

const appState = (state = {
  isRemoved: false,
  isInitialized: false,
  unexpectedError: false,
  isOffline: false
}, action) => {
  switch (action.type) {
    case ":device--unexpected-error":
      return { ...state, unexpectedError: action.error };
    case deviceActions.markInitialized:
      return { ...state, isInitialized: true };
    case deviceActions.markRemoved:
      return { ...state, isRemoved: true };
    case deviceActions.updateOfflineStatus:
      return { ...state, isOffline: action.isOffline };
    default:
      return state;
  }
};

const fullScreen = (state = { isFullScreen: null, isSupported: null }, action) => {
  switch (action.type) {
    case deviceActions.updateFullScreenState:
      return { isFullScreen: action.isFullScreen, isSupported: action.isSupported };
    default:
      return state;
  }
};

export default combineReducers({
  fullScreen,
  appState,
  timestamp,
  device,
  currentMeetingActions
});
