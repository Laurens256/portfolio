import styles from './contact-feedback.module.css';

export default function Error() {
	return (
		<main className={styles['form-feedback']}>
			<article>
				<h1>Something went wrong :(</h1>
				<p>Please try again later</p>
				<a className='underline' href="/">Back to home</a>
			</article>
		</main>
	);
}
