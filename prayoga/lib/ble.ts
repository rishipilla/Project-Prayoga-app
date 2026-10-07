import { PRAYOGA_PROTOCOL } from "./protocol";

export type BleConnectionState = "DISCONNECTED" | "SCANNING" | "CONNECTING" | "CONNECTED";
export type BleDevice = { id: string; name: string; serviceUuid: string };

export interface BleClient {
  scanForService(serviceUuid: typeof PRAYOGA_PROTOCOL.serviceUuid): Promise<BleDevice[]>;
  connect(deviceId: string): Promise<void>;
  disconnect(): Promise<void>;
  startNotifications(onPacket: (packet: Uint8Array) => void): Promise<void>;
  writeCommand(command: number): Promise<void>;
}

export const EXPECTED_GATT = {
  service: PRAYOGA_PROTOCOL.serviceUuid,
  sensorData: PRAYOGA_PROTOCOL.characteristics.sensorData,
  command: PRAYOGA_PROTOCOL.characteristics.command,
  status: PRAYOGA_PROTOCOL.characteristics.status,
} as const;
