import React from "react";
import { render } from "react-testing-library";
import DashboardRowView from "./DashboardRowView";

const min = (min) => min * 60 * 1000;

const renderDashboard = (props = {}) => {
  const table = document.createElement("tbody");
  return render(<DashboardRowView {...props}/>, {
    container: document.body.appendChild(table)
  });
};

it("Renders calendar name", () => {
  const calendarName = "Sample calendar name";
  const { getByText } = renderDashboard({ calendarName });
  expect(getByText(calendarName)).toBeInTheDocument();
});

it("Renders that there's no meetings today", () => {
  const { getByText } = renderDashboard();
  expect(getByText("dashboard.no-meetings-today")).toBeInTheDocument();
});

it("Renders current meeting name", () => {
  const timestamp = min(5);
  const currentMeeting = { startTimestamp: min(0), endTimestamp: min(10), summary: "Test meeting" };
  const { getByText } = renderDashboard({ timestamp, currentMeeting });
  expect(getByText(currentMeeting.summary)).toBeInTheDocument();
});

it("Renders next meeting name", () => {
  const timestamp = min(0);
  const nextMeeting = { startTimestamp: min(5), endTimestamp: min(10), summary: "Test next meeting" };
  const { getByText } = renderDashboard({ timestamp, nextMeeting });
  expect(getByText(nextMeeting.summary)).toBeInTheDocument();
});

it("Renders current meeting starting in 3 minutes", () => {
  const timestamp = min(0);
  const currentMeeting = { startTimestamp: min(3) };
  const { getByText } = renderDashboard({ timestamp, currentMeeting });
  expect(getByText("dashboard.starts-in | 3 min")).toBeInTheDocument();
});

it("Renders current meeting starting in 3 minutes when there's 2.5 minutes left", () => {
  const timestamp = min(0);
  const currentMeeting = { startTimestamp: min(2.5) };
  const { getByText } = renderDashboard({ timestamp, currentMeeting });
  expect(getByText("dashboard.starts-in | 3 min")).toBeInTheDocument();
});

it("Renders current meeting starts now when it's 0.5min after it started", () => {
  const timestamp = min(0.5);
  const currentMeeting = { startTimestamp: min(0) };
  const { getByText } = renderDashboard({ timestamp, currentMeeting });
  expect(getByText("dashboard.starts-now")).toBeInTheDocument();
});

it("Renders current meeting started 10 minutes ago when it's 10.5 minutes after it started", () => {
  const timestamp = min(10.5);
  const currentMeeting = { startTimestamp: min(0) };
  const { getByText } = renderDashboard({ timestamp, currentMeeting });
  expect(getByText("dashboard.started | 10 min")).toBeInTheDocument();
});

it("Renders when current meeting ends if there's no other meeting later", () => {
  const timestamp = min(25);
  const currentMeeting = { startTimestamp: min(0), endTimestamp: min(30) };
  const { getByText } = renderDashboard({ timestamp, currentMeeting });
  expect(getByText("dashboard.ends-in | 5 min")).toBeInTheDocument();
});

it("Renders when next meeting starts if it's close to the end of current meeting", () => {
  const timestamp = min(25.5);
  const currentMeeting = { startTimestamp: min(0), endTimestamp: min(30) };
  const nextMeeting = { startTimestamp: min(40) };
  const { getByText } = renderDashboard({ timestamp, currentMeeting, nextMeeting });
  expect(getByText("dashboard.starts-in | 15 min")).toBeInTheDocument();
});

it("Renders when current meeting ends if it's a lot of time to start of next meeting", () => {
  const timestamp = min(25.5);
  const currentMeeting = { startTimestamp: min(0), endTimestamp: min(30) };
  const nextMeeting = { startTimestamp: min(400) };
  const { getByText } = renderDashboard({ timestamp, currentMeeting, nextMeeting });
  expect(getByText("dashboard.ends-in | 5 min")).toBeInTheDocument();
});

it("Renders how long room is free if there's no current meeting and next meeting starts in 2 hours", () => {
  const timestamp = min(0.5);
  const nextMeeting = { startTimestamp: min(120) };
  const { getByText } = renderDashboard({ timestamp, nextMeeting });
  expect(getByText("dashboard.free-for | 2 h")).toBeInTheDocument();
});

it("Renders when next meeting starts if it's starting soon and there's no current meeting", () => {
  const timestamp = min(0.5);
  const nextMeeting = { startTimestamp: min(12) };
  const { getByText } = renderDashboard({ timestamp, nextMeeting });
  expect(getByText("dashboard.starts-in | 12 min")).toBeInTheDocument();
});