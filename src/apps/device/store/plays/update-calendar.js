import { getDeviceDetails } from "../../../../services/api";
import { isCalendarSelectedSelector } from "../selectors";
import { changeLanguage } from "../../../../i18n";

export default async function(action, store) {
  if (action.type !== ":device--initialize-after-authentication") {
    return;
  }

  while (true) {
    try {
      const device = await getDeviceDetails(action.accessToken);
      changeLanguage(device.language);
      store.dispatch({ type: ":device--set-data", device });
    } catch (e) {
      console.error(e);
    }

    const timeout = isCalendarSelectedSelector(store.getState()) ? 30 : 5;
    await new Promise(res => setTimeout(res, timeout * 1000));
  }
}
