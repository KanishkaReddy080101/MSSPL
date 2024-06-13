/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async rewrites() {
	  return [
		{
		  source: "/api/:path*",
		  destination: "http://192.168.0.200:4656/api/:path*",
		},
		{
			source: "/productionEnd/:path*",
			destination: "http://192.168.0.200:4656/productionEnd/:path*",
		  },
		{
		  source: "/Scale1/:path*",
		  destination: "http://14.194.60.202:7072/Scale1/:path*",
		},
		{
			source: "/Scale2/:path*",
			destination: "http://14.194.60.202:7072/Scale2/:path*",
		  },
		  {
			source: "/Scale3/:path*",
			destination: "http://14.194.60.202:7072/Scale3/:path*",
		  },
		  {
			source: "/Scale4/:path*",
			destination: "http://14.194.60.202:7072/Scale4/:path*",
		  },
		  {
			source: "/Scale5/:path*",
			destination: "http://14.194.60.202:7072/Scale5/:path*",
		  },
	  ];
	},
  };
  
  module.exports = nextConfig;
  