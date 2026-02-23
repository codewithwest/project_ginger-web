import Link from "next/link";
import { Download, ArrowRight, GitBranch, Calendar } from "lucide-react";
import type { Product, GitHubRelease } from "@/lib/github";

type Props = {
    product: Product;
    release: GitHubRelease | null;
};

const PLATFORM_LABELS: Record<string, string> = {
    linux: "Linux",
    windows: "Windows",
    macos: "macOS",
};

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function formatBytes(bytes: number): string {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ProductCard({ product, release }: Props) {
    const primaryAsset = release?.assets?.[0];

    return (
        <div
            className="card"
            style={{
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Accent corner glow */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "120px",
                    height: "120px",
                    background:
                        "radial-gradient(ellipse at top right, rgba(0, 232, 200, 0.07), transparent 70%)",
                    pointerEvents: "none",
                }}
            />

            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                        style={{
                            fontSize: "1.8rem",
                            width: "48px",
                            height: "48px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "var(--color-surface-2)",
                            borderRadius: "12px",
                            border: "1px solid var(--color-border)",
                        }}
                    >
                        {product.icon}
                    </div>
                    <div>
                        <h3
                            style={{
                                fontWeight: 700,
                                fontSize: "1.1rem",
                                color: "var(--color-text)",
                                margin: 0,
                                lineHeight: 1.2,
                            }}
                        >
                            {product.name}
                        </h3>
                        {release && (
                            <span
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.72rem",
                                    color: "var(--color-accent)",
                                    marginTop: "4px",
                                }}
                            >
                                <GitBranch size={11} />
                                {release.tag_name}
                            </span>
                        )}
                    </div>
                </div>

                {/* Platform pills */}
                <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", justifyContent: "flex-end" }}>
                    {product.platforms.map((p) => (
                        <span key={p} className="pill pill-muted">
                            {PLATFORM_LABELS[p] ?? p}
                        </span>
                    ))}
                </div>
            </div>

            {/* Tagline */}
            <p
                style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    color: "var(--color-accent)",
                    margin: 0,
                }}
            >
        // {product.tagline}
            </p>

            {/* Description */}
            <p
                style={{
                    fontSize: "0.875rem",
                    color: "var(--color-muted)",
                    lineHeight: 1.7,
                    margin: 0,
                }}
            >
                {product.description}
            </p>

            {/* Features */}
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                {product.features.map((feat) => (
                    <li
                        key={feat}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "0.8rem",
                            color: "var(--color-muted)",
                        }}
                    >
                        <span
                            style={{
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                background: "var(--color-accent)",
                                flexShrink: 0,
                                opacity: 0.8,
                            }}
                        />
                        {feat}
                    </li>
                ))}
            </ul>

            {/* Release info */}
            {release && (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        paddingTop: "12px",
                        borderTop: "1px solid var(--color-border)",
                    }}
                >
                    <Calendar size={12} style={{ color: "var(--color-muted)" }} />
                    <span style={{ fontSize: "0.75rem", color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}>
                        Released {formatDate(release.published_at)}
                    </span>
                    {primaryAsset && (
                        <>
                            <span style={{ color: "var(--color-border)", fontSize: "0.75rem" }}>·</span>
                            <span style={{ fontSize: "0.75rem", color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}>
                                {formatBytes(primaryAsset.size)}
                            </span>
                        </>
                    )}
                </div>
            )}

            {/* Actions */}
            <div style={{ display: "flex", gap: "10px", marginTop: "auto", paddingTop: "4px" }}>
                {release && primaryAsset ? (
                    <a
                        href={primaryAsset.browser_download_url}
                        className="btn-primary"
                        style={{ flex: 1, justifyContent: "center" }}
                    >
                        <Download size={15} />
                        Download
                    </a>
                ) : (
                    <span
                        className="btn-primary"
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            opacity: 0.5,
                            cursor: "default",
                            pointerEvents: "none",
                        }}
                    >
                        No release yet
                    </span>
                )}
                <Link
                    href={`/products/${product.slug}`}
                    className="btn-ghost"
                    style={{ padding: "10px 14px" }}
                    aria-label={`Learn more about ${product.name}`}
                >
                    <ArrowRight size={16} />
                </Link>
            </div>
        </div>
    );
}
