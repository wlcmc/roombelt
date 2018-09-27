import React from "react";

import { Button, LoaderButton, I18n } from "../../../../theme";

export default props => (
  <I18n>{t =>
    <React.Fragment>
      <Button disabled={props.inProgress} onClick={props.onCancel} white>
        {t("actions.back")}
      </Button>
      <LoaderButton isLoading={props.inProgress} onClick={props.onSubmit} danger>
        {t("actions.confirm")}
      </LoaderButton>
    </React.Fragment>
  }</I18n>
);
