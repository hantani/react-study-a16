import { atom } from "recoil";

export const wantCountryState = atom<string[]>({
  key: "wantCountryState",
  default: [],
});

export const beenCountryState = atom<string[]>({
  key: "beenCountryState",
  default: [],
});

export const likeCountryState = atom<string[]>({
  key: "likeCountryState",
  default: [],
});
