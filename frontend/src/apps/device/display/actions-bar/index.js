import React from "react";
import { connect } from "react-redux";
import { currentMeetingSelector } from "apps/device/store/selectors";

import ActionError from "./ActionError";
import RoomAvailable from "./RoomAvailable";
import MeetingNeedsCheckIn from "./MeetingNeedsCheckIn";
import MeetingCheckedIn from "./MeetingCheckedIn";
import EndMeeting from "./components/ConfirmBar";

const ActionsBar = ({ isActionError, currentMeeting, idOfMeetingToEnd }) => {
  if (isActionError) return <ActionError/>;
  if (!currentMeeting) return <RoomAvailable/>;
  if (currentMeeting.id === idOfMeetingToEnd) return <EndMeeting/>;
  if (!currentMeeting.isCheckedIn) return <MeetingNeedsCheckIn/>;
  return <MeetingCheckedIn/>;
};

const mapStateToProps = state => ({
  currentMeeting: currentMeetingSelector(state),
  isActionError: state.currentMeetingActions.isError,
  idOfMeetingToEnd: null
});

export default connect(mapStateToProps)(ActionsBar);
