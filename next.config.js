const dotenv = require("dotenv");
dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  i18n: {
    locales: ["ru"],
    defaultLocale: "ru",
  },
  images: {
    domains: ["alpine-studio.ru", process.env.NEXT_PUBLIC_API_HOST || "localhost"],
  },
  publicRuntimeConfig: {
    strapiUrl: process.env.NEXT_PUBLIC_API_URL || "http://alpine-studio.ru:8005",
  },
  serverRuntimeConfig: {
    revalidate: 10,
  },
};

module.exports = nextConfig;
