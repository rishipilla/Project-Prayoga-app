import { PHRASES, type PhraseId } from "./protocol";

export type EvidenceState = "UNVERIFIED" | "READY_FOR_VALIDATION" | "VERIFIED" | "BLOCKED";

export type ModelEvidence = {
  state: EvidenceState;
  modelVersion?: string;
  artifactSha256?: string;
  featureCount?: number;
  featureNames?: string[];
  featureOrder?: string[];
  normalization?: string;
  benchmark?: { accuracy?: number; balancedAccuracy?: number; macroF1?: number; worstClassRecall?: number; modelSizeBytes?: number; inferenceMs?: number };
  parity?: { passed: boolean; maxFeatureDiff?: number; classMatch?: boolean; confidenceMatch?: boolean };
  notes: string[];
};

export const EMPTY_MODEL_EVIDENCE: ModelEvidence = {
  state: "UNVERIFIED",
  notes: ["No accepted physical five-class model manifest has been supplied.", "Benchmark and Python↔Android parity evidence are pending."],
};

export type Prediction = { classId: PhraseId; label: (typeof PHRASES)[number]["label"]; confidence: number };

export interface PredictionEngine {
  predict(features: Float32Array): Promise<Prediction>;
}

export function canRecognize(evidence: ModelEvidence) {
  return evidence.state === "VERIFIED" && evidence.parity?.passed === true;
}

export function evidenceRows(evidence: ModelEvidence) {
  return [
    ["Model version", evidence.modelVersion ?? "Not provided"],
    ["Artifact checksum", evidence.artifactSha256 ?? "Not provided"],
    ["Feature contract", evidence.featureCount ? `${evidence.featureCount} features` : "Pending"],
    ["Benchmark evidence", evidence.benchmark ? "Measured results supplied" : "Pending"],
    ["Python ↔ Android parity", evidence.parity?.passed ? "Passed" : "Pending"],
  ] as const;
}
