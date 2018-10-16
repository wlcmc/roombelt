import React from "react";
import styled from "styled-components";
import { Button, LoaderButton } from "../../../theme/index";

const FooterWrapper = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  border-top: 1px solid #ccc;
`;

export default props => (
  <FooterWrapper>
    <LoaderButton primary onClick={props.onSubmit} isLoading={props.isSubmitting}>
      {props.submitButton}
    </LoaderButton>
    <Button style={{ visibility: props.showCloseButton ? "visible" : "hidden" }} onClick={props.onClose}>
      Close
    </Button>
  </FooterWrapper>
);
