import styles from './projects.module.css';

import Link from 'next/link';

import { ProjectMDX } from 'contentlayer/generated';

export default function Projects({ projects }: { projects: ProjectMDX[] }) {
	return (
		<section className={styles.projects}>
			<h2 id="projects">My projects</h2>
			<ul>
				{projects.map(
					({ short_title, long_title, slug, background_color, icon_url }, i) => (
						<li
							key={i}
							style={
								{
									'--panel-bg-color': background_color || 'var(--secondary-bg-color)'
								} as React.CSSProperties
							}
							// className={styles.linkpanel}
							className={styles[slug]}>
							<Link className={styles['link-panel']} href={`/projects/${slug}`}>
								<div className={styles.inner}>
									<section className={styles.info}>
										<h3 data-value={short_title}>{short_title}</h3>
										<p data-value={long_title}>{long_title}</p>
									</section>
									{icon_url && <img src={icon_url} alt="" />}
								</div>
							</Link>
						</li>
					)
				)}
			</ul>
		</section>
	);
}
