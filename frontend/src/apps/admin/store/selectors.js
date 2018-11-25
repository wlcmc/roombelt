export const newDeviceData = state => ({
  connectionCode: state.connectDeviceWizard.connectionCode,
  deviceId: state.connectDeviceWizard.deviceId,
  calendarId: state.connectDeviceWizard.calendarId,
  deviceType: state.connectDeviceWizard.deviceType,
  language: state.connectDeviceWizard.language
});

export const editDeviceData = state => ({
  deviceId: state.editedDevice.data.id,
  deviceType: state.editedDevice.data.deviceType,
  calendarId: state.editedDevice.data.calendarId,
  language: state.editedDevice.data.language
});

export const removedDeviceId = state => state.removedDevice;