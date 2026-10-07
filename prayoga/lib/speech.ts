import type { Prediction } from "./model-evidence";

export type SpeechPolicy = { enabled: boolean; cooldownMs: number; stabilizationCount: number };

export interface SpeechAdapter {
  speak(text: string): Promise<void>;
  stop(): Promise<void>;
}

export function speechText(prediction: Prediction) {
  return prediction.label === "HELLO" ? "Hello." : prediction.label === "YES" ? "Yes." : prediction.label === "NO" ? "No." : prediction.label === "I NEED WATER" ? "I need water." : "I need help.";
}
