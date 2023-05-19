import styles from './projects.module.css';

import type Project from '@/types/Project';

export default function Projects({ projects }: { projects: Project[] }) {
	return (
		<section className={styles.projects}>
			<ul className={projects.length % 2 === 0 ? styles.even : styles.uneven}>
				{projects.map(({ attributes: { title, slug, rank } }, i) => (
					<li key={i}>{title}</li>
				))}
			</ul>
		</section>
	);
}
