import React from "react";
import i18next from "i18next";
import styled from "styled-components/macro";
import { connect } from "react-redux";

import { LoaderButton, Button } from "theme/index";
import { isActionErrorSelector, isRetryingActionSelector } from "apps/device/store/selectors";

import ButtonSet from "./components/ButtonSet";
import { meetingActions } from "apps/device/store/actions";

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

const ActionError = ({ isActionError, isRetryingAction, cancelAction, retryAction }) => (
  <ButtonSet>
    <ErrorTitle>{i18next.t("errors.action-error-title")}</ErrorTitle>
    <LoaderButton primary onClick={retryAction} isLoading={isRetryingAction}>
      {i18next.t("actions.retry")}
    </LoaderButton>
    <Button disabled={isRetryingAction} onClick={cancelAction}>
      {i18next.t("actions.cancel")}
    </Button>
    <ErrorSubtitle>{i18next.t("errors.action-error-subtitle")}</ErrorSubtitle>
  </ButtonSet>
);

const mapStateToProps = state => ({
  isActionError: isActionErrorSelector(state),
  isRetryingAction: isRetryingActionSelector(state)
});

const mapDispatchToProps = dispatch => ({
  retryAction: () => dispatch(meetingActions.retry()),
  cancelAction: () => dispatch(meetingActions.endAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionError);