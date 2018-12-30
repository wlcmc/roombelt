import React from "react";
import i18next from "i18next";
import { connect } from "react-redux";

import { LoaderButton, Button } from "theme/index";
import { prettyFormatMinutes } from "services/formatting";
import {
  currentActionSourceSelector,
  currentMeetingSelector, isAfterCurrentMeetingStartTimeSelector,
  minutesAvailableTillNextMeetingSelector, requireCheckInSelector
} from "apps/device/store/selectors";

import ButtonSet from "../../../components/ButtonSet";
import { meetingActions } from "apps/device/store/actions";

class MeetingStarted extends React.PureComponent {
  state = { idOfMeetingToCancel: null };

  render() {
    const { currentMeeting, requireCheckIn, isAfterCurrentMeetingStartTime } = this.props;
    const { idOfMeetingToCancel } = this.state;

    if (idOfMeetingToCancel === currentMeeting.id) {
      return this.renderEndMeetingConfirmation();
    }

    if (currentMeeting.isCheckedIn) {
      return this.renderExtendMeeting();
    }

    if (!isAfterCurrentMeetingStartTime) {
      return this.renderStartMeetingEarly();
    }

    if (requireCheckIn && !currentMeeting.isCheckedIn) {
      return this.renderCheckInToMeeting();
    }

    return this.renderExtendMeeting();
  }

  renderStartMeetingEarly() {
    const { currentMeeting, currentActionSource, startMeetingEarly } = this.props;

    return (
      <>
        <LoaderButton primary
                      onClick={() => startMeetingEarly("start-early")}
                      isLoading={currentActionSource === "start-early"}
                      children={i18next.t("actions.start-early")}/>

        <Button white onClick={() => this.setState({ idOfMeetingToCancel: currentMeeting.id })}>
          {i18next.t("actions.cancel-meeting")}
        </Button>
      </>
    );
  }

  renderCheckInToMeeting() {
    const { currentMeeting, currentActionSource, checkInToMeeting } = this.props;

    return (
      <>
        <LoaderButton primary
                      onClick={() => checkInToMeeting("check-in")}
                      isLoading={currentActionSource === "check-in"}
                      children={i18next.t("actions.check-in")}/>

        <Button white onClick={() => this.setState({ idOfMeetingToCancel: currentMeeting.id })}>
          {i18next.t("actions.cancel-meeting")}
        </Button>
      </>
    );
  }

  renderExtendMeeting() {
    const { currentMeeting, minutesToNextMeeting, currentActionSource, extendMeeting } = this.props;

    const ExtendButton = ({ value, name }) => (
      <LoaderButton
        white
        disabled={currentActionSource !== null}
        isLoading={currentActionSource === name}
        onClick={() => extendMeeting(value, name)}
        children={"+" + prettyFormatMinutes(value)}
      />
    );

    const showCustomExtensionTime = minutesToNextMeeting > 0 && minutesToNextMeeting <= 70;

    return (
      <>
        <Button white
                disabled={currentActionSource !== null}
                onClick={() => this.setState({ idOfMeetingToCancel: currentMeeting.id })}
                style={{ marginRight: 20 }}>
          {i18next.t("actions.end-now")}
        </Button>

        {minutesToNextMeeting > 0 && (
          <ButtonSet>
            <Button success disabled>{i18next.t("actions.extend")}</Button>
            {minutesToNextMeeting > 20 && <ExtendButton value={15} name="extend-15"/>}
            {minutesToNextMeeting > 40 && <ExtendButton value={30} name="extend-30"/>}
            {minutesToNextMeeting > 70 && <ExtendButton value={60} name="extend-60"/>}
            {showCustomExtensionTime && <ExtendButton value={minutesToNextMeeting} name="extend-custom"/>}
          </ButtonSet>
        )}
      </>
    );
  }

  renderEndMeetingConfirmation() {
    const { currentActionSource, isAfterCurrentMeetingStartTime, cancelMeeting, endMeeting } = this.props;

    const isInProgress = currentActionSource === "end-meeting";
    const onConfirm = () => isAfterCurrentMeetingStartTime ? endMeeting("end-meeting") : cancelMeeting("end-meeting");

    return (
      <>
        <Button disabled={isInProgress} onClick={() => this.setState({ idOfMeetingToCancel: null })} white>
          {i18next.t("actions.back")}
        </Button>
        <LoaderButton isLoading={isInProgress} onClick={onConfirm} danger>
          {i18next.t("actions.confirm")}
        </LoaderButton>
      </>
    );
  }
}

const mapStateToProps = state => ({
  requireCheckIn: requireCheckInSelector(state),
  currentMeeting: currentMeetingSelector(state),
  currentActionSource: currentActionSourceSelector(state),
  minutesToNextMeeting: minutesAvailableTillNextMeetingSelector(state),
  isAfterCurrentMeetingStartTime: isAfterCurrentMeetingStartTimeSelector(state)
});

const mapDispatchToProps = dispatch => ({
  startMeetingEarly: (source) => {
    dispatch(meetingActions.startMeetingEarly());
    dispatch(meetingActions.$setActionSource(source));
  },
  cancelMeeting: (source) => {
    dispatch(meetingActions.cancelMeeting());
    dispatch(meetingActions.$setActionSource(source));
  },
  checkInToMeeting: (source) => {
    dispatch(meetingActions.checkInToMeeting());
    dispatch(meetingActions.$setActionSource(source));
  },
  extendMeeting: (minutes, source) => {
    dispatch(meetingActions.extendMeeting(minutes));
    dispatch(meetingActions.$setActionSource(source));
  },
  endMeeting: (source) => {
    dispatch(meetingActions.endMeeting());
    dispatch(meetingActions.$setActionSource(source));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MeetingStarted);