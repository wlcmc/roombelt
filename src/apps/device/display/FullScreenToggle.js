import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import IoAndroidExpand from "react-icons/lib/io/android-expand";
import { I18n } from "../../../theme";


const Wrapper = styled.div`
  position: absolute;
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
    <I18n>{t =>
      <Wrapper onClick={props.requestFullScreen}>
        <IoAndroidExpand/> <span style={{ verticalAlign: "middle" }}>{t("full-screen")}</span>
      </Wrapper>
    }</I18n>
  );
};

const mapStateToProps = state => ({
  isFullScreenSupported: state.fullScreen.isSupported,
  isFullScreen: state.fullScreen.isFullScreen
});

const mapDispatchToProps = dispatch => ({
  requestFullScreen: () => dispatch({ type: ":device--request-full-screen" })
});

export default connect(mapStateToProps, mapDispatchToProps)(FullScreenToggle);
