import { createSelector } from "reselect";
import { timeDifferenceInMinutes } from "../../../services/formatting";

export const isDeviceRemovedSelector = state => state.appState.isRemoved;
export const isInitializedSelector = state => state.appState.isInitialized;
export const timestampSelector = state => state.timestamp;
export const deviceSelector = state => state.device;
export const isInOfflineModeSelector = state => state.appState.isOffline;
export const connectionCodeSelector = state => state.device && state.device.connectionCode;
export const currentMeetingActionSelector = state => state.currentMeetingActions.action;
export const currentActionSourceSelector = state => state.currentMeetingActions.source;
export const isActionErrorSelector = state => state.currentMeetingActions.isError;
export const isRetryingActionSelector = state => state.currentMeetingActions.isRetrying;

export const isDeviceConnectedSelector = createSelector(deviceSelector, device => device && !device.connectionCode);
export const isCalendarSelectedSelector = createSelector(deviceSelector, device => device && device.isCalendarSelected);

export const deviceNameSelector = createSelector(deviceSelector, device => device && device.name);

export const currentMeetingSelector = createSelector([deviceSelector, timestampSelector],
  (device, currentTimestamp) => {
    return device.events.find(
      event => event.startTimestamp < currentTimestamp + 5 * 60 * 1000 && event.endTimestamp > currentTimestamp
    );
  }
);

export const nextMeetingSelector = createSelector(
  [deviceSelector, timestampSelector, currentMeetingSelector],
  (device, currentTimestamp, currentMeeting) =>
    device.events.find(event => {
      const isToday = new Date(event.startTimestamp).toDateString() === new Date(currentTimestamp).toDateString();
      const isLater = event.startTimestamp > currentTimestamp;
      const isNotCurrentMeeting = !currentMeeting || event.id !== currentMeeting.id;
      return isToday && isLater && isNotCurrentMeeting;
    })
);

export const minutesAvailableTillNextMeetingSelector = createSelector(
  [timestampSelector, currentMeetingSelector, nextMeetingSelector],
  (currentTimestamp, currentMeeting, nextMeeting) => {
    return timeDifferenceInMinutes(
      nextMeeting && nextMeeting.startTimestamp,
      currentMeeting ? currentMeeting.endTimestamp : currentTimestamp
    );
  }
);

export const hasCurrentMeetingStartedSelector = createSelector(
  [timestampSelector, currentMeetingSelector],
  (currentTimestamp, currentMeeting) => currentTimestamp > currentMeeting.startTimestamp
);