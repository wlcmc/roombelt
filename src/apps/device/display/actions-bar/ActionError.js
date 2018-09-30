import React from "react";
import i18next from "i18next";
import styled from "styled-components";
import ButtonSet from "./ButtonSet";
import { LoaderButton, Button } from "../../../../theme";

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

export default props => (
  <ButtonSet>
    <ErrorTitle>{i18next.t("errors.action-error-title")}</ErrorTitle>
    <LoaderButton primary onClick={props.onRetry} isLoading={props.isRetrying}>
      {i18next.t("actions.retry")}
    </LoaderButton>
    <Button disabled={props.isRetrying} onClick={props.onCancel}>
      {i18next.t("actions.cancel")}
    </Button>
    <ErrorSubtitle>{i18next.t("errors.action-error-subtitle")}</ErrorSubtitle>
  </ButtonSet>
);
