import axios from "axios";

axios.interceptors.request.use(config => ({ ...config, url: config.url + "?_ts=" + Date.now() }));
axios.interceptors.response.use(response => response.data);

export async function isOnline() {
  try {
    await getAuth();
    return true;
  } catch (err) {
    return false;
  }
}

export function removeAuth() {
  return axios.delete("/api/auth");
}

export function getAuth() {
  return axios.get("/api/auth");
}

export function createDevice() {
  return axios.put("/api/auth/device");
}

export function getUserDetails() {
  return axios.get("/api/admin/user");
}

export function getConnectedDevices() {
  return axios.get("/api/admin/device");
}

export function connectDevice(connectionCode) {
  return axios.post("/api/admin/device", { connectionCode });
}

export function disconnectDevice(deviceId) {
  return axios.delete(`/api/admin/device/${encodeURIComponent(deviceId)}`);
}

export function getCalendars() {
  return axios.get("/api/admin/calendar");
}

export function setOptionsForDevice(deviceId, calendarId, language) {
  return axios.put(`/api/admin/device/${encodeURIComponent(deviceId)}`, { calendarId, language });
}

export function getDeviceDetails() {
  return axios.get("/api/device");
}

export function createMeeting(timeInMinutes, summary) {
  return axios.post("/api/device/meeting", { timeInMinutes, summary });
}

export function updateMeeting(meetingId, { startNow, endNow, extensionTime, checkIn }) {
  return axios.put(`/api/device/meeting/${encodeURIComponent(meetingId)}`, {
    startNow,
    endNow,
    extensionTime,
    checkIn
  });
}

export function deleteMeeting(meetingId) {
  return axios.delete(`/api/device/meeting/${encodeURIComponent(meetingId)}`);
}
