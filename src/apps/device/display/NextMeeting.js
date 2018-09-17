import React from "react";
import { connect } from "react-redux";

import { Time } from "../../../theme";
import { MeetingTitle, MeetingSubtitle } from "./Components";
import { nextMeetingSelector, timestampSelector } from "../store/selectors";
import { prettyFormatDays } from "../../../services/formatting";

const NextMeeting = props =>
  <React.Fragment>
    <MeetingTitle>
      Next meeting {prettyFormatDays(props.nextMeeting.startTimestamp, props.timestamp)}
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
