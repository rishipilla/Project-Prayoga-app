export type GateResult = "accepted" | "rejected";

export type ConfidencePolicy = {
  threshold: number;
  source: "validation" | "production";
};

export function applyConfidenceGate(confidence: number, policy: ConfidencePolicy): GateResult {
  if (!Number.isFinite(confidence) || confidence < 0 || confidence > 1) return "rejected";
  return confidence >= policy.threshold ? "accepted" : "rejected";
}
