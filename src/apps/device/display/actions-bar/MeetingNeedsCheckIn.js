import React from "react";
import i18next from "i18next";
import { LoaderButton, Button } from "../../../../theme";

export default props => (
  <React.Fragment>
    <LoaderButton onClick={props.checkInToMeeting} primary isLoading={props.inProgress}>
      {props.hasStarted ? i18next.t("actions.check-in") : i18next.t("actions.start-early")}
    </LoaderButton>
    <Button white onClick={props.cancelMeeting}>
      {i18next.t("actions.cancel-meeting")}
    </Button>
  </React.Fragment>
);
