import React from "react";
import { Badge, I18n } from "../../../theme";
import { prettyFormatMinutes } from "../../../services/formatting";
import { MeetingHeader, MeetingSubtitle } from "./Components";
import { connect } from "react-redux";
import { nextMeetingSelector, minutesAvailableTillNextMeetingSelector } from "../store/selectors";

const RoomAvailable = props => (
  <I18n>{t =>
    <React.Fragment>
      <MeetingHeader>
        <Badge success>{t("availability.available")}</Badge>
      </MeetingHeader>
      <MeetingSubtitle>
        {(props.nextMeeting && props.nextMeeting.startTimestamp)
          ? t("availability.available-for", { time: prettyFormatMinutes(props.minutesToNextMeeting) })
          : t("availability.whole-day")}
      </MeetingSubtitle>
    </React.Fragment>
  }</I18n>
);

const mapStateToProps = state => ({
  nextMeeting: nextMeetingSelector(state),
  minutesToNextMeeting: minutesAvailableTillNextMeetingSelector(state)
});

export default connect(mapStateToProps)(RoomAvailable);
