import styles from './footer.module.css';
import ThemeSwitcher from '@/parts/themeSwitcher/ThemeSwitcher';

const socials = [
	{ name: 'Github', link: 'https://github.com/Laurens256/' },
	{ name: 'LinkedIn', link: 'https://www.linkedin.com/in/laurens-duin-497b9a1a9/' },
	{ name: 'duinlaurens2@gmail.com', link: 'mailto:duinlaurens2@gmail.com' }
];

export default function Footer({ route }: { route: string }) {
	return (
		<footer className={`${styles.footer} ${styles[route]}`}>
				<section>
					<h3 id="socials">Socials</h3>
					<ul>
						{socials.map((social) => (
							<li key={social.name}>
								<a href={social.link} className="underline" target="_blank">
									{social.name}
								</a>
							</li>
						))}
						<li className={styles['theme-switcher-container']}>
							<ThemeSwitcher />
						</li>
					</ul>
				</section>
		</footer>
	);
}
