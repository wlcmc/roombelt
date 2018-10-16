import React from "react";
import styled from "styled-components";
import { Parallax, ParallaxLayer } from "react-spring";

import { Modal } from "../../../theme/index";
import { connect } from "react-redux";

import WizardHeader from "./WizardHeader";
import WizardFooter from "./WizardFooter";
import Step1 from "./Step1";
import Step2 from "./Step2";
import { connectDeviceWizard } from "apps/admin/store/actions";

const Layout = styled.div`
  width: 100%;
  overflow: hidden;
`;

class ConnectDeviceWizard extends React.Component {
  constructor(props) {
    super(props);
    this.parallax = React.createRef();
    this.step1 = React.createRef();
    this.step2 = React.createRef();
  }

  render = () => (
    <Modal footer={null} header={null} visible={this.props.isVisible} compact wide>
      <Layout>
        <WizardHeader currentStep={this.props.currentStep}/>
        <Parallax
          ref={this.parallax}
          scrolling={false}
          config={{ tension: 25, friction: 8 }}
          pages={2}
          style={{ position: "relative", height: 250 }}
          horizontal
        >
          <ParallaxLayer offset={0}>
            <Step1
              ref={this.step1}
              isActiveStep={this.props.currentStep === 0}
              connectionCode={this.props.connectionCode}
              connectionError={this.props.connectionError}
              onChangeConnectionCode={this.props.onChangeConnectionCode}
              onConfirm={this.props.onClickNext}
              onCancel={this.props.onCancel}
            />
          </ParallaxLayer>
          <ParallaxLayer offset={1}>
            <Step2
              ref={this.step2}
              isActiveStep={this.props.currentStep === 1}
              calendars={this.props.calendars}
              calendarId={this.props.calendarId}
              language={this.props.language}
              onSetCalendar={this.props.onSetCalendar}
              onSetLanguage={this.props.onSetLanguage}
            />
          </ParallaxLayer>
        </Parallax>
        <WizardFooter
          showCloseButton={this.props.currentStep === 0}
          isSubmitting={this.props.isSubmitting}
          submitButton={this.props.currentStep === 0 ? "Next" : "Voila!"}
          onClose={this.props.onCancel}
          onSubmit={this.props.currentStep === 0 ? this.props.onClickNext : this.props.onClickVoila}
        />
      </Layout>
    </Modal>
  );

  componentDidUpdate() {
    this.parallax.current.scrollTo(this.props.currentStep);

    const currentStepRef = this.props.currentStep === 0 ? this.step1 : this.step2;
    if (currentStepRef.current) currentStepRef.current.focus();
  }
}

const mapStateToProps = state => ({
  calendars: state.calendars,
  isVisible: state.connectDeviceWizard.currentStep !== null,
  isSubmitting: state.connectDeviceWizard.isSubmitting,
  currentStep: state.connectDeviceWizard.currentStep,
  connectionCode: state.connectDeviceWizard.connectionCode,
  connectionError: state.connectDeviceWizard.errorMessage,
  calendarId: state.connectDeviceWizard.calendarId,
  language: state.connectDeviceWizard.language
});

const mapDispatchToProps = dispatch => ({
  onCancel: () => dispatch(connectDeviceWizard.hide()),
  onChangeConnectionCode: connectionCode => dispatch(connectDeviceWizard.firstStep.setConnectionCode(connectionCode)),
  onSetCalendar: calendarId => dispatch(connectDeviceWizard.secondStep.setCalendarId(calendarId)),
  onSetLanguage: language => dispatch(connectDeviceWizard.secondStep.setLanguage(language)),
  onClickNext: () => dispatch(connectDeviceWizard.firstStep.submit()),
  onClickVoila: () => dispatch(connectDeviceWizard.secondStep.submit())
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectDeviceWizard);
