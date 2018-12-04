import { action } from "utils/redux";
import screenfull from "screenfull";
import axios from "axios";

import { createDevice, getDeviceDetails, removeAuth } from "services/api";

import {
  calendarNameSelector,
  currentActionSelector,
  currentMeetingSelector,
  isCalendarSelectedSelector,
  isInitializedSelector,
  isInOfflineModeSelector
} from "apps/device/store/selectors";
import { changeLanguage } from "i18n";

import i18next from "i18next";
import * as api from "services/api";

export const deviceActions = {
  markInitialized: action(),
  initialize: () => async (dispatch, getState) => {
    if (isInitializedSelector(getState())) {
      return;
    }

    dispatch(deviceActions.markInitialized());

    try {
      await getDeviceDetails();
    } catch (error) {
      if (error.response && error.response.status === 403) {
        await createDevice();
      }
    }

    dispatch(deviceActions.startClock());
    dispatch(deviceActions.fetchDeviceData());
    dispatch(deviceActions.initializeFullScreenSupport());
    dispatch(deviceActions.initializeOfflineObserver());
  },

  updateDeviceData: action(device => ({ device })),
  fetchDeviceData: () => async (dispatch, getState) => {
    try {
      const device = await getDeviceDetails();

      dispatch(deviceActions.updateDeviceData(device));
      dispatch(deviceActions.setLanguage(device.language));
    } catch (error) {
      if (error.response && error.response.status === 404) {
        dispatch(deviceActions.markRemoved());
      }
    }

    const timeout = isCalendarSelectedSelector(getState()) ? 30000 : 5000;
    setTimeout(() => dispatch(deviceActions.fetchDeviceData()), timeout);
  },

  updateClock: action(timestamp => ({ timestamp })),
  startClock: () => dispatch => {
    dispatch(deviceActions.updateClock(Date.now()));

    setInterval(() => dispatch(deviceActions.updateClock(Date.now())), 10 * 1000);
  },

  updateFullScreenState: action((isSupported, isFullScreen) => ({ isSupported, isFullScreen })),
  initializeFullScreenSupport: () => dispatch => {
    const updateStatus = () => {
      dispatch(deviceActions.updateFullScreenState(screenfull.enabled, screenfull.isFullscreen));
    };

    updateStatus();

    if (typeof screenfull.onchange === "function") {
      screenfull.onchange(updateStatus);
    }
  },
  requestFullScreen: () => () => {
    if (screenfull.enabled) {
      screenfull.request();
    }
  },

  updateOfflineStatus: action(isOffline => ({ isOffline })),
  initializeOfflineObserver: () => (dispatch, getState) => {
    const successCallback = result => {
      if (isInOfflineModeSelector(getState())) {
        dispatch(meetingActions.endAction());
        dispatch(deviceActions.updateOfflineStatus(false));
      }

      return result;
    };

    const errorCallback = error => {
      if (error.response === undefined && !isInOfflineModeSelector(getState())) {
        dispatch(deviceActions.updateOfflineStatus(true));
      }

      return Promise.reject(error);
    };

    axios.interceptors.response.use(successCallback, errorCallback);
  },

  markRemoved: action(),
  disconnectDevice: () => async () => {
    await removeAuth();
    window.location.reload();
  },

  setLanguage: language => () => changeLanguage(language)
};

export const meetingActions = {
  startAction: action((action) => ({ action })),
  endAction: action(),
  setActionError: action(),
  setActionSource: action(source => ({ source })),

  retry: () => (dispatch, getState) => dispatch(currentActionSelector(getState())),

  createMeeting: timeInMinutes => (dispatch, getState) => {
    meetingActions.startAction(meetingActions.createMeeting(timeInMinutes));

    const roomName = calendarNameSelector(getState());
    const createMeetingPromise = api.createMeeting(timeInMinutes, i18next.t("meeting.quick-meeting-title", { roomName }));

    dispatch(meetingActions.handleMeetingActionPromise(createMeetingPromise));
  },

  cancelMeeting: () => async (dispatch, getState) => {
    meetingActions.startAction(meetingActions.cancelMeeting());

    const currentMeetingId = currentMeetingSelector(getState()).id;
    const deleteMeetingPromise = api.deleteMeeting(currentMeetingId);

    dispatch(meetingActions.handleMeetingActionPromise(deleteMeetingPromise));
  },

  endMeeting: () => dispatch => {
    meetingActions.startAction(meetingActions.endMeeting());

    dispatch(meetingActions.updateCurrentMeeting({ endNow: true }));
  },

  checkInToMeeting: () => dispatch => {
    meetingActions.startAction(meetingActions.checkInToMeeting());

    dispatch(meetingActions.updateCurrentMeeting({ checkIn: true }));
  },

  extendMeeting: timeInMinutes => async dispatch => {
    meetingActions.startAction(meetingActions.extendMeeting(timeInMinutes));

    dispatch(meetingActions.updateCurrentMeeting({ extensionTime: timeInMinutes }));
  },

  startMeetingEarly: () => async dispatch => {
    meetingActions.startAction(meetingActions.startMeetingEarly());

    dispatch(meetingActions.updateCurrentMeeting({ checkIn: true, startNow: true }));
  },

  updateCurrentMeeting: options => (dispatch, getState) => {
    const currentMeetingId = currentMeetingSelector(getState()).id;
    const updateMeetingPromise = api.updateMeeting(currentMeetingId, options);

    dispatch(meetingActions.handleMeetingActionPromise(updateMeetingPromise));
  },

  handleMeetingActionPromise: actionPromise => async dispatch => {
    try {
      await actionPromise;

      dispatch(deviceActions.updateDeviceData(await api.getDeviceDetails()));
      dispatch(meetingActions.endAction());
    } catch (error) {
      console.error(error);
      dispatch(meetingActions.setActionError());
    }
  }
};