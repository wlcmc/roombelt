import { combineReducers } from "redux";

import {
  SET_CALENDARS,
  SET_DEVICES,
  SET_USER_DETAILS,
  CONNECT_DEVICE_WIZARD,
  EDIT_DEVICE_DIALOG,
  REMOVE_DEVICE_DIALOG
} from "apps/admin/store/actions";

const user = (state = { displayName: "", avatarUrl: undefined }, action) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return { displayName: action.user.displayName, avatarUrl: action.user.avatarUrl };
    default:
      return state;
  }
};

const devices = (state = { isLoaded: false, data: [] }, action) => {
  switch (action.type) {
    case SET_DEVICES:
      return { isLoaded: true, data: action.devices };
    default:
      return state;
  }
};

const calendars = (state = {}, action) => {
  switch (action.type) {
    case SET_CALENDARS:
      return action.calendars.reduce((acc, calendar) => ({ ...acc, [calendar.id]: calendar }), {});
    default:
      return state;
  }
};

const editedDevice = (state = { data: null, isSaving: false }, action) => {
  switch (action.type) {
    case EDIT_DEVICE_DIALOG.SHOW:
      return { data: JSON.parse(JSON.stringify(action.device)) };
    case EDIT_DEVICE_DIALOG.HIDE:
      return { data: null };
    case EDIT_DEVICE_DIALOG.START_SUBMITTING:
      return { data: state.data, isSaving: true };
    case EDIT_DEVICE_DIALOG.SET_DEVICE_TYPE:
      return { data: { ...state.data, deviceType: action.deviceType } };
    case EDIT_DEVICE_DIALOG.SET_CALENDAR:
      return { data: { ...state.data, calendarId: action.calendarId } };
    case EDIT_DEVICE_DIALOG.SET_LANGUAGE:
      return { data: { ...state.data, language: action.language } };
    default:
      return state;
  }
};

const removedDevice = (state = null, action) => {
  switch (action.type) {
    case REMOVE_DEVICE_DIALOG.SHOW:
      return action.deviceId;
    case REMOVE_DEVICE_DIALOG.HIDE:
      return null;
    default:
      return state;
  }
};

const defaultConnectDeviceWizardState = {
  currentStep: null,
  connectionCode: "",
  deviceId: null,
  deviceType: "calendar",
  calendarId: null,
  language: "en-US",
  errorMessage: null,
  isSubmitting: false
};

const connectDeviceWizard = (state = defaultConnectDeviceWizardState, action) => {
  switch (action.type) {
    case CONNECT_DEVICE_WIZARD.SHOW:
      return { ...defaultConnectDeviceWizardState, currentStep: "connection-code" };
    case CONNECT_DEVICE_WIZARD.HIDE:
      return defaultConnectDeviceWizardState;
    case CONNECT_DEVICE_WIZARD.FIRST_STEP.SET_CONNECTION_CODE:
      return { ...state, connectionCode: action.connectionCode.replace(/\D/g, "") };
    case CONNECT_DEVICE_WIZARD.FIRST_STEP.START_SUBMITTING:
      return { ...state, errorMessage: null, isSubmitting: true };
    case CONNECT_DEVICE_WIZARD.FIRST_STEP.SUBMIT_SUCCESS:
      return { ...state, currentStep: "device-type", isSubmitting: false, deviceId: action.deviceId };
    case CONNECT_DEVICE_WIZARD.FIRST_STEP.SUBMIT_ERROR:
      return { ...state, errorMessage: action.errorMessage, isSubmitting: false };
    case CONNECT_DEVICE_WIZARD.SECOND_STEP.SET_DEVICE_TYPE:
      return { ...state, deviceType: action.deviceType };
    case CONNECT_DEVICE_WIZARD.SECOND_STEP.NEXT_STEP:
      return { ...state, currentStep: "configuration" };
    case CONNECT_DEVICE_WIZARD.THIRD_STEP.PREVIOUS_STEP:
      return { ...state, currentStep: "device-type" };
    case CONNECT_DEVICE_WIZARD.THIRD_STEP.SET_CALENDAR:
      return { ...state, calendarId: action.calendarId };
    case CONNECT_DEVICE_WIZARD.THIRD_STEP.SET_LANGUAGE:
      return { ...state, language: action.language };
    case CONNECT_DEVICE_WIZARD.THIRD_STEP.START_SUBMITTING:
      return { ...state, errorMessage: null, isSubmitting: true };
    default:
      return state;
  }
};

export default combineReducers({
  user,
  devices,
  calendars,
  editedDevice,
  removedDevice,
  connectDeviceWizard
});
