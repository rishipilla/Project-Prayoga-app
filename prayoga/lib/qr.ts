import { PRAYOGA_PROTOCOL } from "./protocol";

export type HeadsetIdentity = {
  deviceId: string;
  deviceName: string;
  protocolVersion: number;
  bleServiceUuid: string;
};

export function parseHeadsetQr(raw: string): { ok: true; identity: HeadsetIdentity } | { ok: false; error: string } {
  const value = raw.trim();
  if (value === "PRAYOGA-001") {
    return {
      ok: true,
      identity: {
        deviceId: value,
        deviceName: value,
        protocolVersion: PRAYOGA_PROTOCOL.version,
        bleServiceUuid: PRAYOGA_PROTOCOL.serviceUuid,
      },
    };
  }
  try {
    const payload = JSON.parse(value) as Partial<HeadsetIdentity>;
    if (!payload.deviceId || !payload.deviceName || payload.protocolVersion !== PRAYOGA_PROTOCOL.version) {
      return { ok: false, error: "Unsupported headset identity or protocol version." };
    }
    if (payload.bleServiceUuid?.toLowerCase() !== PRAYOGA_PROTOCOL.serviceUuid) {
      return { ok: false, error: "The QR code does not match the Project Prayoga BLE service." };
    }
    return { ok: true, identity: payload as HeadsetIdentity };
  } catch {
    return { ok: false, error: "Scan a Project Prayoga QR payload or enter PRAYOGA-001." };
  }
}
