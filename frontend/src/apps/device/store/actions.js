import screenfull from "screenfull";
import axios from "axios";

import { createDevice, getDeviceDetails, removeAuth } from "services/api";

import {
  isCalendarSelectedSelector,
  isInitializedSelector,
  isInOfflineModeSelector
} from "apps/device/store/selectors";
import { DEVICE_MEETING_ACTION_RESET } from "apps/device/store/meeting-actions";
import { changeLanguage } from "i18n";

export const DEVICE_REMOVED = "DEVICE/REMOVED";
export const DEVICE_INITIALIZED = "DEVICE/INITIALIZED";
export const DEVICE_SET_CLOCK = "DEVICE/SET_CLOCK";
export const DEVICE_SET_FULL_SCREEN_STATE = "DEVICE/SET_FULL_SCREEN_STATE";
export const DEVICE_SET_OFFLINE_STATUS = "DEVICE/SET_OFFLINE_STATUS";
export const DEVICE_SET_DATA = "DEVICE/SET_DATA";

export const initializeDevice = () => async (dispatch, getState) => {
  if (isInitializedSelector(getState())) {
    return;
  }

  dispatch({ type: DEVICE_INITIALIZED });

  try {
    await getDeviceDetails();
  } catch (error) {
    if (error.response && error.response.status === 403) {
      await createDevice();
    }
  }

  dispatch(startClock());
  dispatch(fetchDeviceDetails());
  dispatch(initializeFullScreenSupport());
  dispatch(initializeOfflineObserver());
};

export const disconnectDevice = () => async dispatch => {
  await removeAuth();
  window.location.reload();
};

export const startClock = () => dispatch => {
  dispatch({ type: DEVICE_SET_CLOCK, timestamp: Date.now() });
  
  setInterval(() => dispatch({ type: DEVICE_SET_CLOCK, timestamp: Date.now() }), 10 * 1000);
};

export const initializeFullScreenSupport = () => dispatch => {
  dispatch(updateFullScreenInfo());

  if (typeof screenfull.onchange === "function") {
    screenfull.onchange(() => dispatch(updateFullScreenInfo()));
  }
};

export const updateFullScreenInfo = () => ({
  type: DEVICE_SET_FULL_SCREEN_STATE,
  isSupported: screenfull.enabled,
  isFullScreen: screenfull.isFullscreen
});

export const requestFullScreen = () => () => {
  if (screenfull.enabled) {
    screenfull.request();
  }
};

export const initializeOfflineObserver = () => (dispatch, getState) => {
  const successCallback = result => {
    if (isInOfflineModeSelector(getState())) {
      dispatch({ type: DEVICE_MEETING_ACTION_RESET });
      dispatch({ type: DEVICE_SET_OFFLINE_STATUS, isOffline: false });
    }

    return result;
  };

  const errorCallback = error => {
    if (error.response === undefined && !isInOfflineModeSelector(getState())) {
      dispatch({ type: DEVICE_SET_OFFLINE_STATUS, isOffline: true });
    }

    return Promise.reject(error);
  };

  axios.interceptors.response.use(successCallback, errorCallback);
};

export const fetchDeviceDetails = () => async (dispatch, getState) => {
  try {
    const device = await getDeviceDetails();

    dispatch({ type: DEVICE_SET_DATA, device });
    dispatch(setLanguage(device.language));
  } catch (error) {
    if (error.response && error.response.status === 404) {
      dispatch({ type: DEVICE_REMOVED });
    }
  }

  const timeout = isCalendarSelectedSelector(getState()) ? 30000 : 5000;
  setTimeout(() => dispatch(fetchDeviceDetails()), timeout);
};

export const setLanguage = language => () => {
  changeLanguage(language);
};