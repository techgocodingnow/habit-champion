import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { syncStorage } from "../utils/storage";
import { createHabitSlice } from "./slices/habit";
import { createSettingsSlice } from "./slices/settings";
import { AppStoreSlice } from "./types";

export const useAppStore = create<AppStoreSlice>()(
  persist(
    (...a) => ({
      ...createHabitSlice(...a),
      ...createSettingsSlice(...a),
    }),
    {
      name: "habitchampion_store",
      storage: createJSONStorage(() => syncStorage),
    }
  )
);
