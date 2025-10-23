import type { StateCreator } from "zustand";
import { AppStoreSlice, SettingsSlice } from "../types";

export const createSettingsSlice: StateCreator<
  AppStoreSlice,
  [],
  [],
  SettingsSlice
> = (set, get) => ({
  fontScale: 1,
  fontFamily: "primary",
  theme: "light",
  language: "en",
});
