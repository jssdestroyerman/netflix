/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        dangerouslyAllowSVG: true,
        domains: ["rb.gy", "image.tmdb.org"],
    },
};

module.exports = nextConfig;
