"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { Download, ArrowRight, GitBranch, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import type { Product, GitHubRelease } from "@/lib/github";

type CardData = {
    product: Product;
    release: GitHubRelease | null;
};

type Props = {
    items: CardData[];
};

const PLATFORM_LABELS: Record<string, string> = {
    linux: "Linux",
    windows: "Windows",
    macos: "macOS",
};

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
function formatBytes(bytes: number): string {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function Card({ product, release, style, onClick, className, active }: CardData & {
    style: React.CSSProperties;
    onClick: () => void;
    className?: string;
    active: boolean;
}) {
    const primaryAsset = release?.assets?.[0];

    return (
        <div
            onClick={onClick}
            className={className}
            style={{
                position: "absolute",
                width: "min(360px, 85vw)",
                background: "var(--color-surface)",
                border: `1px solid ${active ? "var(--color-border-accent)" : "var(--color-border)"}`,
                borderRadius: "16px",
                padding: "32px",
                boxShadow: active
                    ? "0 0 40px var(--color-accent-glow), 0 0 80px rgba(0, 232, 200, 0.08), 0 20px 60px rgba(0,0,0,0.5)"
                    : "0 8px 40px rgba(0,0,0,0.4)",
                cursor: active ? "default" : "pointer",
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                transformOrigin: "center center",
                userSelect: "none",
                ...style,
            }}
        >
            {/* Corner glow */}
            <div style={{
                position: "absolute", top: 0, right: 0, width: "100px", height: "100px",
                background: "radial-gradient(ellipse at top right, rgba(0,232,200,0.1), transparent 70%)",
                borderRadius: "0 16px 0 0", pointerEvents: "none",
            }} />

            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{
                        fontSize: "1.8rem", width: "48px", height: "48px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: "var(--color-surface-2)", borderRadius: "12px",
                        border: "1px solid var(--color-border)",
                    }}>
                        {product.icon}
                    </div>
                    <div>
                        <h3 style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--color-text)", margin: 0, lineHeight: 1.2 }}>
                            {product.name}
                        </h3>
                        {release && (
                            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-accent)", marginTop: "4px" }}>
                                <GitBranch size={10} /> {release.tag_name}
                            </span>
                        )}
                    </div>
                </div>
                <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", justifyContent: "flex-end" }}>
                    {product.platforms.map((p) => (
                        <span key={p} className="pill pill-muted" style={{ fontSize: "0.62rem" }}>
                            {PLATFORM_LABELS[p] ?? p}
                        </span>
                    ))}
                </div>
            </div>

            {/* Tagline */}
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-accent)", margin: 0 }}>
        // {product.tagline}
            </p>

            {/* Description */}
            <p style={{ fontSize: "0.85rem", color: "var(--color-muted)", lineHeight: 1.7, margin: 0 }}>
                {product.description}
            </p>

            {/* Features */}
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "5px" }}>
                {product.features.slice(0, 4).map((feat) => (
                    <li key={feat} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.78rem", color: "var(--color-muted)" }}>
                        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--color-accent)", flexShrink: 0, opacity: 0.8 }} />
                        {feat}
                    </li>
                ))}
            </ul>

            {/* Release meta */}
            {release && (
                <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingTop: "8px", borderTop: "1px solid var(--color-border)" }}>
                    <Calendar size={11} style={{ color: "var(--color-muted)" }} />
                    <span style={{ fontSize: "0.7rem", color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}>
                        {formatDate(release.published_at)}
                    </span>
                    {primaryAsset && (
                        <>
                            <span style={{ color: "var(--color-border)", fontSize: "0.7rem" }}>·</span>
                            <span style={{ fontSize: "0.7rem", color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}>
                                {formatBytes(primaryAsset.size)}
                            </span>
                        </>
                    )}
                </div>
            )}

            {/* Actions — only on active card */}
            {active && (
                <div style={{ display: "flex", gap: "10px", paddingTop: "4px" }}>
                    {primaryAsset ? (
                        <a href={primaryAsset.browser_download_url} className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                            <Download size={14} /> Download
                        </a>
                    ) : (
                        <span className="btn-primary" style={{ flex: 1, justifyContent: "center", opacity: 0.4, cursor: "default", pointerEvents: "none" }}>
                            No release yet
                        </span>
                    )}
                    <Link href={`/products/${product.slug}`} className="btn-ghost" style={{ padding: "10px 14px" }} aria-label="Learn more">
                        <ArrowRight size={15} />
                    </Link>
                </div>
            )}
        </div>
    );
}

