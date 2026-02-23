"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Download, ArrowRight, Terminal } from "lucide-react";

const TYPEWRITER_PHRASES = [
    "Built from source.",
    "Zero compromises.",
    "Every layer. Your control.",
    "Open. Transparent. Fast.",
];

function Typewriter() {
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [displayed, setDisplayed] = useState("");
    const [deleting, setDeleting] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

    useEffect(() => {
        const phrase = TYPEWRITER_PHRASES[phraseIndex];

        if (!deleting && displayed.length < phrase.length) {
            timeoutRef.current = setTimeout(
                () => setDisplayed(phrase.slice(0, displayed.length + 1)),
                60
            );
        } else if (!deleting && displayed.length === phrase.length) {
            timeoutRef.current = setTimeout(() => setDeleting(true), 2400);
        } else if (deleting && displayed.length > 0) {
            timeoutRef.current = setTimeout(
                () => setDisplayed(displayed.slice(0, -1)),
                35
            );
        } else if (deleting && displayed.length === 0) {
            setDeleting(false);
            setPhraseIndex((i) => (i + 1) % TYPEWRITER_PHRASES.length);
        }

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [displayed, deleting, phraseIndex]);

    return (
        <span>
            {displayed}
            <span
                style={{
                    color: "var(--color-accent)",
                    animation: "blink 1s step-end infinite",
                }}
            >
                _
            </span>
            <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
        </span>
    );
}

function StatBadge({ value, label }: { value: string; label: string }) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
            }}
        >
            <span
                style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "var(--color-accent)",
                }}
            >
                {value}
            </span>
            <span style={{ fontSize: "0.75rem", color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {label}
            </span>
        </div>
    );
}

export default function Hero() {
    return (
        <section
            style={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                paddingTop: "64px",
            }}
        >
            {/* Background grid texture */}
            <div
                className="grid-texture"
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 0,
                }}
            />

            {/* Radial glow */}
            <div
                style={{
                    position: "absolute",
                    top: "30%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "800px",
                    height: "500px",
                    background:
                        "radial-gradient(ellipse at center, rgba(0, 232, 200, 0.08) 0%, transparent 70%)",
                    zIndex: 0,
                    pointerEvents: "none",
                }}
            />

            {/* Content */}
            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    maxWidth: "900px",
                    margin: "0 auto",
                    padding: "80px 24px",
                    textAlign: "center",
                }}
            >
                {/* Status pill */}
                <div
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "var(--color-accent-dim)",
                        border: "1px solid var(--color-border-accent)",
                        borderRadius: "100px",
                        padding: "6px 14px",
                        marginBottom: "32px",
                    }}
                >
                    <span
                        style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: "var(--color-accent)",
                            display: "inline-block",
                            animation: "pulse 2s ease-in-out infinite",
                        }}
                    />
                    <span
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.75rem",
                            color: "var(--color-accent)",
                            fontWeight: 500,
                        }}
                    >
                        open source · actively maintained
                    </span>
                    <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.5; transform: scale(0.85); }
            }
          `}</style>
                </div>

                {/* Heading */}
                <h1
                    style={{
                        fontSize: "clamp(2.5rem, 7vw, 5rem)",
                        fontWeight: 800,
                        lineHeight: 1.05,
                        letterSpacing: "-0.03em",
                        color: "var(--color-text)",
                        marginBottom: "24px",
                    }}
                >
                    <span className="glow-text" style={{ color: "var(--color-accent)" }}>
                        Ginger
                    </span>
                    <span>OS</span>
                    <br />
                    <span
                        style={{
                            fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
                            fontWeight: 400,
                            fontFamily: "var(--font-mono)",
                            color: "var(--color-muted)",
                            display: "block",
                            marginTop: "16px",
                            letterSpacing: "normal",
                        }}
                    >
                        <Typewriter />
                    </span>
                </h1>

                {/* Subheading */}
                <p
                    style={{
                        fontSize: "1.1rem",
                        color: "var(--color-muted)",
                        lineHeight: 1.7,
                        maxWidth: "580px",
                        margin: "0 auto 48px",
                    }}
                >
                    A custom Linux distribution and ecosystem of open source tools —
                    all built from scratch. Explore, download, and take full control
                    of your computing environment.
                </p>

                {/* CTAs */}
                <div
                    style={{
                        display: "flex",
                        gap: "16px",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        marginBottom: "72px",
                    }}
                >
                    <Link href="/downloads" className="btn-primary" style={{ padding: "13px 28px", fontSize: "0.95rem" }}>
                        <Download size={18} />
                        Download Now
                    </Link>
                    <Link href="/products/ginger-os" className="btn-ghost" style={{ padding: "13px 28px", fontSize: "0.95rem" }}>
                        Explore GingerOS
                        <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Stats */}
                <div
                    style={{
                        display: "flex",
                        gap: "48px",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        borderTop: "1px solid var(--color-border)",
                        paddingTop: "40px",
                    }}
                >
                    <StatBadge value="3" label="Products" />
                    <StatBadge value="MIT" label="License" />
                    <StatBadge value="LFS" label="Foundation" />
                    <StatBadge value="v1.x" label="Stable" />
                </div>

                {/* Terminal hint */}
                <div
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        marginTop: "40px",
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "8px",
                        padding: "10px 16px",
                    }}
                >
                    <Terminal size={14} style={{ color: "var(--color-accent)" }} />
                    <code
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.8rem",
                            color: "var(--color-muted)",
                        }}
                    >
                        <span style={{ color: "var(--color-accent)" }}>$</span>{" "}
                        git clone https://github.com/codewithwest/ginger_os
                    </code>
                </div>
            </div>

            {/* Bottom fade */}
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "200px",
                    background:
                        "linear-gradient(to bottom, transparent, var(--color-bg))",
                    zIndex: 1,
                    pointerEvents: "none",
                }}
            />
        </section>
    );
}
