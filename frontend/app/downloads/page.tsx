import { getAllReleases, getPlatformAssets } from "@/lib/github";
import { Download, ExternalLink, RefreshCw } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Downloads — GingerOS",
    description: "Download the latest versions of GingerOS, Ginger Media Handler, Ginger Alarm, and Ginger Finance for Linux, Windows, and macOS.",
};

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

export default async function DownloadsPage() {
    const releases = await getAllReleases();

    return (
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "120px 24px 80px" }}>
            {/* Header */}
            <div style={{ marginBottom: "56px" }}>
                <span
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        color: "var(--color-accent)",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        fontWeight: 600,
                    }}
                >
          {/* downloads */}
                </span>
                <h1
                    style={{
                        fontSize: "clamp(2rem, 5vw, 3rem)",
                        fontWeight: 800,
                        color: "var(--color-text)",
                        marginTop: "8px",
                        letterSpacing: "-0.03em",
                    }}
                >
                    Download GingerOS & Apps
                </h1>
                {/* open source */}
                <p style={{ color: "var(--color-muted)", marginTop: "12px", fontSize: "1rem", maxWidth: "560px" }}>
                    All releases are pulled live from GitHub. Click a file to download directly from GitHub&apos;s CDN.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "12px" }}>
                    <RefreshCw size={12} style={{ color: "var(--color-accent)" }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--color-muted)" }}>
                        Auto-refreshes every hour via ISR
                    </span>
                </div>
            </div>

            {/* Product sections */}
            <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
                {releases.map(({ product, release }) => (
                    <div key={product.id}>
                        {/* Product header */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                marginBottom: "24px",
                                paddingBottom: "16px",
                                borderBottom: "1px solid var(--color-border)",
                            }}
                        >
                            <span style={{ fontSize: "1.5rem" }}>{product.icon}</span>
                            <div>
                                <h2 style={{ fontWeight: 700, fontSize: "1.2rem", color: "var(--color-text)", margin: 0 }}>
                                    {product.name}
                                </h2>
                                {release ? (
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-accent)" }}>
                                        {release.tag_name} · Released {formatDate(release.published_at)}
                                    </span>
                                ) : (
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-muted)" }}>
                                        No release published yet
                                    </span>
                                )}
                            </div>
                            {release && (
                                <a
                                    href={release.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        marginLeft: "auto",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        color: "var(--color-muted)",
                                        textDecoration: "none",
                                        fontSize: "0.8rem",
                                        transition: "color 0.2s",
                                    }}
                                    className="hover:text-accent"
                                >
                                    <ExternalLink size={14} /> View on GitHub
                                </a>
                            )}
                        </div>

                        {/* Assets table */}
                        {release && release.assets.length > 0 ? (
                            <div
                                style={{
                                    background: "var(--color-surface)",
                                    border: "1px solid var(--color-border)",
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                }}
                            >
                                {/* Table header */}
                                <div
                                    className="downloads-table-header"
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "auto 1fr 100px 120px 140px",
                                        gap: "16px",
                                        padding: "12px 20px",
                                        background: "var(--color-surface-2)",
                                        borderBottom: "1px solid var(--color-border)",
                                    }}
                                >
                                    {["Platform", "File", "Size", "Downloads", ""].map((h) => (
                                        <span
                                            key={h}
                                            style={{
                                                fontFamily: "var(--font-mono)",
                                                fontSize: "0.7rem",
                                                color: "var(--color-muted)",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.08em",
                                                fontWeight: 600,
                                            }}
                                        >
                                            {h}
                                        </span>
                                    ))}
                                </div>

                                {/* Rows */}
                                {getPlatformAssets(release.assets).map((asset) => (
                                    <div
                                        key={asset.id}
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "auto 1fr 100px 120px 140px",
                                            gap: "16px",
                                            padding: "14px 20px",
                                            borderBottom: "1px solid var(--color-border)",
                                            alignItems: "center",
                                            transition: "background 0.15s",
                                        }}
                                        className="downloads-table-row hover:bg-surface-2"
                                    >
                                        {/* Platform */}
                                        <span style={{ fontSize: "1.1rem" }}>
                                            {PLATFORM_ICONS[asset.platform] ?? "📄"}
                                        </span>

                                        {/* Filename */}
                                        <span
                                            style={{
                                                fontFamily: "var(--font-mono)",
                                                fontSize: "0.78rem",
                                                color: "var(--color-text)",
                                                wordBreak: "break-all",
                                            }}
                                        >
                                            {asset.name}
                                        </span>

                                        {/* Size */}
                                        <span className="downloads-table-size" style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-muted)" }}>
                                            {formatBytes(asset.size)}
                                        </span>

                                        {/* Downloads */}
                                        <span className="downloads-table-count" style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-muted)" }}>
                                            {asset.download_count.toLocaleString()} ↓
                                        </span>

                                        {/* Action */}
                                        <a
                                            href={asset.browser_download_url}
                                            className="downloads-table-action btn-primary"
                                            style={{ justifyContent: "center", padding: "7px 14px", fontSize: "0.78rem" }}
                                        >
                                            <Download size={13} />
                                            Download
                                        </a>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div
                                style={{
                                    background: "var(--color-surface)",
                                    border: "1px dashed var(--color-border)",
                                    borderRadius: "12px",
                                    padding: "40px",
                                    textAlign: "center",
                                    color: "var(--color-muted)",
                                    fontSize: "0.875rem",
                                    fontFamily: "var(--font-mono)",
                                }}
                            >
                                No release assets published yet — check back soon.
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
