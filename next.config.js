/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination:
					"http://192.168.0.61:7073/API/:path*",
			},
      {
        source: "/api-7689/:path*",
        destination: "http://192.168.0.61:7689/api/:path*",
      },
      {
        source: "/api-7071/:path*",
        destination: "http://192.168.0.61:7071/api/:path*",
      },
		];
	},
}

module.exports = nextConfig
