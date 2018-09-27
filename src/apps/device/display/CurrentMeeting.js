import React from "react";
import { connect } from "react-redux";
import { Badge, Time, I18n } from "../../../theme";
import { MeetingHeader, MeetingTitle, MeetingSubtitle } from "./Components";
import { currentMeetingSelector, nextMeetingSelector } from "../store/selectors";

const CurrentMeeting = props => {
  const { attendees, organizer, isCheckedIn, startTimestamp, endTimestamp, summary } = props.currentMeeting;

  const guestsCount = attendees.filter(u => u.displayName !== organizer.displayName).length;
  const fromStart = Math.floor((props.currentTimestamp - startTimestamp) / 1000 / 60);

  return (
    <I18n>
      {t => <React.Fragment>
        <MeetingHeader>
          {isCheckedIn && <Badge danger>{t("availability.occupied")}</Badge>}
          {!isCheckedIn && fromStart === 0 && <Badge info>{t("availability.starts.now")}</Badge>}
          {!isCheckedIn && fromStart > 0 && <Badge warning>{t("availability.starts.ago", { count: fromStart })}</Badge>}
          {!isCheckedIn && fromStart < 0 && <Badge info>{t("availability.starts.in", { count: -fromStart })}</Badge>}
        </MeetingHeader>
        <MeetingTitle>
          {summary || t("meeting.no-title")} <Time timestamp={startTimestamp}/> - <Time timestamp={endTimestamp}/>
        </MeetingTitle>
        <MeetingSubtitle>
          {organizer.displayName} {guestsCount > 0 && t("meeting.guests", { count: guestsCount })}
        </MeetingSubtitle>
      </React.Fragment>}
    </I18n>
  );
};

const mapStateToProps = state => ({
  currentTimestamp: state.timestamp,
  currentMeeting: currentMeetingSelector(state),
  nextMeeting: nextMeetingSelector(state)
});

export default connect(mapStateToProps)(CurrentMeeting);
