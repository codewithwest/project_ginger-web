import { notFound } from "next/navigation";
import { PRODUCTS, getRelease, getPlatformAssets } from "@/lib/github";
import type { ProductId } from "@/lib/github";
import Link from "next/link";
import { Download, ArrowLeft, Github, Terminal, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const product = PRODUCTS.find((p) => p.slug === slug);
    if (!product) return {};
    return {
        title: `${product.name} — GingerOS`,
        description: product.description,
    };
}

const PLATFORM_ICONS: Record<string, string> = {
    linux: "🐧",
    windows: "🪟",
    macos: "🍎",
    archive: "📦",
    other: "📄",
};

function formatBytes(bytes: number): string {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

export default async function ProductPage({ params }: Props) {
    const { slug } = await params;
    const product = PRODUCTS.find((p) => p.slug === slug);
    if (!product) notFound();

    const { release } = await getRelease(product.id as ProductId);
    const assets = release ? getPlatformAssets(release.assets) : [];

    return (
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "120px 24px 80px" }}>
            {/* Back */}
            <Link
                href="/"
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "var(--color-muted)",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    marginBottom: "40px",
                    transition: "color 0.2s",
                }}
                className="hover:text-accent"
            >
                <ArrowLeft size={16} /> Back
            </Link>

            {/* Product header */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "24px",
                    alignItems: "flex-start",
                    marginBottom: "64px",
                }}
                className="flex flex-col md:grid"
            >
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                        <div
                            style={{
                                fontSize: "2.5rem",
                                width: "60px",
                                height: "60px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "var(--color-surface)",
                                borderRadius: "14px",
                                border: "1px solid var(--color-border)",
                            }}
                        >
                            {product.icon}
                        </div>
                        <div>
                            <h1
                                style={{
                                    fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                                    fontWeight: 800,
                                    letterSpacing: "-0.03em",
                                    color: "var(--color-text)",
                                    margin: 0,
                                }}
                            >
                                {product.name}
                            </h1>
                            {release && (
                                <span
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "0.8rem",
                                        color: "var(--color-accent)",
                                        display: "block",
                                        marginTop: "4px",
                                    }}
                                >
                                    {release.tag_name} · {formatDate(release.published_at)}
                                </span>
                            )}
                        </div>
                    </div>

                    <p
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.85rem",
                            color: "var(--color-accent)",
                            marginBottom: "16px",
                        }}
                    >
            // {product.tagline}
                    </p>
                    <p style={{ color: "var(--color-muted)", fontSize: "1rem", lineHeight: 1.75, maxWidth: "600px" }}>
                        {product.description}
                    </p>
                </div>

                {/* Quick actions */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", minWidth: "200px" }}>
                    {assets[0] && (
                        <a href={assets[0].browser_download_url} className="btn-primary" style={{ justifyContent: "center" }}>
                            <Download size={16} /> Download Latest
                        </a>
                    )}
                    <a
                        href={`https://github.com/${product.repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost"
                        style={{ justifyContent: "center" }}
                    >
                        <Github size={16} /> View on GitHub
                    </a>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "48px", alignItems: "flex-start" }} className="flex flex-col md:grid">
                {/* Main content */}
                <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
                    {/* Features */}
                    <section>
                        <h2
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.8rem",
                                color: "var(--color-accent)",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                marginBottom: "20px",
                            }}
                        >
              // features
                        </h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {product.features.map((feat) => (
                                <div
                                    key={feat}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "12px",
                                        padding: "14px 16px",
                                        background: "var(--color-surface)",
                                        border: "1px solid var(--color-border)",
                                        borderRadius: "8px",
                                    }}
                                >
                                    <CheckCircle2 size={16} style={{ color: "var(--color-accent)", flexShrink: 0 }} />
                                    <span style={{ fontSize: "0.9rem", color: "var(--color-text)" }}>{feat}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CLI example */}
                    {product.cliExample && (
                        <section>
                            <h2
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.8rem",
                                    color: "var(--color-accent)",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em",
                                    marginBottom: "20px",
                                }}
                            >
                // usage
                            </h2>
                            <div
                                style={{
                                    background: "var(--color-surface)",
                                    border: "1px solid var(--color-border)",
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                }}
                            >
                                {/* Terminal bar */}
                                <div
                                    style={{
                                        padding: "10px 16px",
                                        background: "var(--color-surface-2)",
                                        borderBottom: "1px solid var(--color-border)",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                    }}
                                >
                                    <div style={{ display: "flex", gap: "6px" }}>
                                        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                                            <div
                                                key={c}
                                                style={{ width: "10px", height: "10px", borderRadius: "50%", background: c, opacity: 0.7 }}
                                            />
                                        ))}
                                    </div>
                                    <Terminal size={13} style={{ color: "var(--color-muted)", marginLeft: "8px" }} />
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--color-muted)" }}>
                                        bash
                                    </span>
                                </div>
                                <pre
                                    style={{
                                        margin: 0,
                                        padding: "24px",
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "0.85rem",
                                        color: "var(--color-text)",
                                        lineHeight: 1.7,
                                        overflowX: "auto",
                                    }}
                                >
                                    {product.cliExample}
                                </pre>
                            </div>
                        </section>
                    )}

                    {/* Release notes */}
                    {release?.body && (
                        <section>
                            <h2
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.8rem",
                                    color: "var(--color-accent)",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em",
                                    marginBottom: "20px",
                                }}
                            >
                // release_notes — {release.tag_name}
                            </h2>
                            <div
                                style={{
                                    background: "var(--color-surface)",
                                    border: "1px solid var(--color-border)",
                                    borderRadius: "12px",
                                    padding: "24px",
                                    color: "var(--color-muted)",
                                    fontSize: "0.875rem",
                                    lineHeight: 1.7,
                                    whiteSpace: "pre-wrap",
                                    fontFamily: "var(--font-mono)",
                                }}
                            >
                                {release.body}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar: downloads */}
                <div style={{ position: "sticky", top: "84px" }}>
                    <h2
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.8rem",
                            color: "var(--color-accent)",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            marginBottom: "16px",
                        }}
                    >
            // downloads
                    </h2>

                    {assets.length > 0 ? (
                        <div
                            style={{
                                background: "var(--color-surface)",
                                border: "1px solid var(--color-border)",
                                borderRadius: "12px",
                                overflow: "hidden",
                            }}
                        >
                            {assets.map((asset, i) => (
                                <a
                                    key={asset.id}
                                    href={asset.browser_download_url}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "12px",
                                        padding: "14px 16px",
                                        borderBottom: i < assets.length - 1 ? "1px solid var(--color-border)" : "none",
                                        textDecoration: "none",
                                        transition: "background 0.15s",
                                    }}
                                    className="hover:bg-surface-2"
                                >
                                    <span style={{ fontSize: "1.2rem" }}>{PLATFORM_ICONS[asset.platform] ?? "📄"}</span>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div
                                            style={{
                                                fontFamily: "var(--font-mono)",
                                                fontSize: "0.72rem",
                                                color: "var(--color-text)",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {asset.name}
                                        </div>
                                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--color-muted)", marginTop: "2px" }}>
                                            {formatBytes(asset.size)} · {asset.download_count.toLocaleString()} downloads
                                        </div>
                                    </div>
                                    <Download size={14} style={{ color: "var(--color-accent)", flexShrink: 0 }} />
                                </a>
                            ))}
                        </div>
                    ) : (
                        <div
                            style={{
                                background: "var(--color-surface)",
                                border: "1px dashed var(--color-border)",
                                borderRadius: "12px",
                                padding: "32px 20px",
                                textAlign: "center",
                                color: "var(--color-muted)",
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.8rem",
                            }}
                        >
                            No release assets yet.
                            <br />
                            <a
                                href={`https://github.com/${product.repo}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "var(--color-accent)", textDecoration: "none" }}
                            >
                                Watch on GitHub →
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
