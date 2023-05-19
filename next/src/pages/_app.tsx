import '@/styles/globals.css';

import { useEffect } from 'react';

import type { AppProps } from 'next/app';
import Footer from '../components/footer/Footer';

export default function App({ Component, pageProps }: AppProps) {
	useEffect(() => {
		const theme = localStorage.getItem('theme');
		document.documentElement.setAttribute('data-theme', theme || 'dark');
	}, []);
	
	return (
		<>
			<Component {...pageProps} />
			<Footer />
		</>
	);
}
