import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["example.com", "res.cloudinary.com"],
  },
  serverExternalPackages: ['mongoose'],
};

export default nextConfig;
