/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination:
					"http://192.168.0.200:8088/api/:path*",
			},
     
		];
	},
}

module.exports = nextConfig
