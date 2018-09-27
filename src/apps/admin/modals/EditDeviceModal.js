import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Modal, Button, LoaderButton, Select } from "../../../theme";
import translations from "../../../i18n";

const FormField = styled.div`
  margin-bottom: 20px;
`;

const FormFieldLabel = styled.label`
  margin-bottom: 5px;
  display: block;
  color: #333;
`;

class EditDeviceModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.select = React.createRef();
  }

  render = () => {
    const footer = (
      <React.Fragment>
        <Button onClick={this.props.onCancel}>Cancel</Button>
        <LoaderButton primary onClick={this.props.onSubmit} isLoading={this.props.device && this.props.isSaving}>
          OK
        </LoaderButton>
      </React.Fragment>
    );

    return (
      <Modal
        title="Device settings"
        visible={this.props.isVisible}
        footer={footer}
        onCloseButtonClicked={this.props.onCancel}
      >
        <FormField>
          <FormFieldLabel>Calendar</FormFieldLabel>
          <Select
            instanceId="edit-device-choose-calendar"
            value={this.props.device && this.props.device.calendarId}
            options={Object.values(this.props.calendars)}
            getOptionLabel={calendar => calendar.summary + (calendar.canModifyEvents ? "" : " (read only)")}
            getOptionValue={calendar => calendar.id}
            isOptionDisabled={calendar => !calendar.canModifyEvents}
            onChange={calendar => this.props.onChangeCalendar && this.props.onChangeCalendar(calendar && calendar.id)}
            ref={this.select}
          />
        </FormField>


        <FormField>
          <FormFieldLabel>Language</FormFieldLabel>
          <Select
            instanceId="edit-device-choose-language"
            value={(this.props.device && this.props.device.language) || "en-US"}
            options={Object.values(translations)}
            getOptionLabel={lang => lang.language}
            getOptionValue={lang => lang.key}
            onChange={translation => this.props.onChangeLanguage && this.props.onChangeLanguage(translation && translation.key)}
          />
        </FormField>
      </Modal>
    );
  };

  componentDidUpdate(previousProps) {
    if (this.props.isVisible && !previousProps.isVisible) {
      this.select.current.focus();
    }
  }
}

EditDeviceModal.propTypes = {
  isVisible: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  onChangeCalendar: PropTypes.func,
  onChangeLanguage: PropTypes.func,
  device: PropTypes.shape({ calendarId: PropTypes.string }),
  calendars: PropTypes.objectOf(
    PropTypes.shape({ id: PropTypes.string.isRequired, summary: PropTypes.string.isRequired })
  )
};

export default EditDeviceModal;
