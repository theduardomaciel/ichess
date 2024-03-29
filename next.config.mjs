/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		turbo: {
			rules: {
				"*.svg": {
					loaders: ["@svgr/webpack"],
					as: "*.js",
				},
			},
		},
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/i,
			loader: "@svgr/webpack",
			options: {
				svgoConfig: {
					plugins: [
						{
							name: "preset-default",
							params: {
								overrides: {
									removeViewBox: false, // important
								},
							},
						},
					],
				},
			},
		});

		return config;
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "randomuser.me",
				port: "",
				pathname: "/api/portraits/**",
			},
			{
				protocol: "https",
				hostname: "github.com",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
