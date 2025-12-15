/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    //remotePatterns: [new URL('http://localhost:4000/public/images/**')],
    remotePatterns: [new URL('http://localhost:5252/Uploads/**')],
  },
  
};

export default nextConfig;
