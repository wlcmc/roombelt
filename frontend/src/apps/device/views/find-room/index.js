import React from "react";
import styled from "styled-components/macro";
import { connect } from "react-redux";
import { deviceActions } from "apps/device/store/actions";
import { allCalendarsSelector, areAllCalendarsLoadedSelector } from "apps/device/store/selectors";

import Layout from "../../components/Layout";
import CalendarRow from "./CalendarRow";
import { Button } from "theme";

const Footer = styled.div`
  padding: 10px;
`;

const AllCalendarsView = ({ closeAllCalendarsView, calendars, areAllCalendarsLoaded }) => {
  const footer = <Footer children={<Button primary onClick={closeAllCalendarsView}>Back</Button>}/>;

  return (
    <Layout title={"Find a room"} footer={footer}>
      {areAllCalendarsLoaded ? null : <div>Loading...</div>}
      {calendars.map(calendar => <CalendarRow key={calendar.id} calendarId={calendar.id}/>)}
    </Layout>
  );
};

const mapStateToProps = state => ({
  areAllCalendarsLoaded: areAllCalendarsLoadedSelector(state),
  calendars: allCalendarsSelector(state)
});

const mapDispatchToProps = dispatch => ({
  closeAllCalendarsView: () => dispatch(deviceActions.closeAllCalendarsView())
});

export default connect(mapStateToProps, mapDispatchToProps)(AllCalendarsView);