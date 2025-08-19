import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  // Konfiguration för domän
  trailingSlash: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://kodco.se' : '',
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
};

module.exports = nextConfig;
