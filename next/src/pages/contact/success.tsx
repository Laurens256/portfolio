import styles from './contact-feedback.module.css';

export default function Success () {
	return (
		<main className={styles['form-feedback']}>
			<article>

			<h1>Message received!</h1>
			<p>I will get back to you as soon as possible on the provided email address.</p>

			<a className='underline' href="/">Back to home</a>
			</article>
		</main>
	);
}