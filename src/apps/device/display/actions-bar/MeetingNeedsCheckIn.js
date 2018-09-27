import React from "react";
import { LoaderButton, Button, I18n } from "../../../../theme";

export default props => (
  <I18n>{t =>
    <React.Fragment>
      <LoaderButton onClick={props.checkInToMeeting} primary isLoading={props.inProgress}>
        {props.hasStarted ? t("actions.check-in") : t("actions.start-early")}
      </LoaderButton>
      <Button white onClick={props.cancelMeeting}>
        {t("actions.cancel-meeting")}
      </Button>
    </React.Fragment>
  }</I18n>
);
