import React from "react";
import i18next from "i18next";
import styled from "styled-components/macro";
import { connect } from "react-redux";
import IoAndroidExpand from "react-icons/lib/io/android-expand";
import { deviceActions } from "apps/device/store/actions";

const Wrapper = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  opacity: 0.5;
  background: black;
  color: white;
  padding: 0.5em;
  cursor: pointer;
`;

const FullScreenToggle = props => {
  if (!props.isFullScreenSupported || props.isFullScreen) return null;

  return (
    <Wrapper onClick={props.requestFullScreen}>
      <IoAndroidExpand/> <span style={{ verticalAlign: "middle" }}>{i18next.t("full-screen")}</span>
    </Wrapper>
  );
};

const mapStateToProps = state => ({
  isFullScreenSupported: state.fullScreen.isSupported,
  isFullScreen: state.fullScreen.isFullScreen
});

const mapDispatchToProps = dispatch => ({
  requestFullScreen: () => dispatch(deviceActions.requestFullScreen())
});

export default connect(mapStateToProps, mapDispatchToProps)(FullScreenToggle);
