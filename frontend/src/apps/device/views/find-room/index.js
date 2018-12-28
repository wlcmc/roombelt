import React  from "react";
import styled from "styled-components/macro";
import { connect } from "react-redux";
import i18next from "i18next";
import { deviceActions } from "apps/device/store/actions";
import { allCalendarsSelector, areAllCalendarsLoadedSelector } from "apps/device/store/selectors";

import Layout from "../../components/Layout";
import CalendarRow from "./CalendarRow";
import { Button, Loader } from "theme";

import IoIosArrowBack from "react-icons/lib/io/ios-arrow-back";

const Content = styled.div`
  padding: 0 0.3em;
  overflow-y: auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const AllCalendarsView = ({ closeAllCalendarsView, calendars, areAllCalendarsLoaded, markUserActivity }) => {
  const header = <div>
    <Button compact primary onClick={closeAllCalendarsView} style={{ minWidth: 0 }}>
      <IoIosArrowBack/>
      <span style={{ verticalAlign: "middle", marginRight: "0.3em" }}>{i18next.t("actions.back")}</span>
    </Button>
    <span style={{ verticalAlign: "middle", marginLeft: "1em" }}>{i18next.t("actions.find-room")}</span>
  </div>;

  return (
    <Layout title={header}>
      <Content onScroll={markUserActivity}>
        {!areAllCalendarsLoaded && <div style={{ alignSelf: "center", margin: "auto" }}><Loader/></div>}
        {calendars.map(calendar => <CalendarRow key={calendar.id} calendarId={calendar.id}/>)}
      </Content>
    </Layout>
  );
};

const mapStateToProps = state => ({
  areAllCalendarsLoaded: areAllCalendarsLoadedSelector(state),
  calendars: allCalendarsSelector(state)
});

const mapDispatchToProps = dispatch => ({
  closeAllCalendarsView: () => dispatch(deviceActions.closeAllCalendarsView()),
  markUserActivity: () => dispatch(deviceActions.$allCalendarsViewActivity())
});

export default connect(mapStateToProps, mapDispatchToProps)(AllCalendarsView);