/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async rewrites() {
	  return [
		{
		  source: "/api/:path*",
		  destination: "http://14.194.60.202:8626/api/:path*",
		},
		// {
		//   source: "/Scale1/:path*",
		//   destination: "http://192.168.0.61:7070/Scale1/:path*",
		// },
		// {
		// 	source: "/Scale2/:path*",
		// 	destination: "http://192.168.0.61:7070/Scale2/:path*",
		//   },
		//   {
		// 	source: "/Scale3/:path*",
		// 	destination: "http://192.168.0.61:7070/Scale3/:path*",
		//   },
		//   {
		// 	source: "/Scale4/:path*",
		// 	destination: "http://192.168.0.61:7070/Scale4/:path*",
		//   },
		//   {
		// 	source: "/Scale5/:path*",
		// 	destination: "http://192.168.0.61:7070/Scale5/:path*",
		//   },
	  ];
	},
  };
  
  module.exports = nextConfig;
  