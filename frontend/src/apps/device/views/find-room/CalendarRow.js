import React from "react";
import { connect } from "react-redux";
import {
  calendarNameSelector,
  currentMeetingSelector,
  nextMeetingSelector, timestampSelector
} from "apps/device/store/selectors";
import { prettyFormatMinutes, timeDifferenceInMinutes } from "services/formatting";

const CalendarRow = ({ calendarName, currentMeeting, nextMeeting, timestamp }) => {
  const startTimestamp = currentMeeting ? currentMeeting.endTimestamp : timestamp;
  const endTimestamp = nextMeeting ? nextMeeting.startTimestamp : Number.POSITIVE_INFINITY;

  const timeToStart = timeDifferenceInMinutes(startTimestamp, timestamp);
  const minutesAvailable = timeDifferenceInMinutes(endTimestamp, startTimestamp);

  return (
    <div>
      {calendarName}{" "}
      Available for{" "}
      {minutesAvailable !== Number.POSITIVE_INFINITY ? prettyFormatMinutes(minutesAvailable) : "whole day"}{" "}
      from {timeToStart > 0 ? `in ${prettyFormatMinutes(timeToStart)}` : "now"}
    </div>
  );
};

const mapStateToProps = (state, { calendarId }) => ({
  timestamp: timestampSelector(state),
  calendarName: calendarNameSelector(state, { calendarId }),
  currentMeeting: currentMeetingSelector(state, { calendarId }),
  nextMeeting: nextMeetingSelector(state, { calendarId })
});

export default connect(mapStateToProps)(CalendarRow);