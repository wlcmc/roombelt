export const newDeviceData = state => ({
  connectionCode: state.connectDeviceWizard.connectionCode,
  deviceId: state.connectDeviceWizard.deviceId,
  calendarId: state.connectDeviceWizard.calendarId,
  language: state.connectDeviceWizard.language
});

export const editDeviceDate = state => ({
  deviceId: state.editedDevice.data.id,
  calendarId: state.editedDevice.data.calendarId,
  language: state.editedDevice.data.language
});

export const removedDeviceId = state => state.removedDevice;