import React from "react";
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
    <ErrorTitle>Problem with performing this operation</ErrorTitle>
    <LoaderButton primary onClick={props.onRetry} isLoading={props.isRetrying}>
      Retry
    </LoaderButton>
    <Button disabled={props.isRetrying} onClick={props.onCancel}>
      Cancel
    </Button>
    <ErrorSubtitle>If this problem continues to occur contact your IT administrator.</ErrorSubtitle>
  </ButtonSet>
);
