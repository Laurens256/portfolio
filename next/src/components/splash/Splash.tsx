import styles from './splash.module.css';
import panelStyles from '@/styles/link-panel.module.css';

import Pacman from '@/modules/pacman/Pacman';

import type INavLink from '@/types/NavLink';
import { useEffect } from 'react';

// prettier-ignore
const panelColors = ['#5627af', '#9d27b0', '#2729af', '#e91f63', '#256bb0', '#4d50b1', '#0b698e', '#038387'];
let availableColors: string[] = panelColors;
const getRandomPanelColor = () => {
	// If the array is empty, refill it with the original colors
	if (availableColors.length === 0) {
		availableColors = panelColors;
	}

	// Get a random index and remove the string at that index from the array
	const randomIndex = Math.floor(Math.random() * availableColors.length);
	const color = availableColors[randomIndex];
	availableColors.splice(randomIndex, 1);
	return color;
};

const betterLinkScroll = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
	e.preventDefault();
	const heading = document.querySelector(`#${href}`);

	heading?.scrollIntoView({
		behavior: 'smooth'
	});
};

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let interval: ReturnType<typeof setInterval>;
let glitchRunning = false;
const glitchy = (event: React.MouseEvent<HTMLHeadingElement>) => {
	if (glitchRunning || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		return;
	}

	const heading = event.target as HTMLHeadingElement;
	heading.classList.add(styles.glitchy);

	let iteration = 0;
	glitchRunning = true;

	clearInterval(interval);

	interval = setInterval(() => {
		heading.textContent = heading
			.textContent!.split('')
			.map((letter: string, index: number) => {
				if (index < iteration) {
					return heading.getAttribute('aria-label')![index];
				}

				const randomNum = Math.floor(Math.random() * letters.length);

				return letters[randomNum];
			})
			.join('');

		if (iteration >= heading.getAttribute('aria-label')!.length) {
			clearInterval(interval);
			glitchRunning = false;
			heading.classList.remove(styles.glitchy);
		}

		iteration += 1 / 3;
	}, 30);
};

export default function Splash({ navLinks }: { navLinks: INavLink[] }) {
	// Set the panel colors randomly
	useEffect(() => {
		const navLinkElements: NodeListOf<HTMLElement> = document.querySelectorAll(
			`nav a[draggable="false"]`
		);

		navLinkElements.forEach((navLinkEl) => {
			navLinkEl.style.setProperty('--panel-bg-color', getRandomPanelColor());
		});
	}, []);

	return (
		<section className={styles.splash}>
			<div>
				<h1
					aria-label="Laurens Duin"
					aria-describedby="Laurens Duin"
					onMouseOver={glitchy}>
					Laurens Duin
				</h1>
			</div>

			<nav>
				{navLinks.map(({ attributes: { title, href, icon } }, i) => (
					<a
						onClick={(e) => betterLinkScroll(href, e)}
						className={panelStyles.linkPanel}
						key={i}
						draggable="false"
						href={`#${href}`}>
						<div>
							<span>{title}</span>
							<span dangerouslySetInnerHTML={{ __html: icon }}></span>
						</div>

						{i === 0 && (
							<Pacman />
						)}
					</a>
				))}
			</nav>
		</section>
	);
}
