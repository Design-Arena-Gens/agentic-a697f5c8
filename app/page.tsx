import dynamic from "next/dynamic";
import styles from "./page.module.css";

const AirbudsCanvas = dynamic(() => import("../components/AirbudsCanvas"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        background: "linear-gradient(180deg, rgba(241,245,249,0.9), rgba(226,232,240,0.9))"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          alignItems: "center",
          color: "#1f2937"
        }}
      >
        <span style={{ fontWeight: 600 }}>Generating viewport…</span>
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "18px",
            border: "3px solid rgba(37,99,235,0.25)",
            borderTopColor: "#2563eb",
            animation: "spinner 1s linear infinite"
          }}
        />
      </div>
    </div>
  )
});

const layers = [
  { name: "AirBuds · Master", hue: "#1d4ed8" },
  { name: "Left Bud · Detail", hue: "#0ea5e9" },
  { name: "Right Bud · Detail", hue: "#22d3ee" },
  { name: "Charging Case", hue: "#f472b6" }
];

const designPresets = [
  { label: "Aurora Frost", accent: "#8b5cf6" },
  { label: "Nimbus Silver", accent: "#38bdf8" },
  { label: "Midnight Pulse", accent: "#1e40af" }
];

const colorSwatches = [
  "linear-gradient(135deg,#f9fafb,#e2e8f0)",
  "linear-gradient(135deg,#dbeafe,#2563eb)",
  "linear-gradient(135deg,#c7d2fe,#7c3aed)",
  "linear-gradient(135deg,#bae6fd,#0ea5e9)",
  "linear-gradient(135deg,#fef3c7,#f59e0b)",
  "linear-gradient(135deg,#fde68a,#f97316)",
  "linear-gradient(135deg,#fecdd3,#f43f5e)",
  "linear-gradient(135deg,#f0abfc,#c026d3)",
  "linear-gradient(135deg,#dcfce7,#22c55e)",
  "linear-gradient(135deg,#e9d5ff,#8b5cf6)",
  "linear-gradient(135deg,#e0f2fe,#0ea5e9)",
  "linear-gradient(135deg,#fce7f3,#ec4899)"
];

const tools = ["🖱", "⬚", "🖌", "🎨", "✨"];

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <div className={styles.logo}>
          <span className={styles.logoBadge}>AB</span>
          AirBuds Studio
        </div>
        <nav className={styles.navGroup}>
          <span className={`${styles.navItem} ${styles.navItemActive}`}>Project</span>
          <span className={styles.navItem}>Assets</span>
          <span className={styles.navItem}>Prototype</span>
          <span className={styles.navItem}>Handoff</span>
        </nav>
        <button className={styles.shareButton}>Share design</button>
      </header>

      <main className={styles.workspace}>
        <aside className={`${styles.panel}`}>
          <div className={styles.panelHeader}>
            <span>Layers</span>
            <span style={{ color: "#2563eb" }}>+</span>
          </div>
          <div className={styles.layerList}>
            {layers.map((layer, index) => (
              <div
                key={layer.name}
                className={`${styles.layerItem} ${index === 0 ? styles.layerItemActive : ""}`}
              >
                <span>{layer.name}</span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "999px",
                      background: layer.hue
                    }}
                  />
                  100%
                </span>
              </div>
            ))}
          </div>
          <div className={styles.panelHeader}>
            <span>Presets</span>
            <span style={{ color: "#94a3b8", fontSize: "12px" }}>Auto</span>
          </div>
          <div className={styles.presetList}>
            {designPresets.map((preset) => (
              <div key={preset.label} className={styles.layerItem} style={{ gap: "12px" }}>
                <span>{preset.label}</span>
                <span
                  style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "999px",
                    background: preset.accent
                  }}
                />
              </div>
            ))}
          </div>
        </aside>

        <section className={styles.canvasArea}>
          <div className={styles.canvasFrame}>
            <div className={styles.canvasToolbar}>
              {tools.map((tool, index) => (
                <span
                  key={tool}
                  className={`${styles.toolButton} ${index === 0 ? styles.toolButtonActive : ""}`}
                >
                  {tool}
                </span>
              ))}
            </div>
            <div className={styles.canvasWrapper}>
              <AirbudsCanvas />
            </div>
            <div className={styles.canvasMetadata}>
              <span>Viewport · 1440 × 900</span>
              <span>Render Quality · Ultra</span>
              <span>Scene Glow · +18%</span>
            </div>
          </div>
        </section>

        <aside className={`${styles.panel} ${styles.inspector}`}>
          <div className={styles.panelHeader}>
            <span>Inspector</span>
            <span style={{ color: "#94a3b8", fontSize: "12px" }}>AI Assist</span>
          </div>
          <div className={styles.inspectorSection}>
            <span className={styles.sectionTitle}>Material palette</span>
            <div className={styles.colorGrid}>
              {colorSwatches.map((swatch, index) => (
                <span
                  key={swatch}
                  className={`${styles.swatch} ${index === 1 ? styles.swatchActive : ""}`}
                  style={{ background: swatch }}
                />
              ))}
            </div>
          </div>
          <div className={styles.inspectorSection}>
            <span className={styles.sectionTitle}>Refinement</span>
            <div className={styles.layerList}>
              <div className={styles.layerItem}>
                <span>Light bloom</span>
                <span>18%</span>
              </div>
              <div className={styles.layerItem}>
                <span>Depth focus</span>
                <span>32%</span>
              </div>
              <div className={styles.layerItem}>
                <span>Specular tone</span>
                <span>Lift</span>
              </div>
            </div>
          </div>
          <button className={styles.ctaButton}>Export to production ↗</button>
        </aside>
      </main>
    </div>
  );
}
