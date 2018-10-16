import React from "react";
import { connect } from "react-redux";

import EditDeviceModal from "./EditDeviceModal";
import RemoveDeviceModal from "./RemoveDeviceModal";
import { editDeviceDialog, removeDeviceDialog } from "apps/admin/store/actions";

const name = (device, calendars) => {
  return device ? calendars[device.calendarId] && calendars[device.calendarId].summary : null;
};

const Modals = props => (
  <React.Fragment>
    <EditDeviceModal
      isVisible={!!props.editedDevice.data}
      isSaving={props.editedDevice.isSaving}
      device={props.editedDevice.data}
      calendars={props.calendars}
      onCancel={props.onCancelEditDevice}
      onSubmit={props.onSubmitEditDevice}
      onChangeCalendar={props.onChangeDeviceCalendar}
      onChangeLanguage={props.onChangeLanguage}
    />

    <RemoveDeviceModal
      isVisible={!!props.removedDevice}
      onCancel={props.onCancelRemoveDevice}
      onConfirm={props.onConfirmRemoveDevice}
      deviceName={name(props.removedDevice, props.calendars)}
    />
  </React.Fragment>
);

const mapStateToProps = state => ({
  calendars: state.calendars,
  editedDevice: state.editedDevice,
  removedDevice: state.removedDevice
});

const mapDispatchToProps = dispatch => ({
  onSubmitEditDevice: () => dispatch(editDeviceDialog.submit()),
  onCancelEditDevice: () => dispatch(editDeviceDialog.hide()),
  onChangeDeviceCalendar: calendarId => dispatch(editDeviceDialog.setCalendarId(calendarId)),
  onChangeLanguage: language => dispatch(editDeviceDialog.setLanguage(language)),

  onConfirmRemoveDevice: () => dispatch(removeDeviceDialog.submit()),
  onCancelRemoveDevice: () => dispatch(removeDeviceDialog.hide())
});

export default connect(mapStateToProps, mapDispatchToProps)(Modals);
