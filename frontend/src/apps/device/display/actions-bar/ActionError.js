import React from "react";
import i18next from "i18next";
import styled from "styled-components";
import { connect } from "react-redux";

import { LoaderButton, Button } from "theme/index";
import { currentActionSourceSelector } from "apps/device/store/selectors";
import { cancelMeetingAction, retryMeetingAction } from "apps/device/store/meeting-actions";

import ButtonSet from "./components/ButtonSet";

const ErrorTitle = styled.div`
  display: inline-block;
  background: white;
  padding: 0.75em;
  margin-right: 1em;
  border-radius: 0.2em;
`;

const ErrorSubtitle = styled.div`
  margin-top: 1em;
`;

const ActionError = ({ currentActionSource, cancelAction, retryAction }) => (
  <ButtonSet>
    <ErrorTitle>{i18next.t("errors.action-error-title")}</ErrorTitle>
    <LoaderButton primary onClick={() => retryAction("retry")} isLoading={currentActionSource === "retry"}>
      {i18next.t("actions.retry")}
    </LoaderButton>
    <Button disabled={currentActionSource !== null} onClick={cancelAction}>
      {i18next.t("actions.cancel")}
    </Button>
    <ErrorSubtitle>{i18next.t("errors.action-error-subtitle")}</ErrorSubtitle>
  </ButtonSet>
);

const mapStateToProps = state => ({
  currentActionSource: currentActionSourceSelector(state)
});

const mapDispatchToProps = dispatch => ({
  retryAction: (source) => dispatch(retryMeetingAction(source)),
  cancelAction: () => dispatch(cancelMeetingAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionError);