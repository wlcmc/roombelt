import { connect } from "react-redux";
import {
  timestampSelector,
  calendarNameSelector,
  currentMeetingSelector,
  nextMeetingSelector
} from "apps/device/store/selectors";

import DashboardRowView from "./DashboardRowView";

const mapStateToProps = (state, props) => ({
  timestamp: timestampSelector(state),
  calendarName: calendarNameSelector(state, props),
  currentMeeting: currentMeetingSelector(state, props),
  nextMeeting: nextMeetingSelector(state, props)
});

export default connect(mapStateToProps)(DashboardRowView);