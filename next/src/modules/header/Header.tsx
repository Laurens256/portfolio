import styles from './header.module.css';

import Router from 'next/router';

import type INavLink from '@/types/NavLink';

export const betterLinkScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
	e.preventDefault();
	const href = e.currentTarget.getAttribute('href')?.replace('#', '');
	const heading = document.querySelector(`#${href}`);

	heading?.scrollIntoView({
		behavior: 'smooth'
	});
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

export default function Header({ navLinks }: { navLinks: INavLink[] }) {
	return (
		<header className={styles.header}>
			<nav>
				<div>
					<ul>
						<li key="-1">
							<a onClick={logoClick} href="/">
								/
							</a>
						</li>
						{navLinks.map(({ attributes: { title, href, icon } }, i) => (
							<li key={i}>
								<a
									className={`underline`}
									onClick={betterLinkScroll}
									draggable="false"
									href={`#${href}`}>
									{title}
								</a>
							</li>
						))}
					</ul>
				</div>
			</nav>
		</header>
	);
}
