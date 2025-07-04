import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["example.com", "res.cloudinary.com"], // Add your actual image domain here
  },
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
  },
};

export default nextConfig;
