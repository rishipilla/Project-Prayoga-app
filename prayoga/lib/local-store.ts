import AsyncStorage from "@react-native-async-storage/async-storage";

const keys = {
  headset: "prayoga.headset",
  settings: "prayoga.settings",
  dataset: "prayoga.dataset",
  history: "prayoga.history",
  evidence: "prayoga.modelEvidence",
} as const;

export async function readLocal<T>(key: keyof typeof keys, fallback: T): Promise<T> {
  const raw = await AsyncStorage.getItem(keys[key]);
  if (!raw) return fallback;
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

export async function writeLocal<T>(key: keyof typeof keys, value: T) {
  await AsyncStorage.setItem(keys[key], JSON.stringify(value));
}

export const LOCAL_STORAGE_KEYS = keys;
