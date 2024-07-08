import { atom } from "recoil";

export interface ICountryState {
  countryName: string;
  status: string;
}

export const countryState = atom<ICountryState[]>({
  key: "countryState",
  default: [],
});
