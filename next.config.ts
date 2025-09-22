import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: "/admin", // when user visits /admin
        destination: "/admin/posts", // redirect to subroute
        permanent: true, // 308 permanent redirect (set false for temporary)
      },
    ];
  },
};

export default nextConfig;
