import styles from './projects.module.css';

import Link from 'next/link';

import { ProjectMDX } from 'contentlayer/generated';

export default function Projects({ projects }: { projects: ProjectMDX[] }) {
	return (
		<section className={styles.projects}>
			<h2 id="projects">My projects</h2>
			<ul>
				{projects.map(
					(
						{ short_title, long_title, slug, panel_bg_color, panel_text_color, icon_url },
						i
					) => (
						<li
							key={i}
							style={
								{
									'--panel-bg-color': panel_bg_color,
									'--panel-text-color': panel_text_color
								} as React.CSSProperties
							}>
							<Link
								className={`${styles['link-panel']} ${styles[slug]}`}
								href={`/projects/${slug}`}>
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
