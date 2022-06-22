import { atom } from "recoil";

export const isAuthenticatedAtom = atom({
  key: "isAuthenticated",
  default: false,
});

export const userEmailAtom = atom({
  key: "userEmail",
  default: "",
});
