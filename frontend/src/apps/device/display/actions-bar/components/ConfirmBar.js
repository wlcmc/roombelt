import React from "react";
import i18next from "i18next";

import { Button, LoaderButton } from "theme/index";

export default props => (
  <React.Fragment>
    <Button disabled={props.inProgress} onClick={props.onCancel} white>
      {i18next.t("actions.back")}
    </Button>
    <LoaderButton isLoading={props.inProgress} onClick={props.onSubmit} danger>
      {i18next.t("actions.confirm")}
    </LoaderButton>
  </React.Fragment>
);
