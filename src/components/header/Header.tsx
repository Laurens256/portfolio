import styles from './header.module.css';

import Router from 'next/router';
import Link from 'next/link';

export const betterLinkScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
	e.preventDefault();

	const href = e.currentTarget.getAttribute('href')?.replace(/[#/]/g, '');
	const heading: HTMLElement | null = document.querySelector(`#${href}`);

	if (heading) {
		heading.setAttribute('tabindex', '-1');
		heading.focus({ preventScroll: true });

		heading.scrollIntoView({
			behavior: 'smooth'
		});
		heading.blur();
	}
};

const logoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
	if (Router.route === '/') {
		e.preventDefault();
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
};

const navLinks = [
	{ title: 'Projects', href: 'projects' },
	{ title: 'About', href: 'about' },
	{ title: 'Contact', href: 'contact' }
];

export default function Header() {
	return (
		<header className={styles.header}>
			<nav>
				<div>
					<ul>
						<li key="-1">
							<Link onClick={logoClick} href="/" aria-label="home">
								/
							</Link>
						</li>
						{navLinks.map(({ title, href }) => (
							<li key={title}>
								<Link
									className={`underline`}
									onClick={betterLinkScroll}
									href={`#${href}`}>
									{title}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</nav>
		</header>
	);
}
