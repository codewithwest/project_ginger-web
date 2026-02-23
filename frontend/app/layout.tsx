import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GingerOS — Built from Source",
  description:
    "GingerOS is a custom Linux distribution and ecosystem of open source tools built from scratch. Download GingerOS, Ginger Media Handler, and Ginger Alarm.",
  keywords: ["GingerOS", "Linux", "open source", "media player", "alarm", "Electron", "LFS"],
  openGraph: {
    title: "GingerOS — Built from Source",
    description: "A custom Linux ecosystem built from scratch. Download GingerOS and its apps.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
