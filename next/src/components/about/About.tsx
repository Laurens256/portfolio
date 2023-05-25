import styles from './about.module.css';

// very lazy
const calcAge = () => {
	const today = new Date();
	const birthDate = new Date(2003, 8, 22);
	let age = today.getFullYear() - birthDate.getFullYear();
	const m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
};

export default function About() {
	return (
		<section className={styles.about}>
			<header>
				<h2 id="about">About me</h2>
				<p>I'm Laurens, a {calcAge()} year old front-end webdeveloper. I'm currently studying at the Amsterdam University of Applied Sciences</p>
			</header>
		</section>
	);
}
