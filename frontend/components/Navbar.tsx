"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Github, Terminal } from "lucide-react";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/products/ginger-os", label: "GingerOS" },
    { href: "/products/media-handler", label: "Media Handler" },
    { href: "/products/alarm", label: "Alarm" },
    { href: "/downloads", label: "Downloads" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                transition: "all 0.3s",
                background: scrolled
                    ? "rgba(6, 14, 16, 0.9)"
                    : "transparent",
                backdropFilter: scrolled ? "blur(20px)" : "none",
                borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
            }}
        >
            <nav
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "0 24px",
                    height: "64px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                {/* Logo */}
                <Link
                    href="/"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        textDecoration: "none",
                    }}
                >
                    <div
                        style={{
                            width: "32px",
                            height: "32px",
                            background: "var(--color-accent)",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Terminal size={16} color="#060e10" strokeWidth={2.5} />
                    </div>
                    <span
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontWeight: 600,
                            fontSize: "1rem",
                            color: "var(--color-text)",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        ginger<span style={{ color: "var(--color-accent)" }}>OS</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <ul
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                    }}
                    className="hidden md:flex"
                >
                    {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                style={{
                                    display: "block",
                                    padding: "6px 14px",
                                    borderRadius: "6px",
                                    fontSize: "0.875rem",
                                    fontWeight: 500,
                                    color: "var(--color-muted)",
                                    textDecoration: "none",
                                    transition: "color 0.2s, background 0.2s",
                                }}
                                className="hover:text-accent hover:bg-surface-2"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Right actions */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <a
                        href="https://github.com/codewithwest"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: "var(--color-muted)",
                            transition: "color 0.2s",
                            display: "flex",
                        }}
                        className="hover:text-accent"
                        aria-label="GitHub"
                    >
                        <Github size={20} />
                    </a>
                    <Link href="/downloads" className="btn-primary hidden md:inline-flex" style={{ padding: "7px 16px", fontSize: "0.8rem" }}>
                        Download
                    </Link>

                    {/* Mobile menu toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        style={{
                            display: "flex",
                            background: "none",
                            border: "none",
                            color: "var(--color-text)",
                            cursor: "pointer",
                            padding: "4px",
                        }}
                        className="md:hidden"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            {mobileOpen && (
                <div
                    style={{
                        background: "var(--color-surface)",
                        borderTop: "1px solid var(--color-border)",
                        padding: "16px 24px 24px",
                    }}
                    className="md:hidden"
                >
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            style={{
                                display: "block",
                                padding: "12px 0",
                                borderBottom: "1px solid var(--color-border)",
                                fontSize: "0.9rem",
                                color: "var(--color-muted)",
                                textDecoration: "none",
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link href="/downloads" className="btn-primary" style={{ marginTop: "16px", width: "100%", justifyContent: "center" }}>
                        Download Now
                    </Link>
                </div>
            )}
        </header>
    );
}
