# 🚀 Ginger Web v1.0.0 - The Initial Launch

Welcome to the new home of the GingerOS ecosystem! Version 1.0.0 introduces a modern, high-performance showcase website built entirely from scratch to highlight and distribute GingerOS and its companion applications.

## ✨ Key Features

### 🌐 Pure Next.js Architecture
- **No Backend Required**: The site operates without a dedicated database or backend server, drastically simplifying deployment and maintenance.
- **ISR Caching**: Leverages Next.js Incremental Static Regeneration (ISR) to cache GitHub API responses for 1 hour, ensuring lightning-fast page loads while respecting rate limits.
- **Server Components**: Uses React Server Components (RSC) to keep the client bundle tiny and performance exceptional.

### 🎨 Premium "Laser Teal" Theme
- **Custom Design System**: A bespoke dark-mode theme featuring a `#060e10` near-black background with vibrant `#00e8c8` laser teal-green accents.
- **Matrix Rain Hero**: A dynamic, client-side canvas animation rendering binary and katakana characters to establish a strong "hacker/techy" aesthetic immediately on landing.
- **3D Interactive Carousel**: A pure CSS 3D perspective carousel for exploring the product ecosystem, fully compatible with Server-Side Rendering (SSR).

### 📦 Live GitHub Integration
- **Real-Time Releases**: All download links, version numbers, file sizes, and download metrics are pulled live directly from the GitHub Releases API.
- **Automated Download Pages**: A comprehensive `/downloads` hub that automatically detects and categorizes `.iso`, `.deb`, `.exe`, and `.dmg` assets by platform.
- **Dynamic Product Showcases**: Individual deep-dive pages for GingerOS, Media Handler, and Alarm, featuring live release notes and CLI usage examples.

## 🛠️ Technical Details

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript 5
- **Icons**: Lucide React
- **Deployment**: Ready for Vercel (Zero Config)

---
*Welcome to the open source ecosystem built from the ground up. Fork it. Hack it. Make it yours.*
