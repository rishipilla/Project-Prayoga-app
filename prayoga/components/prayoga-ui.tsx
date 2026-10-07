import { Pressable, StyleSheet, Text, View } from "react-native";

export const COLORS = {
  ink: "#0D1117",
  panel: "rgba(255,255,255,0.075)",
  panelRaised: "rgba(255,255,255,0.12)",
  glass: "rgba(255,255,255,0.09)",
  line: "rgba(255,255,255,0.16)",
  paper: "#F7FAFC",
  muted: "#A8B4C2",
  saffron: "#FFCA6B",
  teal: "#8CE4D2",
  amber: "#F4C77B",
  danger: "#FF9A91",
  blue: "#5F8CFF",
  violet: "#9B7BFF",
};

export function AmbientGlow() {
  return <View pointerEvents="none" style={StyleSheet.absoluteFill}>
    <View style={[styles.glow, styles.glowBlue]} />
    <View style={[styles.glow, styles.glowViolet]} />
    <View style={[styles.glow, styles.glowSaffron]} />
  </View>;
}

export function Mark({ compact = false }: { compact?: boolean }) {
  return <View style={styles.markRow}><View style={styles.mark}><View style={styles.markBarA} /><View style={styles.markBarB} /><View style={styles.markDot} /></View>{!compact && <Text style={styles.wordmark}>PRAYOGA</Text>}</View>;
}

export function Chip({ label, tone = "muted" }: { label: string; tone?: "muted" | "amber" | "teal" | "danger" }) {
  const color = tone === "amber" ? COLORS.amber : tone === "teal" ? COLORS.teal : tone === "danger" ? COLORS.danger : COLORS.muted;
  return <View style={[styles.chip, { borderColor: `${color}55`, backgroundColor: `${color}10` }]}><View style={[styles.chipDot, { backgroundColor: color }]} /><Text style={[styles.chipText, { color }]}>{label}</Text></View>;
}

export function SectionTitle({ eyebrow, title, detail }: { eyebrow: string; title: string; detail?: string }) {
  return <View style={styles.sectionHead}><Text style={styles.eyebrow}>{eyebrow}</Text><Text style={styles.sectionTitle}>{title}</Text>{detail && <Text style={styles.detail}>{detail}</Text>}</View>;
}

export function Metric({ label, value, accent = COLORS.paper }: { label: string; value: string; accent?: string }) {
  return <View style={styles.metric}><Text style={styles.metricLabel}>{label}</Text><Text style={[styles.metricValue, { color: accent }]}>{value}</Text></View>;
}

export function Button({ label, onPress, disabled = false, secondary = false }: { label: string; onPress: () => void; disabled?: boolean; secondary?: boolean }) {
  return <Pressable disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.button, secondary && styles.buttonSecondary, disabled && styles.buttonDisabled, pressed && !disabled && { opacity: 0.78 }]}><Text style={[styles.buttonText, secondary && { color: COLORS.paper }, disabled && { color: COLORS.muted }]}>{label}</Text></Pressable>;
}

const styles = StyleSheet.create({
  glow: { position: "absolute", width: 210, height: 210, borderRadius: 120, opacity: 0.16 },
  glowBlue: { backgroundColor: COLORS.blue, top: -70, right: -80 },
  glowViolet: { backgroundColor: COLORS.violet, top: 300, left: -140 },
  glowSaffron: { backgroundColor: COLORS.saffron, bottom: -90, right: -100, opacity: 0.08 },
  markRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  mark: { width: 28, height: 28, justifyContent: "center", position: "relative" },
  markBarA: { position: "absolute", width: 23, height: 6, borderRadius: 3, backgroundColor: COLORS.saffron, transform: [{ rotate: "-28deg" }], top: 7, left: 1 },
  markBarB: { position: "absolute", width: 18, height: 6, borderRadius: 3, backgroundColor: COLORS.teal, transform: [{ rotate: "28deg" }], bottom: 7, right: 0 },
  markDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: COLORS.paper, position: "absolute", alignSelf: "center" },
  wordmark: { color: COLORS.paper, fontSize: 14, fontWeight: "800", letterSpacing: 2.4 },
  chip: { alignSelf: "flex-start", borderWidth: 1, borderRadius: 999, paddingHorizontal: 9, paddingVertical: 6, flexDirection: "row", alignItems: "center", gap: 6 },
  chipDot: { width: 6, height: 6, borderRadius: 3 },
  chipText: { fontSize: 9, letterSpacing: 0.9, fontWeight: "800" },
  sectionHead: { gap: 5 },
  eyebrow: { color: COLORS.saffron, fontSize: 10, fontWeight: "800", letterSpacing: 1.8 },
  sectionTitle: { color: COLORS.paper, fontSize: 25, fontWeight: "700", letterSpacing: -0.4 },
  detail: { color: COLORS.muted, fontSize: 13, lineHeight: 19 },
  metric: { flex: 1, gap: 5 },
  metricLabel: { color: COLORS.muted, fontSize: 10, letterSpacing: 1.3, textTransform: "uppercase" },
  metricValue: { fontFamily: "monospace", fontSize: 15, fontWeight: "700" },
  button: { minHeight: 50, borderRadius: 15, backgroundColor: COLORS.saffron, alignItems: "center", justifyContent: "center", paddingHorizontal: 18 },
  buttonSecondary: { backgroundColor: COLORS.glass, borderWidth: 1, borderColor: COLORS.line },
  buttonDisabled: { backgroundColor: "rgba(255,255,255,0.05)", borderWidth: 1, borderColor: COLORS.line },
  buttonText: { color: COLORS.ink, fontWeight: "800", fontSize: 12, letterSpacing: 1 },
});
