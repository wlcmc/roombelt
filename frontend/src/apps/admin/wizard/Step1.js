import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Text, Input, LoaderButton, Button } from "theme";
import styled from "styled-components/macro";
import WizardStepLayout from "./WizardStepLayout";
import { useWizard } from "./Wizard";
import { connectDeviceWizard } from "apps/admin/store/actions";

const ErrorMessage = styled.p`
  font-size: 12px;
  height: 12px;
  line-height: 1;
  color: red;
  margin-top: 20px;
`;

const Content = ({ connectionCode, connectionError, onChangeConnectionCode, onSubmit, onCancel }) => {
  const { isCurrentStep, isTransitioning } = useWizard();
  const input = useRef();

  const onKeyDown = event => {
    if (event.key === "Enter") onSubmit();
    if (event.key === "Escape") onCancel();
  };

  useEffect(() => connectionError && input.current.focus(), [connectionError]);

  return (
    <WizardStepLayout img={require("./tablet.png")}>
      <Text large block>
        Connection code
      </Text>
      <Input
        onChange={event => onChangeConnectionCode(event.target.value)}
        onKeyDown={onKeyDown}
        value={connectionCode}
        error={connectionError}
        placeholder="e.g. 12345"
        autofocus={isCurrentStep && !isTransitioning}
        tabIndex={isCurrentStep ? 0 : -1}
        ref={input}
        style={{ marginTop: 15, marginBottom: 10 }}
      />
      <Text muted small>
        To get connection code open Roombelt website using browser on your tablet and click "Register device".
      </Text>
      <ErrorMessage>{connectionError}</ErrorMessage>
    </WizardStepLayout>
  );
};

const Buttons = ({ onSubmit, onCancel, isSubmitting }) => (
  <>
    <LoaderButton primary onClick={onSubmit} isLoading={isSubmitting}>Next</LoaderButton>
    <Button onClick={onCancel}>Close</Button>
  </>
);

const mapStateToProps = state => ({
  connectionCode: state.connectDeviceWizard.connectionCode,
  connectionError: state.connectDeviceWizard.errorMessage,
  isSubmitting: state.connectDeviceWizard.isSubmitting
});

const mapDispatchToProps = dispatch => ({
  onChangeConnectionCode: connectionCode => dispatch(connectDeviceWizard.firstStep.setConnectionCode(connectionCode)),
  onCancel: () => dispatch(connectDeviceWizard.hide()),
  onSubmit: () => dispatch(connectDeviceWizard.firstStep.submit())
});

export default {
  key: "connection-code",
  name: "Connect",
  content: connect(mapStateToProps, mapDispatchToProps)(Content),
  buttons: connect(mapStateToProps, mapDispatchToProps)(Buttons)
};
