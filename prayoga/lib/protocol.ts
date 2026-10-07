export const PRAYOGA_PROTOCOL = {
  version: 1,
  serviceUuid: "7a8e0001-8f3b-4cf8-9d31-9d77b3a10001",
  characteristics: {
    sensorData: "7a8e0002-8f3b-4cf8-9d31-9d77b3a10001",
    command: "7a8e0003-8f3b-4cf8-9d31-9d77b3a10001",
    status: "7a8e0004-8f3b-4cf8-9d31-9d77b3a10001",
  },
  commands: { startRecognition: 0x01, stopRecognition: 0x02 },
  packet: { bytes: 19, targetHz: 100, windowSeconds: 3, windowSamples: 300 },
} as const;

export const PHRASES = [
  { id: 0, label: "HELLO", spoken: "Hello." },
  { id: 1, label: "YES", spoken: "Yes." },
  { id: 2, label: "NO", spoken: "No." },
  { id: 3, label: "I NEED WATER", spoken: "I need water." },
  { id: 4, label: "I NEED HELP", spoken: "I need help." },
] as const;

export type PhraseId = (typeof PHRASES)[number]["id"];
export type Phrase = (typeof PHRASES)[number];

export const BLE_STATUS = {
  disconnected: "DISCONNECTED",
  scanning: "SCANNING",
  connecting: "CONNECTING",
  connected: "CONNECTED",
} as const;
