import { Habit } from "@/src/typing/app";

export type HabitSlice = {
  habits: Habit[];
  addHabit: () => void;
  removeHabit: (id: string) => void;
  updateHabit: (id: string, habit: Habit) => void;
  getHabit: (id: string) => Habit | undefined;
  getHabits: () => Habit[];
  getHabitById: (id: string) => Habit | undefined;
  getHabitByTitle: (title: string) => Habit | undefined;
  getHabitByDescription: (description: string) => Habit | undefined;
  getHabitByCategory: (category: string) => Habit | undefined;
};
