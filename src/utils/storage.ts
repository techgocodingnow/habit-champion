import { createMMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware";

export const storage = createMMKV();
export const getMMKVObject = (key: string) => {
  try {
    const str = storage.getString(key);
    return str ? JSON.parse(str) : str;
  } catch {
    return null;
  }
};

export const encryptStorage = createMMKV({
  id: "encrypt-storage",
  encryptionKey: "truetarot",
  mode: "multi-process",
  readOnly: false,
});

export const asyncStorage = {
  setItem: (key: string, value: string): Promise<void> => {
    storage.set(key, value);
    return Promise.resolve();
  },
  getItem: (key: string): Promise<string | undefined | null> => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key: string): Promise<void> => {
    storage.remove(key);
    return Promise.resolve();
  },
};

export const syncStorage = {
  setItem: (key: string, value: string) => storage.set(key, value),
  getItem: (key: string): string | undefined | null => storage.getString(key),
  removeItem: (key: string) => storage.remove(key),
  clear: () => storage.clearAll(),
} as StateStorage<void>;
