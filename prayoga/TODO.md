# Project Prayoga delivery outcomes

- Build the mobile-first Project Prayoga product surface in the fixed Expo/React Native/TypeScript starter without replacing the starter or mixing in SilentWear research.
- Use exactly five classes: HELLO, YES, NO, I NEED WATER, and I NEED HELP; do not present unrestricted silent speech.
- Keep recognition visibly UNVERIFIED/LOCKED until a real five-class physical model, benchmark evidence, and Python↔Android parity evidence are present; never invent model metadata, predictions, confidence, or performance.
- Keep BLE constants in one shared protocol configuration and implement the exact v1 GATT UUIDs and 19-byte packet decoder with length, magic, version, checksum, malformed packet, dropped packet, and sequence-gap handling.
- Provide product flow surfaces for welcome, QR/device identity, connection, dashboard, live recognition, calibration, local dataset, history, diagnostics, settings, model evidence, and about.
- Keep calibration recordings local and do not automatically retrain or upload them; keep recognition local and do not add remote inference.
- Make the product/research boundary explicit: the 14-channel SilentWear EMG research track is not used in the MPU6050 + piezo physical pipeline.
- Preserve native identifiers and starter infrastructure, add required branding assets and a quoted durable logoUrl, run TypeScript diagnostics, and validate the app in portrait preview.
