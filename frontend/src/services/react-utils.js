import React from "react";

export const ensureElement = Component => {
  if (Component instanceof React.Component || typeof Component === "function") {
    return <Component/>;
  }

  return Component;
};