/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { API_URL: "https://petisuis-projects.vercel.app" },
  //images: { domains: ["lh3.googleusercontent.com"], formats: ["image/avif", "image/webp"] },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
    ],
  }
};

export default nextConfig;
