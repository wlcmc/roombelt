import React from "react";
import { Text } from "theme";

export const PaidMarker = () => <span role="img" aria-label="Paid plan">💰</span>;
export const PaidDisclaimer = () => <Text block small muted style={{ width: 250 }}>
  Options marked with <PaidMarker/> will be part of a paid plan in the future.
</Text>;
