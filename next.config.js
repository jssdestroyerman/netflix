/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["@stripe/firestore-stripe-payments"],
    reactStrictMode: true,
    images: {
        domains: ["image.tmdb.org"],
    },
};

module.exports = nextConfig;
