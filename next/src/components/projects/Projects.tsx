import styles from './projects.module.css';
import panelStyles from '@/styles/link-panel.module.css';

import type IProject from '@/types/Project';

export default function Projects({ projects }: { projects: IProject[] }) {
	return (
		<section className={styles.projects}>
			<h2 id='projects'>Mijn projecten</h2>
			<ul>
				{projects.map(({ attributes: { short_title, long_title, slug, background, icon } }, i) => (
					<li
						key={i}
						style={{ '--panel-bg-color': background || 'var(--secondary-bg-color)' } as React.CSSProperties}
						className={styles[slug]}>
						<a className={panelStyles.linkPanel} href={`/projects/${slug}`}>
							<div>
								<h3>{short_title}</h3>
								<p>{long_title}</p>
							</div>
							<img src={icon?.data.attributes.url} alt={icon?.data.attributes.alternativeText} />
						</a>
					</li>
				))}
			</ul>
		</section>
	);
}
