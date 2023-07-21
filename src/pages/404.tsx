import Link from 'next/link';
import styles from './index.module.css';

export default function Custom404() {
	return (
		<main className={styles.err404}>
			<article>
				<h1>404 - Page Not Found</h1>

				<Link className='underline' href="/">Back to home</Link>
			</article>
		</main>
	);
}
