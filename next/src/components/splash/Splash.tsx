import styles from './splash.module.css';
import NavLink from '@/types/NavLinks';
import { CSSProperties } from 'react';
import { useState } from 'react';

// prettier-ignore
// const panelColors = ['#5627af', '#9d27b0', '#2729af', '#e91f63', '#256bb0', '#4d50b1', '#0b698e', '#038387'];
// let availableColors: string[] = panelColors;
// const getRandomPanelColor = () => {
// 	// If the array is empty, refill it with the original colors
// 	if (availableColors.length === 0) {
// 		availableColors = panelColors;
// 	}

// 	// Get a random index and remove the string at that index from the array
// 	const randomIndex = Math.floor(Math.random() * availableColors.length);
// 	const color = availableColors[randomIndex];
// 	availableColors.splice(randomIndex, 1);
// 	return color;
// };

export default function Splash({ navLinks }: { navLinks: NavLink[] }) {

	// prettier-ignore
	const panelColors = ['#5627af', '#9d27b0', '#2729af', '#e91f63', '#256bb0', '#4d50b1', '#0b698e', '#038387'];
	const [colors, setColors] = useState<string[]>(panelColors.sort((a, b) => 0.5 - Math.random()));

	return (
		<section className={styles.splash}>
			<div>
				<h1>Laurens Duin</h1>
			</div>

			<nav>
				{navLinks.map((navLink, i) => (
					<a
						key={navLink.attributes.order}
						draggable="false"
						href={`#${navLink.attributes.href}`}
						style={{ '--panel-color': colors[i] } as CSSProperties}
						// style={{ '--panel-color': colors[i] } as CSSProperties}
						// style={{ '--panel-color': getRandomPanelColor() } as CSSProperties}
						dangerouslySetInnerHTML={{
							__html: `<h2>${navLink.attributes.title}</h2>
					${navLink.attributes.icon}`
						}}></a>
				))}
			</nav>
		</section>
	);
}
