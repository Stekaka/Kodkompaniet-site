import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLenis from "../components/ClientLenis"; // justera sökväg vid behov
import PerformanceMonitor from "../components/PerformanceMonitor"; // justera sökväg vid behov

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kodkompaniet - Vi bygger hemsidor som imponerar",
  description: "Kodkompaniet skapar snabba, snygga och skräddarsydda hemsidor utan byråpriser. Boka gratis rådgivning idag!",
  keywords: ["webbutveckling", "hemsidor", "design", "Stockholm", "kodkompaniet"],
  authors: [{ name: "Kodkompaniet" }],
  robots: "index, follow",
  openGraph: {
    title: "Kodkompaniet - Vi bygger hemsidor som imponerar",
    description: "Kodkompaniet skapar snabba, snygga och skräddarsydda hemsidor utan byråpriser.",
    type: "website",
    locale: "sv_SE",
    siteName: "Kodkompaniet",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kodkompaniet - Vi bygger hemsidor som imponerar",
    description: "Kodkompaniet skapar snabba, snygga och skräddarsydda hemsidor utan byråpriser.",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#22c55e',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <ClientLenis />
        <PerformanceMonitor />
        {children}
      </body>
    </html>
  );
}
