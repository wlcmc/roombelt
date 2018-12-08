import React from "react";
import { connect } from "react-redux";
import i18next from "i18next";
import styled from "styled-components/macro";
import { calendarIdsSelector } from "apps/device/store/selectors";
import DashboardRow from "./dashboard-row";
import Layout from "../components/Layout";
import { Table, TableHeader, TableBody, TableRow, TableHeaderColumn } from "theme";

const DashboardWrapper = styled.div`
  background: white;
  flex-grow: 1;
  font-size: 0.8em;
`;

const Dashboard = ({ calendarIds }) => <Layout title={i18next.t("dashboard.page-title")}>
    <DashboardWrapper>
      <Table style={{ background: "white" }}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>{i18next.t("dashboard.meeting")}</TableHeaderColumn>
            <TableHeaderColumn style={{ width: "30%" }}>{i18next.t("dashboard.calendar")}</TableHeaderColumn>
            <TableHeaderColumn style={{ width: "28%", overflow: "hidden" }}>{i18next.t("dashboard.status")}</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {calendarIds.map(calendarId => <DashboardRow key={calendarId} calendarId={calendarId}/>)}
        </TableBody>
      </Table>
    </DashboardWrapper>
  </Layout>
;

const mapStateToProps = state => ({
  calendarIds: calendarIdsSelector(state)
});

export default connect(mapStateToProps)(Dashboard);