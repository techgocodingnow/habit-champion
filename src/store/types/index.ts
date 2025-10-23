import { HabitSlice } from "./habit";
import { SettingsSlice } from "./settings";

export * from "./habit";
export type AppStoreSlice = HabitSlice & SettingsSlice;
