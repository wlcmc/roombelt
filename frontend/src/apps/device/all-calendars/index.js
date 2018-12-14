import React from "react";
import { connect } from "react-redux";
import { deviceActions } from "apps/device/store/actions";

const AllCalendarsView = ({ closeAllCalendarsView }) => (
  <div>
    All calendars
    <button onClick={closeAllCalendarsView}>Back</button>
  </div>
);

const mapDispatchToProps = dispatch => ({
  closeAllCalendarsView: () => dispatch(deviceActions.closeAllCalendarsView()),

});

export default connect(null, mapDispatchToProps)(AllCalendarsView);