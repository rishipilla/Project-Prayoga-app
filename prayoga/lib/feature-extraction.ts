import type { SensorSample } from "./packet-decoder";

export type FeatureMetadata = { featureCount: number; featureNames: string[]; featureOrder: string[] };
export type FeatureExtractor = { metadata: FeatureMetadata; extract(samples: readonly SensorSample[]): Float32Array };

export function assertFeatureContract(extractor: FeatureExtractor) {
  if (extractor.metadata.featureCount !== extractor.metadata.featureOrder.length) {
    throw new Error("Feature count and feature order do not match.");
  }
  return extractor;
}
