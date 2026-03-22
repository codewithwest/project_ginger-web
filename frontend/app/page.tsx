import ProductCarousel3D from "@/components/ProductCarousel3D";
import { getAllReleases } from "@/lib/github";
import Link from "next/link";
import { ArrowRight, Cpu, Shield, Zap } from "lucide-react";
import Hero from "@/components/Hero";

const PILLARS = [
  { icon: <Cpu size={20} />, title: "Built from Source", body: "Every binary compiled from scratch. No black boxes. Full transparency from kernel to userland." },
  { icon: <Shield size={20} />, title: "Security First", body: "Sandboxed apps, context isolation, type-safe IPC, and zero-trust defaults across the ecosystem." },
  { icon: <Zap size={20} />, title: "Open Ecosystem", body: "GingerOS, Media Handler, Alarm, and Finance are all MIT licensed, actively maintained, and designed to work together." },
];

export default async function HomePage() {
  const releases = await getAllReleases();

  return (
    <>
      <Hero />

      {/* 3D Product Carousel */}
      <section id="products" style={{ padding: "80px 0 100px" }}>
        <ProductCarousel3D items={releases} />
        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <Link href="/downloads" className="btn-ghost">
            View all downloads &amp; versions <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Pillars */}
      <section style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto", padding: "80px 24px",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "40px",
        }}>
          {PILLARS.map((pillar) => (
            <div key={pillar.title} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{
                width: "44px", height: "44px", background: "var(--color-accent-dim)",
                border: "1px solid var(--color-border-accent)", borderRadius: "10px",
                display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-accent)",
              }}>
                {pillar.icon}
              </div>
              <h3 style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--color-text)", margin: 0 }}>{pillar.title}</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--color-muted)", lineHeight: 1.7, margin: 0 }}>{pillar.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ maxWidth: "1200px", margin: "80px auto", padding: "0 24px" }}>
        <div style={{
          background: "var(--color-surface)", border: "1px solid var(--color-border)",
          borderRadius: "16px", padding: "64px 48px", textAlign: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse at center, rgba(0, 232, 200, 0.06) 0%, transparent 70%)",
          }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
            open source
          </span>
          <h2 style={{
            fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 800, color: "var(--color-text)",
            marginTop: "12px", marginBottom: "16px", letterSpacing: "-0.03em",
          }}>
            Fork it. Hack it. Make it yours.
          </h2>
          <p style={{ color: "var(--color-muted)", marginBottom: "32px", fontSize: "1rem", maxWidth: "480px", margin: "0 auto 32px" }}>
            Every line of GingerOS is open source under the MIT license. Star the repo, open an issue, or submit a PR.
          </p>
          <a href="https://github.com/codewithwest" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: "0.95rem", padding: "13px 28px" }}>
            View on GitHub <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </>
  );
}
