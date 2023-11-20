/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination:
					"http://192.168.0.61:8626/api/:path*",
			},
     
		];
	},
}

module.exports = nextConfig
