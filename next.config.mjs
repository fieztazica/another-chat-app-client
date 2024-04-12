/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.BACKEND_URL}/api/:path*`,
            },
            {
                source: '/ws/:path*',
                destination: `${process.env.BACKEND_URL}/:path*`,
            },
        ]
    },
}

export default nextConfig
