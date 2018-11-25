import React from "react";
import { connect } from "react-redux";
import styled from "styled-components/macro";
import { calendarNameSelector, currentMeetingSelector, nextMeetingSelector } from "../store/selectors";

import NextMeeting from "./NextMeeting";
import CurrentMeeting from "./CurrentMeeting";
import RoomAvailable from "./RoomAvailable";
import ActionsBar from "./actions-bar";
import Layout from "../components/Layout";

const ActionsBarWrapper = styled.div`
  margin: 1rem 0;
  height: 3rem;
`;

const Content = styled.div`
  padding: 0.5em;
`;

const CalendarView = ({ calendarName, style, nextMeeting, currentMeeting }) => (
  <Layout title={calendarName} style={style} footer={nextMeeting && <NextMeeting/>}>
    <Content>
      {currentMeeting ? <CurrentMeeting/> : <RoomAvailable/>}
      <ActionsBarWrapper><ActionsBar/></ActionsBarWrapper>
    </Content>
  </Layout>
);

const mapStateToProps = state => ({
  calendarName: calendarNameSelector(state),
  currentMeeting: currentMeetingSelector(state),
  nextMeeting: nextMeetingSelector(state)
});

export default connect(mapStateToProps)(CalendarView);
