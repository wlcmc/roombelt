import React from "react";
import i18next from "i18next";
import { connect } from "react-redux";
import { LoaderButton, Button } from "theme";
import {
  currentActionSourceSelector,
  currentMeetingSelector,
  hasCurrentMeetingStartedSelector
} from "apps/device/store/selectors";

import ConfirmBar from "./components/ConfirmBar";
import { meetingActions } from "apps/device/store/actions";

class MeetingNeedsCheckIn extends React.PureComponent {
  state = { idOfMeetingToCancel: null };

  render() {
    const { currentMeetingId, currentActionSource, hasCurrentMeetingStarted, checkInToMeeting, startMeetingEarly } = this.props;
    const { idOfMeetingToCancel } = this.state;

    if (idOfMeetingToCancel === currentMeetingId) {
      return this.renderCancelMeetingConfirmationBar();
    }

    return (
      <React.Fragment>
        {hasCurrentMeetingStarted && <LoaderButton primary
                                                   onClick={() => checkInToMeeting("check-in")}
                                                   isLoading={currentActionSource === "check-in"}
                                                   children={i18next.t("actions.check-in")}/>}

        {!hasCurrentMeetingStarted && <LoaderButton primary
                                                    onClick={() => startMeetingEarly("start-early")}
                                                    isLoading={currentActionSource === "start-early"}
                                                    children={i18next.t("actions.start-early")}/>}

        <Button white onClick={() => this.setState({ idOfMeetingToCancel: currentMeetingId })}>
          {i18next.t("actions.cancel-meeting")}
        </Button>
      </React.Fragment>
    );
  }

  renderCancelMeetingConfirmationBar() {
    const { currentActionSource, cancelMeeting } = this.props;

    return <ConfirmBar
      inProgress={currentActionSource === "cancel-meeting"}
      onSubmit={() => cancelMeeting("cancel-meeting")}
      onCancel={() => this.setState({ idOfMeetingToCancel: null })}
    />;
  }
}

const mapStateToProps = state => ({
  currentMeetingId: currentMeetingSelector(state).id,
  currentActionSource: currentActionSourceSelector(state),
  hasCurrentMeetingStarted: hasCurrentMeetingStartedSelector(state)
});

const mapDispatchToProps = dispatch => ({
  cancelMeeting: (source) => {
    dispatch(meetingActions.cancelMeeting());
    dispatch(meetingActions.$setActionSource(source));
  },
  checkInToMeeting: (source) => {
    dispatch(meetingActions.checkInToMeeting());
    dispatch(meetingActions.$setActionSource(source));
  },
  startMeetingEarly: (source) => {
    dispatch(meetingActions.startMeetingEarly());
    dispatch(meetingActions.$setActionSource(source));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MeetingNeedsCheckIn);