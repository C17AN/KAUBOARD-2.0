import { atom } from "recoil";
import { MAX_WEEKLY_UPLOAD_QUOTA } from "../../utils/contants/application";

export const sidebarIndexAtom = atom({
  key: "sidebarIndexAtom",
  default: 0,
});

export const isDarkModeAtom = atom({
  key: "isDarkModeAtom",
  default: false,
});

export const userNameAtom = atom({
  key: "userName",
  default: "",
});

export const maxUploadQuotaAtom = atom({
  key: "uploadQuota",
  default: 0,
});
