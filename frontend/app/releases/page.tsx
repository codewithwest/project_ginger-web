import { Metadata } from "next";
import { GitCommit, Activity, Server, Layout, Download } from "lucide-react";

export const metadata: Metadata = {
    title: "Releases - gingerOS",
    description: "Latest updates, release notes, and changelogs for the gingerOS Web Platform and ecosystem applications.",
};

const RELEASES = [
    {
        version: "1.0.0",
        date: "March 2026",
        title: "The Ecosystem Launch",
        description: "Welcome to the official 1.0.0 launch of the GingerOS Web Platform. This massive update completely re-architects our web presence to act as a unified hub for the entire Ginger quad-core app ecosystem.",
        highlights: [
            {
                icon: <Activity size={24} className="text-[var(--color-primary)]" strokeWidth={1.5} />,
                title: "Jarvis Wheel Interface",
                description: "We completely redesigned the landing page. It now features a stunning, mathematically precise 3D holographic orbital array (the 'Jarvis Wheel') built with React and heavily optimized CSS animations. It acts as the interactive epicenter of the site."
            },
            {
                icon: <Layout size={24} className="text-[#a855f7]" strokeWidth={1.5} />,
                title: "Unified App Ecosystem",
                description: "The web platform now seamlessly tracks, documents, and distributes our core 'quad' of applications: GingerOS (Core Distribution), Ginger Media Handler, Ginger Alarm, and the brand new Ginger Finance."
            },
            {
                icon: <Download size={24} className="text-[#3b82f6]" strokeWidth={1.5} />,
                title: "Centralized Downloads",
                description: "The unified Downloads hub automatically polls the GitHub API to dynamically pull the latest `.AppImage`, `.exe`, and `.dmg` binaries for every product, ensuring users always have instant access to the newest stable builds."
            },
            {
                icon: <Server size={24} className="text-[var(--color-accent)]" strokeWidth={1.5} />,
                title: "Performance & Tailwind Refactor",
                description: "The entire frontend architecture has been heavily optimized and refactored using Tailwind CSS (v4), Next.js App Router, and React Server Components for maximum speed and SEO scoring."
            }
        ]
    }
];

export default function ReleasesPage() {
    return (
        <main className="min-h-screen pt-24 pb-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[rgba(0,232,200,0.03)] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[rgba(6,14,16,0.5)] rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-extrabold text-[var(--color-text)] mb-4 tracking-tighter" style={{ textShadow: "0 0 50px rgba(0,232,200,0.2)" }}>
                        Release <span className="text-[var(--color-accent)]">Notes</span>
                    </h1>
                    <p className="text-lg text-[var(--color-muted)] max-w-2xl mx-auto leading-relaxed">
                        Track the evolution of the gingerOS platform, our core applications, and massive ecosystem-wide upgrades.
                    </p>
                </div>

                <div className="space-y-12">
                    {RELEASES.map((release, i) => (
                        <div key={release.version} className="relative">
                            {/* Timeline Node */}
                            <div className="hidden md:flex absolute -left-[52px] top-6 w-10 h-10 rounded-full bg-[var(--color-surface)] border-2 border-[var(--color-border-accent)] items-center justify-center shadow-[0_0_20px_rgba(0,232,200,0.3)] z-10">
                                <GitCommit size={20} className="text-[var(--color-primary)]" />
                            </div>
                            
                            {/* Timeline Line */}
                            {i !== RELEASES.length - 1 && (
                                <div className="hidden md:block absolute -left-[33px] top-16 bottom-[-48px] w-0.5 bg-gradient-to-b from-[var(--color-border-accent)] to-transparent" />
                            )}

                            {/* Release Card */}
                            <div className="bg-gradient-to-br from-[var(--color-surface)] to-black/80 rounded-2xl border border-[var(--color-border)] shadow-[0_8px_30px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.05)] p-6 md:p-10 backdrop-blur-xl transition-all duration-300 hover:border-[rgba(0,232,200,0.3)]">
                                <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-6 border-b border-white/5 pb-6">
                                    <h2 className="text-3xl font-bold text-white tracking-tight">
                                        Version {release.version}
                                    </h2>
                                    <span className="text-sm font-mono text-[var(--color-accent)] bg-[var(--color-surface-2)] px-3 py-1 rounded-full border border-white/5">
                                        {release.date}
                                    </span>
                                </div>

                                <div className="mb-8">
                                    <h3 className="text-xl font-semibold text-white/90 mb-3">{release.title}</h3>
                                    <p className="text-white/60 leading-relaxed text-[0.95rem]">
                                        {release.description}
                                    </p>
                                </div>

                                <h4 className="text-sm font-bold text-[var(--color-muted)] uppercase tracking-wider mb-6">Key Highlights</h4>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {release.highlights.map((highlight, idx) => (
                                        <div key={idx} className="bg-white/5 rounded-xl p-5 border border-white/5 shadow-inner">
                                            <div className="mb-4 bg-black/40 w-12 h-12 rounded-lg flex items-center justify-center border border-white/5">
                                                {highlight.icon}
                                            </div>
                                            <h5 className="font-semibold text-white/90 mb-2">{highlight.title}</h5>
                                            <p className="text-sm text-white/50 leading-relaxed">
                                                {highlight.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
