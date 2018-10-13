import { currentMeetingActionSelector, currentMeetingSelector, deviceNameSelector } from "apps/device/store/selectors";
import i18next from "i18next";
import * as api from "services/api";
import { DEVICE_SET_DATA } from "apps/device/store/actions";

export const DEVICE_MEETING_ACTION_START = "DEVICE/START_MEETING_ACTION";
export const DEVICE_MEETING_ACTION_RESET = "DEVICE/RESET_MEETING_ACTION";
export const DEVICE_MEETING_ACTION_ERROR = "DEVICE/MEETING_ACTION_ERROR";

export const runMeetingAction = (action, source) => dispatch => {
  dispatch({ type: DEVICE_MEETING_ACTION_START, source, action });
  dispatch(action);
};

export const retryMeetingAction = (source) => (dispatch, getState) => {
  const action = currentMeetingActionSelector(getState());
  dispatch(runMeetingAction(action, source));
};

export const cancelMeetingAction = () => dispatch => {
  dispatch({ type: DEVICE_MEETING_ACTION_RESET });
};

export const createMeeting = timeInMinutes => async (dispatch, getState) => {
  const roomName = deviceNameSelector(getState());
  const createMeetingPromise = api.createMeeting(timeInMinutes, i18next.t("meeting.quick-meeting-title", { roomName }));

  dispatch(handleMeetingActionPromise(createMeetingPromise));
};

export const cancelMeeting = () => async (dispatch, getState) => {
  const currentMeetingId = currentMeetingSelector(getState()).id;

  const deleteMeetingPromise = api.deleteMeeting(currentMeetingId);
  dispatch(handleMeetingActionPromise(deleteMeetingPromise));
};

export const endMeeting = () => dispatch => {
  dispatch(updateCurrentMeeting({ endNow: true }));
};

export const checkInToMeeting = () => dispatch => {
  dispatch(updateCurrentMeeting({ checkIn: true }));
};

export const extendMeeting = timeInMinutes => async dispatch => {
  dispatch(updateCurrentMeeting({ extensionTime: timeInMinutes }));
};

export const startMeetingEarly = () => async dispatch => {
  dispatch(updateCurrentMeeting({ checkIn: true, startNow: true }));
};

export const updateCurrentMeeting = options => (dispatch, getState) => {
  const currentMeetingId = currentMeetingSelector(getState()).id;
  const updateMeetingPromise = api.updateMeeting(currentMeetingId, options);

  dispatch(handleMeetingActionPromise(updateMeetingPromise));
};

export const handleMeetingActionPromise = actionPromise => async dispatch => {
  try {
    await actionPromise;

    dispatch({ type: DEVICE_SET_DATA, device: await api.getDeviceDetails() });
    dispatch({ type: DEVICE_MEETING_ACTION_RESET });
  } catch (error) {
    console.error(error);
    dispatch({ type: DEVICE_MEETING_ACTION_ERROR });
  }
};