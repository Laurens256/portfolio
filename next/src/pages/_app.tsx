import '@/styles/globals.css';

import { useEffect } from 'react';

import type { AppProps } from 'next/app';
import Footer from '../components/footer/Footer';

export default function App({ Component, pageProps }: AppProps) {
	useEffect(() => {
		const theme = localStorage.getItem('theme') || 'dark';
		document.documentElement.classList.add('no-transition');
		document.documentElement.setAttribute('data-theme', theme);
		setTimeout(() => {
			document.documentElement.classList.remove('no-transition');
		}, 300);
	}, []);

	return (
		<>
			<Component {...pageProps} />
			<Footer />
		</>
	);
}
