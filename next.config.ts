import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: "/Kodkompaniet-site", // <-- med inledande slash!
  assetPrefix: "/Kodkompaniet-site/", // <-- med inledande slash!
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;
