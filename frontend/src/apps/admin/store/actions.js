import {
  connectDevice,
  disconnectDevice,
  getCalendars,
  getConnectedDevices,
  getUserDetails,
  setOptionsForDevice
} from "services/api";

import { newDeviceData, editDeviceData, removedDeviceId } from "./selectors";

export const SET_CALENDARS = "SET_CALENDARS";
export const SET_DEVICES = "SET_DEVICES";
export const SET_USER_DETAILS = "SET_USER_DETAILS";

export const setDevices = devices => ({ type: SET_DEVICES, devices });

export const initialFetch = () => async dispatch => {
  const [calendars, devices, user] = await Promise.all([
    getCalendars(),
    getConnectedDevices(),
    getUserDetails()
  ]);

  dispatch({ type: SET_CALENDARS, calendars });
  dispatch({ type: SET_USER_DETAILS, user });
  dispatch(setDevices(devices));
};

export const CONNECT_DEVICE_WIZARD = {
  SHOW: "SHOW_WIZARD",
  HIDE: "HIDE_WIZARD",
  FIRST_STEP: {
    SET_CONNECTION_CODE: "FIRST_STEP/SET_WIZARD_CONNECTION_CODE",
    START_SUBMITTING: "FIRST_STEP/START_SUBMITTING_FIRST_WIZARD_STEP",
    SUBMIT_SUCCESS: "FIRST_STEP/WIZARD_FIRST_STEP_SUCCESS",
    SUBMIT_ERROR: "FIRST_STEP/WIZARD_FIRST_STEP_ERROR"
  },
  SECOND_STEP: {
    SET_DEVICE_TYPE: "SECOND_STEP/SET_DEVICE_TYPE",
    NEXT_STEP: "SECOND_STEP/NEXT"
  },
  THIRD_STEP: {
    SET_CALENDAR: "THIRD_STEP/SET_WIZARD_CALENDAR",
    SET_LANGUAGE: "THIRD_STEP/SET_WIZARD_LANGUAGE",
    PREVIOUS_STEP: "THIRD_STEP/PREVIOUS_STEP",
    START_SUBMITTING: "THIRD_STEP/START_SUBMITTING_SECOND_WIZARD_STEP"
  }
};

export const connectDeviceWizard = {
  show: () => ({ type: CONNECT_DEVICE_WIZARD.SHOW }),
  hide: () => ({ type: CONNECT_DEVICE_WIZARD.HIDE }),
  firstStep: {
    setConnectionCode: connectionCode => ({
      type: CONNECT_DEVICE_WIZARD.FIRST_STEP.SET_CONNECTION_CODE,
      connectionCode
    }),
    submit: () => async (dispatch, getState) => {
      dispatch({ type: CONNECT_DEVICE_WIZARD.FIRST_STEP.START_SUBMITTING });

      try {
        const { connectionCode } = newDeviceData(getState());
        const device = await connectDevice(connectionCode);

        dispatch({ type: CONNECT_DEVICE_WIZARD.FIRST_STEP.SUBMIT_SUCCESS, deviceId: device.id });
      } catch (error) {
        const isInvalidConnectionCode = error.response && error.response.status === 404;
        const errorMessage = isInvalidConnectionCode ? "Invalid connection code" : "Unknown error. Please try again later";

        dispatch({ type: CONNECT_DEVICE_WIZARD.FIRST_STEP.SUBMIT_ERROR, errorMessage });
      }
    }
  },
  secondStep: {
    setDeviceType: deviceType => ({ type: CONNECT_DEVICE_WIZARD.SECOND_STEP.SET_DEVICE_TYPE, deviceType }),
    nextStep: () => ({ type: CONNECT_DEVICE_WIZARD.SECOND_STEP.NEXT_STEP })
  },
  thirdStep: {
    setCalendarId: calendarId => ({ type: CONNECT_DEVICE_WIZARD.THIRD_STEP.SET_CALENDAR, calendarId }),
    setLanguage: language => ({ type: CONNECT_DEVICE_WIZARD.THIRD_STEP.SET_LANGUAGE, language }),
    previousStep: () => ({ type: CONNECT_DEVICE_WIZARD.THIRD_STEP.PREVIOUS_STEP }),
    submit: () => async (dispatch, getState) => {
      dispatch({ type: CONNECT_DEVICE_WIZARD.THIRD_STEP.START_SUBMITTING });

      const { deviceId, deviceType, calendarId, language } = newDeviceData(getState());
      await setOptionsForDevice(deviceId, deviceType, calendarId, language);

      dispatch(setDevices(await getConnectedDevices()));
      dispatch(connectDeviceWizard.hide());
    }
  }
};

export const EDIT_DEVICE_DIALOG = {
  SHOW: "SHOW_EDIT_DEVICE_DIALOG",
  HIDE: "HIDE_EDIT_DEVICE_DIALOG",
  SET_DEVICE_TYPE: "SET_EDIT_DEVICE_TYPE",
  SET_CALENDAR: "SET_EDIT_DEVICE_CALENDAR",
  SET_LANGUAGE: "SET_EDIT_DEVICE_LANGUAGE",
  START_SUBMITTING: "EDIT_DEVICE_SUBMITTED"
};

export const editDeviceDialog = {
  show: device => ({ type: EDIT_DEVICE_DIALOG.SHOW, device }),
  hide: () => ({ type: EDIT_DEVICE_DIALOG.HIDE }),
  setDeviceType: deviceType => ({ type: EDIT_DEVICE_DIALOG.SET_DEVICE_TYPE, deviceType }),
  setCalendarId: calendarId => ({ type: EDIT_DEVICE_DIALOG.SET_CALENDAR, calendarId }),
  setLanguage: language => ({ type: EDIT_DEVICE_DIALOG.SET_LANGUAGE, language }),
  submit: () => async (dispatch, getState) => {
    const { deviceId, deviceType, calendarId, language } = editDeviceData(getState());

    dispatch({ type: EDIT_DEVICE_DIALOG.START_SUBMITTING });
    await setOptionsForDevice(deviceId, deviceType, calendarId, language);

    dispatch(setDevices(await getConnectedDevices()));
    dispatch(editDeviceDialog.hide());
  }
};

export const REMOVE_DEVICE_DIALOG = {
  SHOW: "SHOW_REMOVE_DEVICE_DIALOG",
  HIDE: "HIDE_REMOVE_DEVICE_DIALOG"
};

export const removeDeviceDialog = {
  show: device => ({ type: REMOVE_DEVICE_DIALOG.SHOW, deviceId: device.id }),
  hide: () => ({ type: REMOVE_DEVICE_DIALOG.HIDE }),
  submit: () => async (dispatch, getState) => {
    await disconnectDevice(removedDeviceId(getState()));

    dispatch(setDevices(await getConnectedDevices()));
    dispatch(removeDeviceDialog.hide());
  }
};
