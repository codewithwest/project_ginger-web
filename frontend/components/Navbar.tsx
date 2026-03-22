"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Github, Terminal } from "lucide-react";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/releases", label: "Releases" },
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
        <header style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, transition: "all 0.3s",
            background: scrolled ? "rgba(6, 14, 16, 0.92)" : "transparent",
            backdropFilter: scrolled ? "blur(20px)" : "none",
            borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
        }}>
            <nav style={{
                maxWidth: "1200px", margin: "0 auto", padding: "0 20px",
                height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
                {/* Logo */}
                <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", flexShrink: 0 }}>
                    <div style={{
                        width: "32px", height: "32px", background: "var(--color-accent)",
                        borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                        <Terminal size={16} color="#060e10" strokeWidth={2.5} />
                    </div>
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: "1rem", color: "var(--color-text)", letterSpacing: "-0.02em" }}>
                        ginger<span style={{ color: "var(--color-accent)" }}>OS</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <ul className="nav-desktop" style={{
                    display: "flex", alignItems: "center", gap: "4px",
                    listStyle: "none", margin: 0, padding: 0,
                }}>
                    {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                            <Link href={link.href} style={{
                                display: "block", padding: "6px 12px", borderRadius: "6px",
                                fontSize: "0.875rem", fontWeight: 500, color: "var(--color-muted)",
                                textDecoration: "none", transition: "color 0.2s, background 0.2s",
                            }}
                                onMouseEnter={e => { (e.target as HTMLElement).style.color = "var(--color-accent)"; (e.target as HTMLElement).style.background = "var(--color-surface-2)"; }}
                                onMouseLeave={e => { (e.target as HTMLElement).style.color = "var(--color-muted)"; (e.target as HTMLElement).style.background = "transparent"; }}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Right actions */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <a href="https://github.com/codewithwest" target="_blank" rel="noopener noreferrer"
                        style={{ color: "var(--color-muted)", transition: "color 0.2s", display: "flex", padding: "4px" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "var(--color-accent)")}
                        onMouseLeave={e => (e.currentTarget.style.color = "var(--color-muted)")}
                        aria-label="GitHub"
                    >
                        <Github size={20} />
                    </a>

                    {/* Desktop download button */}
                    <Link href="/downloads" className="nav-download-btn btn-primary" style={{ padding: "7px 14px", fontSize: "0.8rem" }}>
                        Download
                    </Link>

                    {/* Mobile menu toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="nav-mobile-btn"
                        style={{
                            display: "none", background: "none", border: "1px solid var(--color-border)",
                            color: "var(--color-text)", cursor: "pointer", padding: "6px 8px",
                            borderRadius: "6px", alignItems: "center", justifyContent: "center",
                        }}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            {mobileOpen && (
                <div style={{
                    background: "var(--color-surface)", borderTop: "1px solid var(--color-border)",
                    padding: "8px 20px 20px",
                }}>
                    {NAV_LINKS.map((link) => (
                        <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} style={{
                            display: "block", padding: "13px 0",
                            borderBottom: "1px solid var(--color-border)",
                            fontSize: "0.95rem", color: "var(--color-text)", textDecoration: "none", fontWeight: 500,
                        }}>
                            {link.label}
                        </Link>
                    ))}
                    <Link href="/downloads" className="btn-primary" onClick={() => setMobileOpen(false)}
                        style={{ marginTop: "16px", width: "100%", justifyContent: "center", display: "flex" }}>
                        Download Now
                    </Link>
                </div>
            )}
        </header>
    );
}
