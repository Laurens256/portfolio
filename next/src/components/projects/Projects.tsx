import styles from './projects.module.css';

import type Project from '@/types/Project';

export default function Projects({ projects }: { projects: Project[] }) {
	return (
		<section className={styles.projects}>
			<ul>
				{projects.map(({ attributes: { title, slug, rank } }, i) => (
					<li key={i}>{title}</li>
				))}
			</ul>
		</section>
	);
}
