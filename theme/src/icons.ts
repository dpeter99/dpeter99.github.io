import wrench from "@iconify/icons-mdi/wrench";
import pauseCircle from "@iconify/icons-mdi/pause-circle";
import snowflake from "@iconify/icons-mdi/snowflake";
import skullOutline from "@iconify/icons-mdi/skull-outline";
import checkDecagram from "@iconify/icons-mdi/check-decagram";

import { IconifyIconService } from "./components/util/iconify_icons/ic-icon-service";

export const icons = {
  "mdi:wrench": wrench,
  "mdi:pause-circle": pauseCircle,
  "mdi:snowflake": snowflake,
  "mdi:skull-outline": skullOutline,
  "mdi:check-decagram": checkDecagram,
};

IconifyIconService.addIcon("mdi:wrench", wrench);
IconifyIconService.addIcon("mdi:pause-circle", pauseCircle);
IconifyIconService.addIcon("mdi:snowflake", snowflake);
IconifyIconService.addIcon("mdi:skull-outline", skullOutline);

export function statusToIcons(status: string): object {
  switch (status) {
    case "active": return icons['mdi:wrench'];
    case "on-hold": return icons['mdi:pause-circle'];
    case "deep-freezed": return icons['mdi:snowflake'];
    case "abandoned": return icons['mdi:skull-outline'];
    case "finished": return icons['mdi:check-decagram'];
    default:
      break;
  }
}