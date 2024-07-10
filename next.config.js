/** @type {import('next').NextConfig} */
module.exports = {
  images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "via.placeholder.com",
				port: "",
				pathname: "/**",
			},
		]
  },
}

