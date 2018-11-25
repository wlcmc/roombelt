import React from "react";
import { connect } from "react-redux";
import styled from "styled-components/macro";
import { Time, PageLoaded } from "../../../theme";
import FullScreenToggle from "../components/FullScreenToggle";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;

  background: #f5f7fb;
  font-family: "Roboto", sans-serif;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  font-size: 6px;

  @media (min-width: 300px) {
    font-size: 10px;
  }

  @media (min-width: 500px) {
    font-size: 16px;
  }

  @media (min-width: 700px) {
    font-size: 20px;
  }

  @media (min-width: 900px) {
    font-size: 24px;
  }

  @media (min-width: 1100px) {
    font-size: 30px;
  }

  @media (min-width: 1300px) {
    font-size: 35px;
  }

  @media (min-width: 1500px) {
    font-size: 40px;
  }

  @media (min-width: 1700px) {
    font-size: 46px;
  }
`;

const Header = styled.header`
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  background: white;
  border-bottom: 0.1rem solid #ccc;
`;

const PageTitle = styled.span`
  font-size: 1.5em;
  padding: 0.3em;
`;

const CurrentTime = styled.span`
  font-size: 1.5em;
  padding: 0.3em;
`;

const MainContent = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Footer = styled.div`
  flex: 0 0 auto;
`;

const CalendarView = ({ currentTimestamp, style, title, children, footer }) => (
  <Wrapper style={style}>
    <PageLoaded/>
    <Header>
      <PageTitle>{title}</PageTitle>
      <CurrentTime><Time timestamp={currentTimestamp} blinking/></CurrentTime>
    </Header>
    <MainContent>{children}</MainContent>
    <Footer>{footer}</Footer>
    <FullScreenToggle/>
  </Wrapper>
);

const mapStateToProps = state => ({
  currentTimestamp: state.timestamp
});

export default connect(mapStateToProps)(CalendarView);
