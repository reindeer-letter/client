import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "letter-bucket.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
