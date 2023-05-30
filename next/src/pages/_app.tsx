import '@/styles/globals.css';

import Head from 'next/head';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

import type { AppProps } from 'next/app';
import Footer from '@/modules/footer/Footer';

const noFooterRoutes = ['/404', '/contact/success', '/contact/error'];
export default function App({ Component, pageProps }: AppProps) {
	useEffect(() => {
		const theme = localStorage.getItem('theme') || 'dark';
		document.documentElement.classList.add('no-transition');
		document.documentElement.setAttribute('data-theme', theme);
		setTimeout(() => {
			document.documentElement.classList.remove('no-transition');
		}, 300);
	}, []);

	const router = useRouter();

	return (
		<>
			<Head>
				<title key="title">Portfolio | Laurens Duin</title>
				<meta key="og-title" name="og:title" content="Portfolio | Laurens Duin" />

				<link rel="icon" type="image/x-icon" href="/favicon.ico" />
			</Head>
			<Component {...pageProps} />

			{!noFooterRoutes.includes(router.pathname) && <Footer />}
		</>
	);
}
