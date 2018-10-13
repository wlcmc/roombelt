const router = require("express-promise-router")();

router.use("/device", async function(req, res) {
  if (req.context.session.scope !== "device") {
    return res.sendStatus(403);
  }

  req.context.device = await req.context.storage.devices.getDeviceById(req.context.session.deviceId);

  if (!req.context.device) {
    return res.sendStatus(404);
  }

  return "next";
});

router.get("/device", async function(req, res) {
  const calendarId = req.context.device.calendarId;
  const calendar = calendarId && await req.context.calendarProvider.getCalendar(calendarId);
  const calendarEvents = calendarId && await req.context.calendarProvider.getEvents(calendarId);
  const events = calendarId && calendarEvents.filter(event => event.endTimestamp > Date.now()).slice(0, 3);

  res.json({
    connectionCode: req.context.device.connectionCode,
    isCalendarSelected: !!calendarId,
    name: calendar && calendar.summary,
    language: req.context.device.language,
    canModifyEvents: calendar && (calendar.accessRole === "writer" || calendar.accessRole === "owner"),
    events
  });

  await req.context.storage.devices.heartbeatDevice(req.context.session.deviceId);
});

router.use("/device/meeting", (req, res, next) => (req.context.device.calendarId ? next() : res.sendStatus(400)));

router.post("/device/meeting", async function(req, res) {
  const calendar = await req.context.calendarProvider.getCalendar(req.context.device.calendarId);
  const events = await req.context.calendarProvider.getEvents(req.context.device.calendarId);
  const nextEvent = events.find(event => event.startTimestamp > Date.now());

  const desiredStartTime = Date.now() + (req.body.timeInMinutes || 15) * 60 * 1000;
  const nextEventStartTime = nextEvent ? nextEvent.startTimestamp : Number.POSITIVE_INFINITY;

  await req.context.calendarProvider.createEvent(req.context.device.calendarId, {
    startTimestamp: Date.now(),
    endTimestamp: Math.min(desiredStartTime, nextEventStartTime),
    isCheckedIn: true,
    summary: req.body.summary || `Meeting in ${calendar.summary}`
  });

  res.sendStatus(201);
});

router.put("/device/meeting/:meetingId", async function(req, res) {
  const events = await req.context.calendarProvider.getEvents(req.context.device.calendarId);
  const event = events.find(event => event.id === req.params.meetingId);

  if (event === -1) {
    return res.sendStatus(404);
  }

  const startNowTime = req.body.startNow && Date.now();
  const endNowTime = req.body.endNow && Date.now();
  const isCheckedIn = req.body.checkIn === true;
  const extensionTime = getExtensionTime();

  await req.context.calendarProvider.patchEvent(req.context.device.calendarId, req.params.meetingId, {
    startTimestamp: startNowTime,
    endTimestamp: endNowTime || extensionTime,
    isCheckedIn
  });

  res.sendStatus(204);

  function getExtensionTime() {
    if (!req.body.extensionTime) return;

    const indexOfEvent = events.indexOf(event);

    const currentEventEndTimestamp = events[indexOfEvent].endTimestamp;
    const nextEventStartTimestamp = events[indexOfEvent + 1] && events[indexOfEvent + 1].startTimestamp;

    const endTime = Math.min(
      currentEventEndTimestamp + req.body.extensionTime * 60 * 1000,
      nextEventStartTimestamp || Number.POSITIVE_INFINITY
    );

    return Math.max(event.endTimestamp, endTime);
  }
});

router.delete("/device/meeting/:meetingId", async function(req, res) {
  await req.context.calendarProvider.deleteEvent(req.context.device.calendarId, req.params.meetingId);

  res.sendStatus(204);
});

module.exports = router;
