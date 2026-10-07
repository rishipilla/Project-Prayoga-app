import { PRAYOGA_PROTOCOL } from "./protocol";
import type { SensorSample } from "./packet-decoder";

export class SensorRingBuffer {
  private readonly samples: SensorSample[] = [];
  push(sample: SensorSample) {
    this.samples.push(sample);
    if (this.samples.length > PRAYOGA_PROTOCOL.packet.windowSamples) this.samples.shift();
  }
  clear() { this.samples.length = 0; }
  get size() { return this.samples.length; }
  get window() { return [...this.samples]; }
}

export type ConfidenceDecision = "accepted" | "rejected";
export function confidenceGate(confidence: number, threshold: number): ConfidenceDecision {
  return confidence >= threshold ? "accepted" : "rejected";
}

export type RecognitionStage = "IDLE" | "STARTING" | "LISTENING" | "PROCESSING" | "ACCEPTED" | "REJECTED" | "ERROR";
