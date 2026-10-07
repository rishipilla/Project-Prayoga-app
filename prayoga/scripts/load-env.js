/**
 * Custom environment loader that prioritizes system environment variables
 * over .env file values. This ensures that Manus platform-injected variables
 * are not overridden by placeholder values in .env
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envFiles = [
  path.resolve(process.cwd(), ".env"),
  path.resolve(process.cwd(), "web/.env"),
  path.resolve(process.cwd(), "web/.env.local"),
].filter((candidate) => fs.existsSync(candidate));

function applyEnvValue(key, value) {
  if (!key || value === undefined) return;

  const nextValue = String(value).replace(/\r$/, "").trim().replace(/^['"]|['"]$/g, "");
  if (!nextValue) return;

  if (!process.env[key]) {
    process.env[key] = nextValue;
  }

  if (key.startsWith("NEXT_PUBLIC_")) {
    const expoKey = key.replace(/^NEXT_PUBLIC_/, "EXPO_PUBLIC_");
    if (!process.env[expoKey]) {
      process.env[expoKey] = nextValue;
    }
  }

  if (key.startsWith("EXPO_PUBLIC_")) {
    const nextKey = key.replace(/^EXPO_PUBLIC_/, "NEXT_PUBLIC_");
    if (!process.env[nextKey]) {
      process.env[nextKey] = nextValue;
    }
  }
}

for (const envPath of envFiles) {
  const envContent = fs.readFileSync(envPath, "utf8");
  const lines = envContent.split("\n");

  lines.forEach((line) => {
    const normalizedLine = line.replace(/\r$/, "");
    if (!normalizedLine || normalizedLine.trim().startsWith("#")) return;

    const match = normalizedLine.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      applyEnvValue(key, match[2]);
    }
  });
}

// Map platform variables to Expo public variables. Canonical MANUS_* names win;
// legacy aliases remain as fallbacks for older published environments.
const mappings = [
  ["MANUS_PROJECT_ID", "EXPO_PUBLIC_APP_ID"],
  ["MANUS_OAUTH_PORTAL_URL", "EXPO_PUBLIC_OAUTH_PORTAL_URL"],
  ["MANUS_OAUTH_API_URL", "EXPO_PUBLIC_OAUTH_SERVER_URL"],
  ["VITE_APP_ID", "EXPO_PUBLIC_APP_ID"],
  ["VITE_OAUTH_PORTAL_URL", "EXPO_PUBLIC_OAUTH_PORTAL_URL"],
  ["OAUTH_SERVER_URL", "EXPO_PUBLIC_OAUTH_SERVER_URL"],
  ["OWNER_OPEN_ID", "EXPO_PUBLIC_OWNER_OPEN_ID"],
  ["OWNER_NAME", "EXPO_PUBLIC_OWNER_NAME"],
];

for (const [systemVar, expoVar] of mappings) {
  if (process.env[systemVar] && !process.env[expoVar]) {
    process.env[expoVar] = process.env[systemVar];
  }

  if (process.env[expoVar] && !process.env[systemVar]) {
    process.env[systemVar] = process.env[expoVar];
  }
}
