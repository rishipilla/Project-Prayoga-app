import type { SensorSample } from "./packet-decoder";

export type PreprocessingMetadata = {
  normalization: string;
  clipping: string;
  filtering: string;
  derivedMagnitudes: string[];
};

export type PreprocessingPipeline = {
  metadata: PreprocessingMetadata;
  apply(samples: readonly SensorSample[]): Float32Array;
};

export function requireVerifiedPreprocessing(pipeline: PreprocessingPipeline | undefined) {
  if (!pipeline) throw new Error("Physical preprocessing metadata is required before inference.");
  return pipeline;
}
