import styles from './projects.module.css';
import panelStyles from '@/styles/link-panel.module.css';

import type Project from '@/types/Project';

export default function Projects({ projects }: { projects: Project[] }) {
	return (
		<section className={styles.projects}>
			<h2 id='projects'>Mijn projecten</h2>
			<ul className={projects.length % 2 === 0 ? styles.even : styles.uneven}>
				{projects.map(({ attributes: { short_title, slug, rank, background } }, i) => (
					<li
						key={i}
						style={{ '--panel-bg-color': background || '#fff' } as React.CSSProperties}
						className={slug === 'pokedex' ? styles.pokemon : ''}>
						<a className={panelStyles.linkPanel} href={`/projects/${slug}`}>
							<h3>{short_title}</h3>
						</a>
					</li>
				))}
			</ul>
		</section>
	);
}
