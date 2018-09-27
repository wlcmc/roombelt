import React from "react";
import styled from "styled-components";
import ButtonSet from "./ButtonSet";
import { LoaderButton, Button, I18n } from "../../../../theme";

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
  <I18n>{t =>
    <ButtonSet>
      <ErrorTitle>{t("errors.action-error-title")}</ErrorTitle>
      <LoaderButton primary onClick={props.onRetry} isLoading={props.isRetrying}>
        {t("actions.retry")}
      </LoaderButton>
      <Button disabled={props.isRetrying} onClick={props.onCancel}>
        {t("actions.cancel")}
      </Button>
      <ErrorSubtitle>{t("errors.action-error-subtitle")}</ErrorSubtitle>
    </ButtonSet>
  }</I18n>
);
