import { Habit } from "@/src/typing/app";
import type { StateCreator } from "zustand";
import { AppStoreSlice, HabitSlice } from "../types";

export const createHabitSlice: StateCreator<
  AppStoreSlice,
  [],
  [],
  HabitSlice
> = (set, get) => ({
  habits: [],
  addHabit: () => {},
  removeHabit: (id: string) => {},
  updateHabit: (id: string, habit: Habit) => {},
  getHabit: (id: string) => undefined,
  getHabits: () => [],
  getHabitById: (id: string) => undefined,
  getHabitByTitle: (title: string) => undefined,
  getHabitByDescription: (description: string) => undefined,
  getHabitByCategory: (category: string) => undefined,
});
