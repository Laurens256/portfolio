/** @type {import('next').NextConfig} */
const nextConfig = {
	compiler: {
		styledComponents: true
	},
	reactStrictMode: true,
	images: {
		remotePatterns: [
		  {
			protocol: 'https',
			hostname: 'gjwthqvkkfklvhoqvqpw.supabase.co',
			port: '',
			pathname: '/storage/v1/object/public/strapi-uploads/**',
		  },
		],
	  },
};

module.exports = nextConfig;
