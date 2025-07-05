import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'flagcdn.com'], // ✅ Thêm domain Cloudinary
  },
};

export default nextConfig;
