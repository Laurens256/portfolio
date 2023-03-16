import styles from '../styles/Home.module.css';
import { CSSProperties } from 'react';

interface NavLink {
	attributes: {
		title: string;
		href: string;
		icon: string;
		order: number;
	};
}

const panelColors = ['#5627af', '#9d27b0', '#2729af', '#e91f63', '#256bb0'];
let lastIndex = -1;
const getRandomPanelColor = () => {
	let index = lastIndex + 1;
	if (index >= panelColors.length) {
		index = 0;
	}
	lastIndex = index;
	return panelColors[index];
};

export default function Home({ navLinks }: { navLinks: NavLink[] }) {
	return (
		<section className={styles.splash}>
			<div>
				<h1>Laurens Duin</h1>
			</div>

			<nav>
				{navLinks.map((navLink) => (
					<a
						key={navLink.attributes.order}
						draggable="false"
						// on:click={betterLinkLogic}
						href={navLink.attributes.href}
						style={{ '--panel-color': getRandomPanelColor() } as CSSProperties}
						dangerouslySetInnerHTML={{
							__html: `<h2>${navLink.attributes.title}</h2>
						${navLink.attributes.icon}`
						}}></a>
				))}
			</nav>
		</section>
	);
}

export async function getStaticProps() {
	const response = await fetch('https://admin.laurensduin.nl/api/navlinks');
	// const response = await fetch('http://localhost:1337/api/navlinks');
	const navLinks: NavLink[] = (await response.json()).data;

	navLinks.sort((a, b) => {
		return a.attributes.order - b.attributes.order;
	});

	return {
		props: {
			navLinks
		}
	};
}
