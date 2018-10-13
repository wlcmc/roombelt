import {
  DEVICE_SET_DATA,
  DEVICE_SET_CLOCK,
  DEVICE_SET_FULL_SCREEN_STATE,
  DEVICE_SET_OFFLINE_STATUS,
  DEVICE_INITIALIZED, DEVICE_REMOVED
} from "apps/device/store/actions";

import {
  DEVICE_MEETING_ACTION_START,
  DEVICE_MEETING_ACTION_RESET,
  DEVICE_MEETING_ACTION_ERROR
} from "apps/device/store/meeting-actions";

import { combineReducers } from "redux";

const timestamp = (state = 0, action) => (action.type === DEVICE_SET_CLOCK ? action.timestamp : state);
const device = (state = null, action) => (action.type === DEVICE_SET_DATA ? action.device : state);

const defaultCurrentMeetingActionsState = {
  source: null,
  action: null,
  isError: false
};

const currentMeetingActions = (state = defaultCurrentMeetingActionsState, action) => {
  switch (action.type) {
    case DEVICE_MEETING_ACTION_START:
      return { source: action.source, action: action.action, isError: false };
    case DEVICE_MEETING_ACTION_RESET:
      return defaultCurrentMeetingActionsState;
    case DEVICE_MEETING_ACTION_ERROR:
      return { ...state, isError: true };
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
    case DEVICE_INITIALIZED:
      return { ...state, isInitialized: true };
    case DEVICE_REMOVED:
      return { ...state, isRemoved: true };
    case DEVICE_SET_OFFLINE_STATUS:
      return { ...state, isOffline: action.isOffline };
    default:
      return state;
  }
};

const fullScreen = (state = { isFullScreen: null, isSupported: null }, action) => {
  switch (action.type) {
    case DEVICE_SET_FULL_SCREEN_STATE:
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
