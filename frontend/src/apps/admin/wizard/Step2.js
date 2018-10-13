import React from "react";
import StepLayout from "./StepLayout";
import { Text, Select } from "../../../theme";
import { translations } from "../../../i18n";

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.select = React.createRef();
  }

  focus() {
    this.select.current.focus();
  }

  render = () => (
    <StepLayout img={require("./calendar.png")}>
      <Text large block>
        Calendar
      </Text>
      <Select
        instanceId="edit-device-choose-calendar"
        value={this.props.calendarId}
        options={Object.values(this.props.calendars)}
        getOptionLabel={calendar => calendar.summary + (calendar.canModifyEvents ? "" : " (read only)")}
        getOptionValue={calendar => calendar.id}
        isOptionDisabled={calendar => !calendar.canModifyEvents}
        onChange={calendar => this.props.onSetCalendar(calendar && calendar.id)}
        styles={{ container: base => ({ ...base, marginTop: 15, marginBottom: 10 }) }}
        ref={this.select}
        menuPortalTarget={document.body}
      />
      <Text muted small>
        Pick a calendar that will be shown on this device.
      </Text>
      <Text large block style={{ marginTop: 15, marginBottom: 10 }}>Language</Text>
      <Select
        instanceId="edit-device-choose-language"
        value={this.props.language}
        options={Object.values(translations)}
        getOptionLabel={lang => lang.language}
        getOptionValue={lang => lang.key}
        onChange={translation => this.props.onSetLanguage && this.props.onSetLanguage(translation && translation.key)}
        menuPortalTarget={document.body}
      />
    </StepLayout>
  );
}
