import type { EvidenceState } from "./model-evidence";
import type { PhraseId } from "./protocol";

export type RecognitionHistoryEntry = { timestamp: string; classId: PhraseId; confidence?: number; accepted: boolean };
export type ModelStatus = { state: EvidenceState; message: string };
export type DatasetCounts = Record<Lowercase<string>, number>;
