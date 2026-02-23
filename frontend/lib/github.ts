export type GitHubAsset = {
  id: number;
  name: string;
  label: string | null;
  size: number;
  download_count: number;
  browser_download_url: string;
  content_type: string;
};

export type GitHubRelease = {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  html_url: string;
  assets: GitHubAsset[];
};

export type ProductId = "media-handler" | "alarm" | "ginger-os";

export type Product = {
  id: ProductId;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  repo: string;
  slug: string;
  features: string[];
  cliExample?: string;
  platforms: string[];
};

export const PRODUCTS: Product[] = [
  {
    id: "ginger-os",
    name: "GingerOS",
    tagline: "A Linux distro built from source.",
    description:
      "GingerOS is a custom Linux distribution built entirely from scratch using Linux From Scratch (LFS). Engineered for performance, transparency, and full control over every layer of the stack.",
    icon: "🖥",
    repo: "codewithwest/ginger_os",
    slug: "ginger-os",
    features: [
      "Built from Linux From Scratch",
      "Custom build orchestration system",
      "Minimal footprint, maximum control",
      "Bootable ISO with installer",
      "Fully open source",
    ],
    cliExample: "# Install GingerOS\nsudo ./installer.sh --disk /dev/sda",
    platforms: ["linux"],
  },
  {
    id: "media-handler",
    name: "Ginger Media Handler",
    tagline: "Modern media player with CLI & streaming support.",
    description:
      "A secure, cross-platform media player built with Electron and React. Supports local playback, YouTube downloads, DLNA streaming, media keys, and headless CLI operation.",
    icon: "🎵",
    repo: "codewithwest/project_ginger-media-handler",
    slug: "media-handler",
    features: [
      "Audio & video playback (ffmpeg)",
      "YouTube download via yt-dlp",
      "DLNA / SMB network streaming",
      "System tray & media key support",
      "CLI & AI integration ready",
    ],
    cliExample:
      "# Play a file headlessly\nginger play ./music/track.mp3\n\n# Download from YouTube\nginger download https://youtube.com/watch?v=...",
    platforms: ["linux", "windows", "macos"],
  },
  {
    id: "alarm",
    name: "Ginger Alarm",
    tagline: "Alarm, timer & world clock — built for power users.",
    description:
      "A feature-rich alarm and timer application built on Electron with a stunning 3D UI powered by Three.js and Framer Motion. Perfect for developers who need precision timing.",
    icon: "⏰",
    repo: "codewithwest/project_ginger-alarm",
    slug: "alarm",
    features: [
      "Alarms with custom sounds",
      "Precision countdown timers",
      "World clock with timezone support",
      "3D animated interface (Three.js)",
      "Persistent SQLite storage",
    ],
    platforms: ["linux", "windows", "macos"],
  },
];

const GITHUB_API = "https://api.github.com";

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export type ReleaseData = {
  product: Product;
  release: GitHubRelease | null;
  error?: string;
};

async function fetchRelease(repo: string): Promise<GitHubRelease | null> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(`${GITHUB_API}/repos/${repo}/releases/latest`, {
      headers,
      next: { revalidate: 3600 }, // ISR: revalidate every hour
    });

    if (res.status === 404) return null; // No releases yet
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

    return res.json();
  } catch {
    return null;
  }
}

export async function getAllReleases(): Promise<ReleaseData[]> {
  const results = await Promise.all(
    PRODUCTS.map(async (product) => {
      const release = await fetchRelease(product.repo);
      return { product, release };
    })
  );
  return results;
}

export async function getRelease(productId: ProductId): Promise<ReleaseData> {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return { product: PRODUCTS[0], release: null, error: "Not found" };
  const release = await fetchRelease(product.repo);
  return { product, release };
}

export function getPlatformAssets(assets: GitHubAsset[]) {
  return assets.map((asset) => {
    let platform = "other";
    const name = asset.name.toLowerCase();
    if (name.endsWith(".deb") || name.includes("linux") || name.includes("amd64") || name.endsWith(".rpm") || name.endsWith(".appimage")) {
      platform = "linux";
    } else if (name.endsWith(".exe") || name.includes("windows") || name.includes("win32") || name.includes("setup")) {
      platform = "windows";
    } else if (name.endsWith(".dmg") || name.includes("darwin") || name.includes("macos") || name.includes("mac")) {
      platform = "macos";
    } else if (name.endsWith(".zip") || name.endsWith(".tar.gz") || name.endsWith(".iso")) {
      platform = "archive";
    }
    return { ...asset, platform, formattedSize: formatBytes(asset.size) };
  });
}
