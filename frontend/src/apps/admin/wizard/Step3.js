import React from "react";
import { Text, Select, Button, LoaderButton } from "theme";
import WizardStepLayout from "./WizardStepLayout";
import { PaidDisclaimer } from "apps/admin/Paid";
import { translations } from "../../../i18n";
import { connectDeviceWizard } from "apps/admin/store/actions";
import { connect } from "react-redux";
import { useWizard } from "apps/admin/wizard/Wizard";

const Content = ({ isDashboard, calendars, calendarId, onSetCalendar, language, onSetLanguage }) => {
  const { isCurrentStep, isTransitioning } = useWizard();

  const calendarSelector = (
    <>
      <Text large block>
        Calendar
      </Text>
      <Select
        instanceId="edit-device-choose-calendar"
        value={calendarId}
        options={Object.values(calendars)}
        getOptionLabel={calendar => calendar.summary + (calendar.canModifyEvents ? "" : " (read only)")}
        getOptionValue={calendar => calendar.id}
        isOptionDisabled={calendar => !calendar.canModifyEvents}
        onChange={calendar => onSetCalendar(calendar && calendar.id)}
        styles={{ container: base => ({ ...base, marginTop: 15, marginBottom: 10 }) }}
        menuPortalTarget={document.body}
        autofocus={isCurrentStep && !isTransitioning}
        tabIndex={isCurrentStep ? 0 : -1}
      />
      <Text muted small>
        Pick a calendar that will be shown on this device.
      </Text>
    </>
  );

  const languageSelector = (
    <>
      <Text large block style={{ marginTop: 15, marginBottom: 10 }}>Language</Text>
      <Select
        instanceId="edit-device-choose-language"
        value={language}
        options={Object.values(translations)}
        getOptionLabel={lang => lang.language}
        getOptionValue={lang => lang.key}
        onChange={translation => onSetLanguage && onSetLanguage(translation && translation.key)}
        menuPortalTarget={document.body}
        autofocus={isDashboard && isCurrentStep && !isTransitioning}
        tabIndex={isCurrentStep ? 0 : -1}
      />
    </>
  );

  return (
    <WizardStepLayout img={require("./calendar.png")}>
      {!isDashboard && calendarSelector}
      {languageSelector}
    </WizardStepLayout>
  );
};

const Buttons = ({ onSubmit, onBack, isSubmitting }) => (
  <>
    <div>
      <Button disabled={isSubmitting} onClick={onBack}>Back</Button>
      <LoaderButton primary onClick={onSubmit} isLoading={isSubmitting}>Voila</LoaderButton>
    </div>
    <PaidDisclaimer/>
  </>
);

const mapStateToProps = state => ({
  calendars: state.calendars,
  isDashboard: state.connectDeviceWizard.deviceType === "dashboard",
  isSubmitting: state.connectDeviceWizard.isSubmitting,
  calendarId: state.connectDeviceWizard.calendarId,
  language: state.connectDeviceWizard.language
});

const mapDispatchToProps = dispatch => ({
  onBack: () => dispatch(connectDeviceWizard.thirdStep.previousStep()),
  onSubmit: () => dispatch(connectDeviceWizard.thirdStep.submit()),
  onSetCalendar: calendarId => dispatch(connectDeviceWizard.thirdStep.setCalendarId(calendarId)),
  onSetLanguage: language => dispatch(connectDeviceWizard.thirdStep.setLanguage(language))
});

export default {
  key: "configuration",
  name: "Configure",
  content: connect(mapStateToProps, mapDispatchToProps)(Content),
  buttons: connect(mapStateToProps, mapDispatchToProps)(Buttons)
};
