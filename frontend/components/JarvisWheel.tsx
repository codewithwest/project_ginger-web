"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Download, ArrowRight, GitBranch, Terminal, PlayCircle, Clock, Activity } from "lucide-react";
import type { Product, GitHubRelease } from "@/lib/github";

type CardData = {
    product: Product;
    release: GitHubRelease | null;
};

type Props = {
    items: CardData[];
};



export default function JarvisWheel({ items }: Props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [mounted, setMounted] = useState(false);
    
    const [radius, setRadius] = useState(280);
    const [hubSize, setHubSize] = useState(360);
    const [containerHeight, setContainerHeight] = useState(800);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 600) {
                setRadius(160); // Maximized for mobile width (320px orbit + 48px icons = 368px)
                setHubSize(280); // Circular hub
                setContainerHeight(540);
            } else if (width < 900) {
                setRadius(240);
                setHubSize(340);
                setContainerHeight(700);
            } else {
                setRadius(320); // Widened orbit
                setHubSize(400); // Larger circle for 'more info'
                setContainerHeight(850);
            }
        };
        handleResize(); // Initial call
        window.addEventListener("resize", handleResize);
        
        // Use timeout to avoid synchronous setState inside effect warning and let layout settle
        const timer = setTimeout(() => setMounted(true), 0);
        
        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(timer);
        };
    }, []);

    if (!mounted || items.length === 0) return null;

    const activeItem = items[activeIndex];
    const { product, release } = activeItem;
    const primaryAsset = release?.assets?.[0];

    return (
        <div style={{ width: "100%", padding: "40px 24px", maxWidth: "1200px", margin: "0 auto", overflow: "hidden" }}>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "60px", position: "relative", zIndex: 10 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 600 }}>
                    {/* J.A.R.V.I.S. INTERFACE _ */}
                </span>
                <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--color-text)", marginTop: "12px", letterSpacing: "-0.04em", textShadow: "0 0 40px rgba(0,232,200,0.3)" }}>
                    Ecosystem Array
                </h2>
            </div>

            {/* Jarvis Wheel Container */}
            <div style={{
                position: "relative",
                width: "100%",
                height: `${containerHeight}px`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                perspective: "1200px",
            }}>
                
                {/* Background Tech Rings (Animated) */}
                <div className="jarvis-ring outer-ring" style={{
                    position: "absolute",
                    width: "700px",
                    height: "700px",
                    borderRadius: "50%",
                    border: "1px dashed rgba(0,232,200,0.15)",
                    pointerEvents: "none",
                    animation: "spin-slow-reverse 40s linear infinite",
                }}></div>
                <div className="jarvis-ring middle-ring" style={{
                    position: "absolute",
                    width: "560px",
                    height: "560px",
                    borderRadius: "50%",
                    border: "2px solid rgba(0,232,200,0.08)",
                    pointerEvents: "none",
                    boxShadow: "0 0 60px rgba(0,232,200,0.05) inset",
                }}></div>
                <div className="jarvis-ring inner-ring" style={{
                    position: "absolute",
                    width: "420px",
                    height: "420px",
                    borderRadius: "50%",
                    border: "1px dotted rgba(0,232,200,0.3)",
                    pointerEvents: "none",
                    animation: "spin-slow 25s linear infinite",
                }}></div>

                {/* Central Data Hub (Active Item) */}
                <div style={{
                    position: "absolute",
                    width: `${hubSize}px`,
                    height: `${hubSize}px`,
                    borderRadius: "50%",
                    background: "radial-gradient(circle at 30% 30%, rgba(12,25,30,0.95) 0%, rgba(2,8,10,0.98) 60%, rgba(0,0,0,1) 100%)",
                    border: "1px solid rgba(0,232,200,0.4)",
                    boxShadow: "0 30px 60px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.1), inset 0 -20px 40px rgba(0,232,200,0.15), 0 0 40px rgba(0,232,200,0.3)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    // Calculate exact padding to fit content into inscribed square (14.65% of diameter)
                    padding: `${Math.round(hubSize * 0.15)}px`,
                    textAlign: "center",
                    zIndex: 40,
                    backdropFilter: "blur(16px)",
                    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}>
                    <div style={{
                        marginBottom: hubSize < 300 ? "6px" : "12px",
                        animation: "pulse-glow 3s infinite",
                        color: "var(--color-primary)",
                        filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.5))"
                    }}>
                        {product.id === "ginger-os" && <Terminal size={hubSize < 300 ? 28 : 44} strokeWidth={1.5} />}
                        {product.id === "media-handler" && <PlayCircle size={hubSize < 300 ? 28 : 44} strokeWidth={1.5} />}
                        {product.id === "alarm" && <Clock size={hubSize < 300 ? 28 : 44} strokeWidth={1.5} />}
                        {product.id === "finance" && <Activity size={hubSize < 300 ? 28 : 44} strokeWidth={1.5} />}
                    </div>
                    <h3 style={{ fontWeight: 800, fontSize: hubSize < 300 ? "1.1rem" : "1.6rem", color: "var(--color-text)", margin: "0 0 6px 0", letterSpacing: "-0.02em", textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
                        {product.name}
                    </h3>
                    {release && (
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-mono)", fontSize: hubSize < 300 ? "0.65rem" : "0.75rem", color: "var(--color-accent)", margin: "0 0 10px 0", padding: "2px 10px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(0,232,200,0.2)", borderRadius: "20px", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)" }}>
                            <GitBranch size={10} /> {release.tag_name}
                        </div>
                    )}
                    <p style={{ 
                        fontSize: hubSize < 300 ? "0.75rem" : "0.95rem", 
                        color: "rgba(255,255,255,0.7)", 
                        lineHeight: 1.5, 
                        margin: "0 0 16px 0", 
                        flexShrink: 1,
                        display: "-webkit-box", 
                        WebkitLineClamp: hubSize < 300 ? 3 : 6, 
                        WebkitBoxOrient: "vertical", 
                        overflow: "hidden", 
                        textShadow: "0 1px 2px rgba(0,0,0,0.8)" 
                    }}>
                        {product.description}
                    </p>
                    
                    <div style={{ display: "flex", gap: "8px", width: "100%", justifyContent: "center", marginTop: "auto" }}>
                        {primaryAsset ? (
                            <a href={primaryAsset.browser_download_url} className="btn-primary" style={{ flex: "none", minWidth: hubSize < 300 ? "0" : "120px", padding: hubSize < 300 ? "10px" : "12px 24px", justifyContent: "center", textShadow: "0 2px 4px rgba(0,0,0,0.4)", fontSize: hubSize < 300 ? "0.8rem" : "0.9rem", boxShadow: "0 4px 10px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.2)" }}>
                                <Download size={16} style={{ marginRight: hubSize < 300 ? "0" : "6px" }} /> {hubSize >= 300 && "Get"}
                            </a>
                        ) : (
                            <span className="btn-primary" style={{ flex: "none", minWidth: hubSize < 300 ? "0" : "120px", padding: hubSize < 300 ? "10px" : "12px 24px", justifyContent: "center", opacity: 0.4, cursor: "default", fontSize: hubSize < 300 ? "0.8rem" : "0.9rem" }}>
                                N/A
                            </span>
                        )}
                        <Link href={`/products/${product.slug}`} className="btn-ghost" style={{ flex: "none", padding: hubSize < 300 ? "10px 14px" : "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 4px 10px rgba(0,0,0,0.3)" }} aria-label="Learn more">
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>

                {/* Orbiting Icons */}
                {items.map((item, i) => {
                    const angle = (i * (360 / items.length)) - 90;
                    const radians = angle * (Math.PI / 180);
                    
                    const x = Math.cos(radians) * radius;
                    const y = Math.sin(radians) * radius;

                    const isActive = i === activeIndex;
                    const baseIconSize = radius < 200 ? 44 : 54;
                    const activeIconSize = radius < 200 ? 56 : 64;

                    return (
                        <button
                            key={item.product.id}
                            onClick={() => setActiveIndex(i)}
                            style={{
                                position: "absolute",
                                left: `calc(50% + ${x}px)`,
                                top: `calc(50% + ${y}px)`,
                                transform: "translate(-50%, -50%)",
                                width: isActive ? `${activeIconSize}px` : `${baseIconSize}px`,
                                height: isActive ? `${activeIconSize}px` : `${baseIconSize}px`,
                                borderRadius: "50%",
                                background: isActive ? "radial-gradient(circle at 30% 30%, var(--color-surface-2) 0%, rgba(0,0,0,0.9) 100%)" : "radial-gradient(circle at 30% 30%, var(--color-surface) 0%, rgba(0,0,0,0.9) 100%)",
                                border: `2px solid ${isActive ? "rgba(0,232,200,0.8)" : "rgba(255,255,255,0.15)"}`,
                                boxShadow: isActive ? "0 10px 20px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -5px 15px rgba(0,232,200,0.4), 0 0 20px rgba(0,232,200,0.5)" : "0 8px 15px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.1)",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                                zIndex: isActive ? 30 : 25,
                            }}
                            aria-label={`Select ${item.product.name}`}
                        >
                            <span style={{ color: isActive ? "var(--color-primary)" : "var(--color-muted)", transition: "all 0.4s", filter: isActive ? "drop-shadow(0 0 10px rgba(0,232,200,0.8))" : "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                {item.product.id === "ginger-os" && <Terminal size={isActive ? (radius < 200 ? 24 : 32) : (radius < 200 ? 20 : 24)} />}
                                {item.product.id === "media-handler" && <PlayCircle size={isActive ? (radius < 200 ? 24 : 32) : (radius < 200 ? 20 : 24)} />}
                                {item.product.id === "alarm" && <Clock size={isActive ? (radius < 200 ? 24 : 32) : (radius < 200 ? 20 : 24)} />}
                                {item.product.id === "finance" && <Activity size={isActive ? (radius < 200 ? 24 : 32) : (radius < 200 ? 20 : 24)} />}
                            </span>
                        </button>
                    );
                })}
                
                {/* SVG Connecting Lines for Active Item */}
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 10 }}>
                    <defs>
                        <linearGradient id="glowLine" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(0,232,200,0.8)" />
                            <stop offset="100%" stopColor="rgba(0,232,200,0)" />
                        </linearGradient>
                    </defs>
                    <g style={{ transform: "translate(50%, 50%)" }}>
                        {items.map((item, i) => {
                            if (i !== activeIndex) return null;
                            const angle = (i * (360 / items.length)) - 90;
                            const radians = angle * (Math.PI / 180);
                            const iconRadius = (radius < 200 ? 68 : 80) / 2;
                            const centerRadius = hubSize / 2;
                            
                            const startX = Math.cos(radians) * centerRadius;
                            const startY = Math.sin(radians) * centerRadius;
                            const endX = Math.cos(radians) * (radius - iconRadius);
                            const endY = Math.sin(radians) * (radius - iconRadius);

                            return (
                                <line 
                                    key={`line-${i}`}
                                    x1={startX} y1={startY} 
                                    x2={endX} y2={endY} 
                                    stroke="url(#glowLine)" 
                                    strokeWidth="2"
                                    strokeDasharray="4 4"
                                    style={{ animation: "dash-move 20s linear infinite" }}
                                />
                            );
                        })}
                    </g>
                </svg>

            </div>

            {/* Global styles for the animations specifically for Jarvis Wheel */}
            <style jsx global>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes spin-slow-reverse {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                @keyframes pulse-glow {
                    0% { filter: drop-shadow(0 0 10px rgba(0,232,200,0.4)); }
                    50% { filter: drop-shadow(0 0 25px rgba(0,232,200,0.8)); }
                    100% { filter: drop-shadow(0 0 10px rgba(0,232,200,0.4)); }
                }
                @keyframes dash-move {
                    to { stroke-dashoffset: -1000; }
                }

                /* Mobile overrides for Jarvis Wheel */
                @media (max-width: 768px) {
                    .outer-ring, .middle-ring, .inner-ring {
                        display: none !important; /* Too noisy on small screens */
                    }
                    /* On mobile, we might need a simpler vertical or compact wheel */
                    /* But since requested a wheel, we can just shrink the radius */
                }
            `}</style>
        </div>
    );
}
