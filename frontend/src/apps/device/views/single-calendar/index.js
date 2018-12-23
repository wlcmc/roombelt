import React from "react";
import { connect } from "react-redux";
import styled from "styled-components/macro";
import { calendarNameSelector, currentMeetingSelector, nextMeetingSelector } from "../../store/selectors";

import NextMeeting from "./NextMeeting";
import CurrentMeeting from "./CurrentMeeting";
import RoomAvailable from "./RoomAvailable";
import ActionsBar from "./actions-bar/index";
import Layout from "../../components/Layout";
import { deviceActions } from "apps/device/store/actions";
import { Button } from "theme";

const ActionsBarWrapper = styled.div`
  margin: 1rem 0;
  height: 3rem;
`;

const Content = styled.div`
  padding: 0.5em;
`;

const SidebarButton = styled(Button)`
  transform-origin: center center 0;
  transform: rotate(-90deg);
  width: 8em;
  flex: 0 0 auto; 
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  height: 1.2em;
  font-size: 1em;
  box-sizing: border-box;
  padding: 0.1em;
`;

const CalendarView = ({ calendarName, style, nextMeeting, currentMeeting, showAllCalendarsView }) => (
  <Layout title={calendarName} style={style} footer={nextMeeting && <NextMeeting/>}
          sidebar={<SidebarButton onClick={showAllCalendarsView} info>Find room</SidebarButton>}>
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

const mapDispatchToProps = dispatch => ({
  showAllCalendarsView: () => dispatch(deviceActions.showAllCalendarsView())
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarView);
