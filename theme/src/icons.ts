import wrench from "@iconify/icons-mdi/wrench";
import pauseCircle from "@iconify/icons-mdi/pause-circle";
import snowflake from "@iconify/icons-mdi/snowflake";
import skullOutline from "@iconify/icons-mdi/skull-outline";
import checkCircle from "@iconify/icons-mdi/check-circle";
import github from "@iconify/icons-fa-brands/github";

import { IconifyIconService } from "./components/util/iconify_icons/ic-icon-service";

export const icons = {
  "mdi:wrench": wrench,
  "mdi:pause-circle": pauseCircle,
  "mdi:snowflake": snowflake,
  "mdi:skull-outline": skullOutline,
  "mdi:check-circle": checkCircle,
  "fa-brands:github": github
};

IconifyIconService.addIcon("mdi:wrench", wrench);
IconifyIconService.addIcon("mdi:pause-circle", pauseCircle);
IconifyIconService.addIcon("mdi:snowflake", snowflake);
IconifyIconService.addIcon("mdi:skull-outline", skullOutline);
IconifyIconService.addIcon("mdi:check-circle",checkCircle);
IconifyIconService.addIcon("fa-brands:github",github);

export function statusToIcons(status: string): string {
  switch (status) {
    case "active": return 'mdi:wrench';
    case "on-hold": return 'mdi:pause-circle';
    case "deep-freezed": return 'mdi:snowflake';
    case "abandoned": return 'mdi:skull-outline';
    case "finished": return 'mdi:check-circle';
    default:
      break;
  }
}