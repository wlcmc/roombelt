import React, { useRef, useEffect } from "react";
import styled from "styled-components/macro";
import { connect } from "react-redux";

import { Modal, Button, LoaderButton, Select } from "theme";
import { PaidDisclaimer } from "apps/admin/Paid";
import { translations } from "i18n";
import { editDeviceDialog } from "apps/admin/store/actions";

const FormField = styled.div`
  margin-bottom: 20px;
`;

const FormFieldLabel = styled.label`
  margin-bottom: 5px;
  display: block;
  color: #333;
`;

const EditDeviceModal = ({ isVisible, isSaving, device, calendars, onCancel, onSubmit, onChangeType, onChangeCalendar, onChangeLanguage }) => {
  const select = useRef();
  useEffect(() => isVisible && select.current.focus(), [isVisible]);

  const footer = (
    <>
      <PaidDisclaimer/>
      <div style={{ flexGrow: 1 }}/>
      <Button disabled={isSaving} onClick={onCancel}>Cancel</Button>
      <LoaderButton primary onClick={onSubmit} isLoading={isSaving}>
        OK
      </LoaderButton>
    </>
  );

  const getValue = ({ deviceType, calendarId }) => `${deviceType}-${calendarId}`;

  const viewOptions = [
    { label: "Dashboard 💰", deviceType: "dashboard", calendarId: null, isDisabled: false },
    {
      label: "Calendars",
      options: Object.values(calendars).map(calendar => ({
        label: calendar.summary + (calendar.canModifyEvents ? "" : " (read only)"),
        deviceType: "calendar",
        calendarId: calendar.id,
        isDisabled: !calendar.canModifyEvents
      }))
    }
  ];

  const onOptionSelected = option => {
    onChangeCalendar(option && option.calendarId);
    onChangeType(option && option.deviceType);
  };

  return (
    <Modal
      title="Device settings"
      visible={isVisible}
      footer={footer}
      onCloseButtonClicked={onCancel}
    >
      <FormField>
        <FormFieldLabel>View</FormFieldLabel>
        <Select
          instanceId="edit-device-choose-calendar"
          getOptionValue={getValue}
          value={device && getValue(device)}
          options={viewOptions}
          onChange={onOptionSelected}
          ref={select}
        />
      </FormField>

      <FormField>
        <FormFieldLabel>Language</FormFieldLabel>
        <Select
          instanceId="edit-device-choose-language"
          value={(device && device.language) || "en-US"}
          options={Object.values(translations)}
          getOptionLabel={lang => lang.language}
          getOptionValue={lang => lang.key}
          onChange={translation => onChangeLanguage && onChangeLanguage(translation && translation.key)}
        />
      </FormField>
    </Modal>
  );
};

const mapStateToProps = state => ({
  isVisible: !!state.editedDevice.data,
  isSaving: state.editedDevice.isSaving,
  device: state.editedDevice.data,
  calendars: state.calendars
});

const mapDispatchToProps = dispatch => ({
  onSubmit: () => dispatch(editDeviceDialog.submit()),
  onCancel: () => dispatch(editDeviceDialog.hide()),
  onChangeType: deviceType => dispatch(editDeviceDialog.setDeviceType(deviceType)),
  onChangeCalendar: calendarId => dispatch(editDeviceDialog.setCalendarId(calendarId)),
  onChangeLanguage: language => dispatch(editDeviceDialog.setLanguage(language))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditDeviceModal);
