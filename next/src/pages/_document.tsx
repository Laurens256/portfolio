import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="nl">
			<Head>
				<title>Portfolio | Laurens Duin</title>
				<meta name="og:title" content="Portfolio | Laurens Duin" />

				<link rel="icon" type="image/x-icon" href="/favicon.ico"/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
