import React from "react";
import i18next from "i18next";
import { connect } from "react-redux";

import { Time } from "../../../theme";
import { MeetingTitle, MeetingSubtitle } from "./Components";
import { nextMeetingSelector, timestampSelector } from "../store/selectors";

const NextMeeting = props =>
  <React.Fragment>
    <MeetingTitle>
      {i18next.t("meeting.next")}
    </MeetingTitle>
    <MeetingSubtitle>
      {props.nextMeeting.summary + " "}
      <Time timestamp={props.nextMeeting.startTimestamp}/> - <Time timestamp={props.nextMeeting.endTimestamp}/>
    </MeetingSubtitle>
  </React.Fragment>;

const mapStateToProps = state => ({
  nextMeeting: nextMeetingSelector(state),
  timestamp: timestampSelector(state)
});

export default connect(mapStateToProps)(NextMeeting);
