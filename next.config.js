/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["upload.wikimedia.org", "flagcdn.com"],
        dangerouslyAllowSVG: true,
        contentSecurityPolicy:
            "default-src 'self'; script-src 'none'; sandbox;",
    },
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },
};

module.exports = nextConfig;
