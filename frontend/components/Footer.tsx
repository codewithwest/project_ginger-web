import Link from "next/link";
import { Github, Terminal, ExternalLink } from "lucide-react";

const FOOTER_LINKS = [
    {
        title: "Products",
        links: [
            { label: "GingerOS", href: "/products/ginger-os" },
            { label: "Media Handler", href: "/products/media-handler" },
            { label: "Alarm", href: "/products/alarm" },
            { label: "Downloads", href: "/downloads" },
        ],
    },
    {
        title: "Source",
        links: [
            { label: "GingerOS", href: "https://github.com/codewithwest/ginger_os", external: true },
            { label: "Media Handler", href: "https://github.com/codewithwest/project_ginger-media-handler", external: true },
            { label: "Alarm", href: "https://github.com/codewithwest/project_ginger-alarm", external: true },
        ],
    },
    {
        title: "Community",
        links: [
            { label: "GitHub", href: "https://github.com/codewithwest", external: true },
        ],
    },
];

export default function Footer() {
    return (
        <footer
            style={{
                borderTop: "1px solid var(--color-border)",
                background: "var(--color-surface)",
                marginTop: "80px",
            }}
        >
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "64px 24px 32px",
                }}
            >
                {/* Top row */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr repeat(3, auto)",
                        gap: "48px",
                        marginBottom: "48px",
                    }}
                    className="flex flex-col md:grid"
                >
                    {/* Brand */}
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                            <div
                                style={{
                                    width: "28px",
                                    height: "28px",
                                    background: "var(--color-accent)",
                                    borderRadius: "6px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Terminal size={14} color="#060e10" strokeWidth={2.5} />
                            </div>
                            <span
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontWeight: 600,
                                    color: "var(--color-text)",
                                }}
                            >
                                ginger<span style={{ color: "var(--color-accent)" }}>OS</span>
                            </span>
                        </div>
                        <p style={{ color: "var(--color-muted)", fontSize: "0.875rem", lineHeight: 1.6, maxWidth: "280px" }}>
                            An open source Linux ecosystem built from scratch. Every layer, your control.
                        </p>
                        <a
                            href="https://github.com/codewithwest"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                marginTop: "16px",
                                color: "var(--color-muted)",
                                textDecoration: "none",
                                fontSize: "0.875rem",
                                transition: "color 0.2s",
                            }}
                            className="hover:text-accent"
                        >
                            <Github size={16} /> codewithwest
                        </a>
                    </div>

                    {/* Link groups */}
                    {FOOTER_LINKS.map((group) => (
                        <div key={group.title}>
                            <h4
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.75rem",
                                    fontWeight: 600,
                                    color: "var(--color-accent)",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em",
                                    marginBottom: "16px",
                                }}
                            >
                                {group.title}
                            </h4>
                            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                                {group.links.map((link) => (
                                    <li key={link.label}>
                                        {"external" in link && link.external ? (
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: "4px",
                                                    color: "var(--color-muted)",
                                                    textDecoration: "none",
                                                    fontSize: "0.875rem",
                                                    transition: "color 0.2s",
                                                }}
                                                className="hover:text-accent"
                                            >
                                                {link.label} <ExternalLink size={11} />
                                            </a>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                style={{
                                                    color: "var(--color-muted)",
                                                    textDecoration: "none",
                                                    fontSize: "0.875rem",
                                                    transition: "color 0.2s",
                                                }}
                                                className="hover:text-accent"
                                            >
                                                {link.label}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div
                    style={{
                        borderTop: "1px solid var(--color-border)",
                        paddingTop: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "12px",
                    }}
                >
                    <p style={{ color: "var(--color-muted)", fontSize: "0.8rem", margin: 0 }}>
                        © {new Date().getFullYear()} GingerOS. MIT License. Open source.
                    </p>
                    <span
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.75rem",
                            color: "var(--color-accent)",
                            opacity: 0.7,
                        }}
                    >
                        built_from_source=true
                    </span>
                </div>
            </div>
        </footer>
    );
}
