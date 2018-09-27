import React from "react";
import { connect } from "react-redux";

import { Time, I18n } from "../../../theme";
import { MeetingTitle, MeetingSubtitle } from "./Components";
import { nextMeetingSelector, timestampSelector } from "../store/selectors";

const NextMeeting = props =>
  <I18n>{t =>
    <React.Fragment>
      <MeetingTitle>
        {t("meeting.next")}
      </MeetingTitle>
      <MeetingSubtitle>
        {props.nextMeeting.summary + " "}
        <Time timestamp={props.nextMeeting.startTimestamp}/> - <Time timestamp={props.nextMeeting.endTimestamp}/>
      </MeetingSubtitle>
    </React.Fragment>
  }</I18n>;

const mapStateToProps = state => ({
  nextMeeting: nextMeetingSelector(state),
  timestamp: timestampSelector(state)
});

export default connect(mapStateToProps)(NextMeeting);
