import React from "react";
import i18next from "i18next";
import { connect } from "react-redux";
import styled from "styled-components/macro";

import { Time } from "theme/index";
import { MeetingTitle, MeetingSubtitle } from "./Components";
import { nextMeetingSelector, timestampSelector } from "../../store/selectors";

const Wrapper = styled.div`
  padding:0.5em;
`;

const NextMeeting = props =>
  <Wrapper>
    <MeetingTitle>
      {i18next.t("meeting.next")}
    </MeetingTitle>
    <MeetingSubtitle>
      {props.nextMeeting.summary + " "}
      <Time timestamp={props.nextMeeting.startTimestamp}/> - <Time timestamp={props.nextMeeting.endTimestamp}/>
    </MeetingSubtitle>
  </Wrapper>;

const mapStateToProps = state => ({
  nextMeeting: nextMeetingSelector(state),
  timestamp: timestampSelector(state)
});

export default connect(mapStateToProps)(NextMeeting);
