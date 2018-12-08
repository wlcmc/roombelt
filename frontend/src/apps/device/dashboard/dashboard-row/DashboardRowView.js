import React from "react";
import i18next from "i18next";
import { TableRow, TableRowColumn, Badge } from "theme/index";
import { prettyFormatMinutes, timeDifferenceInMinutes } from "services/formatting";

const meetingStatus = (calendarName, meetingName, statusMessage) => (
  <TableRow>
    <TableRowColumn style={{ paddingRight: "1em" }}>{meetingName}</TableRowColumn>
    <TableRowColumn>{calendarName}</TableRowColumn>
    <TableRowColumn><Badge success>{statusMessage}</Badge></TableRowColumn>
  </TableRow>
);

const t = (key, time) => i18next.t(key, { time: prettyFormatMinutes(time) });

const getMeetingRow = (calendarName, meeting, timestamp) => {
    const minutesToStart = timeDifferenceInMinutes(meeting.startTimestamp, timestamp);
    const minutesToEnd = timeDifferenceInMinutes(meeting.endTimestamp, timestamp);

    if (minutesToStart > 0) {
      return meetingStatus(calendarName, meeting.summary, t("dashboard.starts-in", Math.ceil(minutesToStart)));
    }

    if (minutesToStart > -1) {
      return meetingStatus(calendarName, meeting.summary, t("dashboard.starts-now"));
    }

    if (minutesToEnd > 10) {
      return meetingStatus(calendarName, meeting.summary, t("dashboard.started-ago", Math.floor(-minutesToStart)));
    }

    return meetingStatus(calendarName, meeting.summary, t("dashboard.ends-in", Math.ceil(minutesToEnd)));
  }
;

export default ({ calendarName, currentMeeting, nextMeeting, timestamp }) => {
  const currentMeetingRow = currentMeeting && getMeetingRow(calendarName, currentMeeting, timestamp);
  const nextMeetingRow = nextMeeting && getMeetingRow(calendarName, nextMeeting, timestamp);

  return [currentMeetingRow, nextMeetingRow];
}
