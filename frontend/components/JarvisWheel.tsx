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
        <div className="w-full px-6 py-10 max-w-[1200px] mx-auto overflow-hidden">
            {/* Header */}
            <div className="text-center mb-16 relative z-10">
                <span className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-widest font-semibold">
                    {/* J.A.R.V.I.S. INTERFACE _ */}
                </span>
                <h2 className="text-[clamp(2rem,5vw,3rem)] font-extrabold text-[var(--color-text)] mt-3 tracking-tighter" style={{ textShadow: "0 0 40px rgba(0,232,200,0.3)" }}>
                    Available Ecosystem
                </h2>
            </div>

            {/* Jarvis Wheel Container */}
            <div className="relative w-full flex items-center justify-center transition-all duration-300" 
                 style={{ height: `${containerHeight}px`, perspective: "1200px" }}>
                
                {/* Background Tech Rings (Animated) */}
                <div className="jarvis-ring outer-ring absolute w-[700px] h-[700px] rounded-full border border-dashed border-[rgba(0,232,200,0.15)] pointer-events-none animate-[spin-slow-reverse_40s_linear_infinite]" />
                <div className="jarvis-ring middle-ring absolute w-[560px] h-[560px] rounded-full border-2 border-[rgba(0,232,200,0.08)] pointer-events-none" style={{ boxShadow: "0 0 60px rgba(0,232,200,0.05) inset" }} />
                <div className="jarvis-ring inner-ring absolute w-[420px] h-[420px] rounded-full border border-dotted border-[rgba(0,232,200,0.3)] pointer-events-none animate-[spin-slow_25s_linear_infinite]" />

                {/* Central Data Hub (Active Item) */}
                <div className="absolute rounded-full border border-[rgba(0,232,200,0.4)] flex flex-col items-center justify-center text-center z-40 backdrop-blur-2xl transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                    style={{
                        width: `${hubSize}px`,
                        height: `${hubSize}px`,
                        background: "radial-gradient(circle at 30% 30%, rgba(12,25,30,0.95) 0%, rgba(2,8,10,0.98) 60%, rgba(0,0,0,1) 100%)",
                        boxShadow: "0 30px 60px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.1), inset 0 -20px 40px rgba(0,232,200,0.15), 0 0 40px rgba(0,232,200,0.3)",
                        padding: `${Math.round(hubSize * 0.15)}px`
                    }}>
                    <div className="animate-pulse-glow text-[var(--color-primary)] drop-shadow-md" style={{ marginBottom: hubSize < 300 ? "6px" : "12px" }}>
                        {product.id === "ginger-os" && <Terminal size={hubSize < 300 ? 28 : 44} strokeWidth={1.5} />}
                        {product.id === "media-handler" && <PlayCircle size={hubSize < 300 ? 28 : 44} strokeWidth={1.5} />}
                        {product.id === "alarm" && <Clock size={hubSize < 300 ? 28 : 44} strokeWidth={1.5} />}
                        {product.id === "finance" && <Activity size={hubSize < 300 ? 28 : 44} strokeWidth={1.5} />}
                    </div>
                    <h3 className="font-extrabold text-[var(--color-text)] m-0 drop-shadow-md tracking-tighter" style={{ fontSize: hubSize < 300 ? "1.1rem" : "1.6rem", marginBottom: "6px" }}>
                        {product.name}
                    </h3>
                    {release && (
                        <div className="inline-flex items-center gap-1.5 font-mono text-[var(--color-accent)] bg-black/40 border border-[rgba(0,232,200,0.2)] rounded-full shadow-inner shadow-black/50"
                             style={{ fontSize: hubSize < 300 ? "0.65rem" : "0.75rem", margin: "0 0 10px 0", padding: "2px 10px" }}>
                            <GitBranch size={10} /> {release.tag_name}
                        </div>
                    )}
                    <p className="text-white/70 leading-relaxed m-0 overflow-hidden break-words drop-shadow-sm" 
                       style={{ 
                           fontSize: hubSize < 300 ? "0.75rem" : "0.9rem", 
                           marginBottom: "12px", 
                           display: "-webkit-box", 
                           WebkitLineClamp: hubSize < 300 ? 4 : 5, 
                           WebkitBoxOrient: "vertical" 
                       }}>
                        {product.description}
                    </p>
                    
                    <div className="flex gap-2 w-full justify-center mt-auto">
                        {primaryAsset ? (
                            <a href={primaryAsset.browser_download_url} className="btn-primary flex-none flex items-center justify-center font-medium shadow-lg shadow-black/40 drop-shadow-md"
                               style={{ minWidth: hubSize < 300 ? "0" : "120px", padding: hubSize < 300 ? "10px" : "12px 24px", fontSize: hubSize < 300 ? "0.8rem" : "0.9rem", boxShadow: "inset 0 1px 1px rgba(255,255,255,0.2)" }}>
                                <Download size={16} className={hubSize < 300 ? "mr-0" : "mr-1.5"} /> {hubSize >= 300 && "Get"}
                            </a>
                        ) : (
                            <span className="btn-primary flex-none flex items-center justify-center font-medium opacity-40 cursor-default shadow-lg shadow-black/40 drop-shadow-md" 
                                  style={{ minWidth: hubSize < 300 ? "0" : "120px", padding: hubSize < 300 ? "10px" : "12px 24px", fontSize: hubSize < 300 ? "0.8rem" : "0.9rem" }}>
                                N/A
                            </span>
                        )}
                        <Link href={`/products/${product.slug}`} className="btn-ghost flex-none flex items-center justify-center border border-white/10 bg-white/5 shadow-lg shadow-black/30 hover:bg-white/10" 
                              style={{ padding: hubSize < 300 ? "10px 14px" : "12px 16px" }} aria-label="Learn more">
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
                            className="absolute rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                            style={{
                                left: `calc(50% + ${x}px)`,
                                top: `calc(50% + ${y}px)`,
                                transform: "translate(-50%, -50%)",
                                width: isActive ? `${activeIconSize}px` : `${baseIconSize}px`,
                                height: isActive ? `${activeIconSize}px` : `${baseIconSize}px`,
                                zIndex: isActive ? 30 : 25,
                                background: isActive ? "radial-gradient(circle at 30% 30%, var(--color-surface-2) 0%, rgba(0,0,0,0.9) 100%)" : "radial-gradient(circle at 30% 30%, var(--color-surface) 0%, rgba(0,0,0,0.9) 100%)",
                                border: `2px solid ${isActive ? "rgba(0,232,200,0.8)" : "rgba(255,255,255,0.15)"}`,
                                boxShadow: isActive ? "0 10px 20px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -5px 15px rgba(0,232,200,0.4), 0 0 20px rgba(0,232,200,0.5)" : "0 8px 15px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.1)",
                            }}
                            aria-label={`Select ${item.product.name}`}
                        >
                            <span className="flex items-center justify-center transition-all duration-400" 
                                  style={{ 
                                      color: isActive ? "var(--color-primary)" : "var(--color-muted)", 
                                      filter: isActive ? "drop-shadow(0 0 10px rgba(0,232,200,0.8))" : "none" 
                                  }}>
                                {item.product.id === "ginger-os" && <Terminal size={isActive ? (radius < 200 ? 24 : 32) : (radius < 200 ? 20 : 24)} />}
                                {item.product.id === "media-handler" && <PlayCircle size={isActive ? (radius < 200 ? 24 : 32) : (radius < 200 ? 20 : 24)} />}
                                {item.product.id === "alarm" && <Clock size={isActive ? (radius < 200 ? 24 : 32) : (radius < 200 ? 20 : 24)} />}
                                {item.product.id === "finance" && <Activity size={isActive ? (radius < 200 ? 24 : 32) : (radius < 200 ? 20 : 24)} />}
                            </span>
                        </button>
                    );
                })}
                
                {/* SVG Connecting Lines for Active Item */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
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
                            const iconRadius = (radius < 200 ? 64 : 80) / 2;
                            const centerRadius = hubSize / 2;
                            
                            const startX = Math.cos(radians) * centerRadius;
                            const startY = Math.sin(radians) * centerRadius;
                            const endX = Math.cos(radians) * (radius - iconRadius);
                            const endY = Math.sin(radians) * (radius - iconRadius);

                            return (
                                <line 
                                    key={`line-${item.product.id}`}
                                    x1={startX} y1={startY} 
                                    x2={endX} y2={endY} 
                                    stroke="url(#glowLine)" 
                                    strokeWidth="2"
                                    strokeDasharray="4 4"
                                    className="animate-[dash-move_1s_linear_infinite]"
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
