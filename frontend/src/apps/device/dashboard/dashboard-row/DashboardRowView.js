import React from "react";
import i18next from "i18next";
import { TableRow, TableRowColumn, Badge } from "theme/index";
import { prettyFormatMinutes, timeDifferenceInMinutes } from "services/formatting";

const meetingStatus = (name, statusType, statusMessage) => (
  <>
    <TableRowColumn style={{ paddingRight: "1em" }}>{name}</TableRowColumn>
    <TableRowColumn><Badge {...{ [statusType]: true }}>{statusMessage}</Badge></TableRowColumn>
  </>
);

const t = (key, time) => i18next.t(key, { time: prettyFormatMinutes(time) });

const getMeetingTime = (currentMeeting, nextMeeting, timestamp) => {
    const minutesToStart = currentMeeting && timeDifferenceInMinutes(currentMeeting.startTimestamp, timestamp);
    const minutesToEnd = currentMeeting && timeDifferenceInMinutes(currentMeeting.endTimestamp, timestamp);
    const minutesToNext = nextMeeting && timeDifferenceInMinutes(nextMeeting.startTimestamp, timestamp);

    if (currentMeeting && minutesToStart > 0) {
      return meetingStatus(currentMeeting.summary, "info", t("dashboard.starts-in", Math.ceil(minutesToStart)));
    }

    if (currentMeeting && minutesToStart > -1) {
      return meetingStatus(currentMeeting.summary, "info", t("dashboard.starts-now"));
    }

    if (currentMeeting && minutesToEnd > 10) {
      return meetingStatus(currentMeeting.summary, "info", t("dashboard.started-ago", Math.floor(-minutesToStart)));
    }

    if (currentMeeting && (!nextMeeting || minutesToNext > 20)) {
      return meetingStatus(currentMeeting.summary, "info", t("dashboard.ends-in", Math.ceil(minutesToEnd)));
    }

    if (nextMeeting && minutesToNext <= 20) {
      return meetingStatus(nextMeeting.summary, "info", t("dashboard.starts-in", Math.ceil(minutesToNext)));
    }

    if (nextMeeting && minutesToNext >= 20) {
      return meetingStatus("", "success", t("dashboard.free-for", Math.ceil(minutesToNext)));
    }

    return meetingStatus("", "success", t("dashboard.no-meetings-today"));
  }
;

export default ({ calendarName, currentMeeting, nextMeeting, timestamp }) => (
  <TableRow>
    <TableRowColumn>{calendarName}</TableRowColumn>
    {getMeetingTime(currentMeeting, nextMeeting, timestamp)}
  </TableRow>
)
