import { PRAYOGA_PROTOCOL } from "./protocol";

export type SensorSample = {
  sequence: number;
  ax: number;
  ay: number;
  az: number;
  gx: number;
  gy: number;
  gz: number;
  piezo: number;
};

export type PacketDecodeResult =
  | { ok: true; sample: SensorSample; sequenceGap: number }
  | { ok: false; error: "length" | "magic" | "version" | "checksum" };

export function decodeSensorPacket(bytes: Uint8Array, previousSequence?: number): PacketDecodeResult {
  if (bytes.length !== PRAYOGA_PROTOCOL.packet.bytes) return { ok: false, error: "length" };
  if (bytes[0] !== 0xa5) return { ok: false, error: "magic" };
  if (bytes[1] !== PRAYOGA_PROTOCOL.version) return { ok: false, error: "version" };
  let checksum = 0;
  for (let i = 0; i < 18; i += 1) checksum ^= bytes[i];
  if (checksum !== bytes[18]) return { ok: false, error: "checksum" };
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const sequence = view.getUint16(2, true);
  const sample: SensorSample = {
    sequence,
    ax: view.getInt16(4, true),
    ay: view.getInt16(6, true),
    az: view.getInt16(8, true),
    gx: view.getInt16(10, true),
    gy: view.getInt16(12, true),
    gz: view.getInt16(14, true),
    piezo: view.getUint16(16, true),
  };
  const sequenceGap = previousSequence === undefined ? 0 : Math.max(0, (sequence - previousSequence - 1) & 0xffff);
  return { ok: true, sample, sequenceGap };
}
