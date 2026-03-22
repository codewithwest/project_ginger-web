import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import { GitCommit } from 'lucide-react';

export const metadata: Metadata = {
    title: "Releases - gingerOS",
    description: "Latest updates, release notes, and changelogs for the gingerOS Web Platform.",
};

async function getReleases() {
    const docsDir = path.join(process.cwd(), 'docs', 'release');
    let files: string[] = [];
    try {
        files = fs.readdirSync(docsDir);
    } catch {
        return [];
    }

    const mdFiles = files.filter(f => f.endsWith('.md'));
    
    // Sort descending by name (assuming RELEASE_NOTES_v1.0.0.md, etc.)
    mdFiles.sort((a, b) => b.localeCompare(a));
    
    return mdFiles.map(file => {
        const content = fs.readFileSync(path.join(docsDir, file), 'utf8');
        return { filename: file, content };
    });
}

export default async function ReleasesPage() {
    const releases = await getReleases();

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
                        Track the evolution of the gingerOS platform and ecosystem applications directly from our documentation.
                    </p>
                </div>

                <div className="space-y-12">
                    {releases.map((release, i) => (
                        <div key={release.filename} className="relative">
                            {/* Timeline Node */}
                            <div className="hidden md:flex absolute -left-[52px] top-6 w-10 h-10 rounded-full bg-[var(--color-surface)] border-2 border-[var(--color-border-accent)] items-center justify-center shadow-[0_0_20px_rgba(0,232,200,0.3)] z-10">
                                <GitCommit size={20} className="text-[var(--color-primary)]" />
                            </div>
                            
                            {/* Timeline Line */}
                            {i !== releases.length - 1 && (
                                <div className="hidden md:block absolute -left-[33px] top-16 bottom-[-48px] w-0.5 bg-gradient-to-b from-[var(--color-border-accent)] to-transparent" />
                            )}

                            {/* Release Card */}
                            <div className="bg-gradient-to-br from-[var(--color-surface)] to-black/80 rounded-2xl border border-[var(--color-border)] shadow-[0_8px_30px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.05)] p-6 md:p-10 backdrop-blur-xl transition-all duration-300 hover:border-[rgba(0,232,200,0.3)] prose-invert max-w-none">
                                <ReactMarkdown
                                    components={{
                                        // Custom mapping to apply Tailwind styles to the Markdown elements
                                        h1: ({...props}) => <h2 className="text-3xl font-bold text-white tracking-tight mb-6 border-b border-white/5 pb-6" {...props} />,
                                        h2: ({...props}) => <h3 className="text-xl font-semibold text-[var(--color-accent)] mt-8 mb-4 flex items-center gap-2" {...props} />,
                                        h3: ({...props}) => <h4 className="text-lg font-bold text-white/90 mt-6 mb-3" {...props} />,
                                        p: ({...props}) => <p className="text-white/70 leading-relaxed mb-4 text-[0.95rem]" {...props} />,
                                        ul: ({...props}) => <ul className="list-disc list-inside space-y-2 mb-6 text-white/70" {...props} />,
                                        li: ({...props}) => <li className="leading-relaxed" {...props} />,
                                        strong: ({...props}) => <strong className="font-semibold text-white" {...props} />,
                                        em: ({...props}) => <em className="italic text-white/50" {...props} />,
                                        hr: ({...props}) => <hr className="border-white/10 my-8" {...props} />,
                                    }}
                                >
                                    {release.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ))}
                    
                    {releases.length === 0 && (
                        <div className="text-center text-[var(--color-muted)] p-10 bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)]">
                            No release notes found in docs/release.
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
