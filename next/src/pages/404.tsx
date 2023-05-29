import styles from './index.module.css';

export default function Custom404() {
	return (
		<main className={styles.err404}>
			<article>
				<h1>404 - Page Not Found</h1>

				<a className='underline' href="/">Back to home</a>
			</article>
		</main>
	);
}