export default function ProductCarousel3D({ items }: Props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const total = items.length;
    const containerRef = useRef<HTMLDivElement>(null);

    const prev = useCallback(() => setActiveIndex((i) => (i - 1 + total) % total), [total]);
    const next = useCallback(() => setActiveIndex((i) => (i + 1) % total), [total]);

    // 3D positions for each card relative to active
    function getCardStyle(index: number): React.CSSProperties {
        const diff = ((index - activeIndex) % total + total) % total;
        const normalised = diff > total / 2 ? diff - total : diff; // -1, 0, 1, 2 ...

        const absOff = Math.abs(normalised);
        const sign = normalised < 0 ? -1 : 1;

        if (normalised === 0) {
            // Front card
            return {
                transform: "translateX(-50%) translateY(0px) translateZ(0px) rotateY(0deg) scale(1)",
                opacity: 1,
                zIndex: 10,
                filter: "none",
                left: "50%",
                top: "50%",
                marginTop: "-210px",
            };
        }
        if (absOff === 1) {
            // Side cards
            return {
                transform: `translateX(-50%) translateY(30px) translateZ(-120px) rotateY(${sign * -28}deg) scale(0.88)`,
                opacity: 0.55,
                zIndex: 5,
                filter: "brightness(0.7)",
                left: `calc(50% + ${sign * 140}px)`,
                top: "50%",
                marginTop: "-190px",
            };
        }
        // Hidden cards
        return {
            transform: `translateX(-50%) translateY(60px) translateZ(-240px) scale(0.7)`,
            opacity: 0,
            zIndex: 1,
            left: "50%",
            top: "50%",
            marginTop: "-200px",
            pointerEvents: "none",
        };
    }

    return (
        <div style={{ width: "100%", padding: "0 24px", maxWidth: "1200px", margin: "0 auto" }}>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600 }}>
          // ecosystem
                </span>
                <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--color-text)", marginTop: "8px", letterSpacing: "-0.03em" }}>
                    Everything in the Ginger Stack
                </h2>
                <p style={{ color: "var(--color-muted)", marginTop: "12px", fontSize: "1rem" }}>
                    Three products. One vision. Spin the carousel to explore.
                </p>
            </div>

            {/* 3D Carousel stage */}
            <div
                ref={containerRef}
                className="carousel-stage"
                style={{
                    position: "relative",
                    height: "520px",
                    perspective: "1200px",
                    perspectiveOrigin: "50% 40%",
                }}
            >
                {/* Ground reflection */}
                <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: "10%",
                    right: "10%",
                    height: "80px",
                    background: "linear-gradient(to bottom, rgba(0,232,200,0.04), transparent)",
                    borderTop: "1px solid rgba(0,232,200,0.08)",
                    pointerEvents: "none",
                    zIndex: 0,
                }} />

                {/* Dot indicator glow ring */}
                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%) translateY(-10px)",
                    width: "440px",
                    height: "440px",
                    borderRadius: "50%",
                    border: "1px solid rgba(0,232,200,0.06)",
                    pointerEvents: "none",
                    zIndex: 0,
                }} />

                {/* Cards */}
                <div style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d" }}>
                    {items.map((item, i) => (
                        <Card
                            key={item.product.id}
                            {...item}
                            active={i === activeIndex}
                            style={getCardStyle(i)}
                            onClick={() => setActiveIndex(i)}
                            className={`carousel-card${i === activeIndex ? " active" : ""}`}
                        />
                    ))}
                </div>

                {/* Arrow controls */}
                <button
                    onClick={prev}
                    aria-label="Previous product"
                    className="carousel-arrow hover:border-glow"
                    style={{
                        position: "absolute",
                        left: "0",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                        color: "var(--color-text)",
                        borderRadius: "50%",
                        width: "44px",
                        height: "44px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        zIndex: 20,
                        transition: "border-color 0.2s, color 0.2s, box-shadow 0.2s",
                    }}
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={next}
                    aria-label="Next product"
                    className="carousel-arrow hover:border-glow"
                    style={{
                        position: "absolute",
                        right: "0",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                        color: "var(--color-text)",
                        borderRadius: "50%",
                        width: "44px",
                        height: "44px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        zIndex: 20,
                        transition: "border-color 0.2s, color 0.2s, box-shadow 0.2s",
                    }}
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Dot nav */}
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "32px" }}>
                {items.map((item, i) => (
                    <button
                        key={item.product.id}
                        onClick={() => setActiveIndex(i)}
                        aria-label={`Go to ${item.product.name}`}
                        style={{
                            width: i === activeIndex ? "28px" : "8px",
                            height: "8px",
                            borderRadius: "4px",
                            background: i === activeIndex ? "var(--color-accent)" : "var(--color-border)",
                            border: "none",
                            cursor: "pointer",
                            transition: "all 0.3s",
                            padding: 0,
                            boxShadow: i === activeIndex ? "0 0 8px var(--color-accent-glow)" : "none",
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
