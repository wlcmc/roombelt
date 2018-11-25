import React from "react";
import { connect } from "react-redux";

import EditDeviceModal from "./EditDeviceModal";
import RemoveDeviceModal from "./RemoveDeviceModal";
import { removeDeviceDialog } from "apps/admin/store/actions";

const name = (device, calendars) => {
  return device ? calendars[device.calendarId] && calendars[device.calendarId].summary : null;
};

const Modals = props => (
  <React.Fragment>
    <EditDeviceModal/>
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
  removedDevice: state.removedDevice
});

const mapDispatchToProps = dispatch => ({
  onConfirmRemoveDevice: () => dispatch(removeDeviceDialog.submit()),
  onCancelRemoveDevice: () => dispatch(removeDeviceDialog.hide())
});

export default connect(mapStateToProps, mapDispatchToProps)(Modals);
