import React from "react";
import { connect } from "react-redux";
import { currentMeetingSelector, isActionErrorSelector, isRetryingActionSelector } from "apps/device/store/selectors";

import ActionError from "../../../components/ActionError";
import RoomAvailable from "./RoomAvailable";
import MeetingNeedsCheckIn from "./MeetingNeedsCheckIn";
import MeetingCheckedIn from "./MeetingCheckedIn";

const ActionsBar = ({ isActionError, isRetryingAction, currentMeeting }) => {
  if (isActionError || isRetryingAction) return <ActionError/>;
  if (!currentMeeting) return <RoomAvailable/>;
  if (!currentMeeting.isCheckedIn) return <MeetingNeedsCheckIn/>;
  return <MeetingCheckedIn/>;
};

const mapStateToProps = state => ({
  currentMeeting: currentMeetingSelector(state),
  isActionError: isActionErrorSelector(state),
  isRetryingAction: isRetryingActionSelector(state),
});

export default connect(mapStateToProps)(ActionsBar);
