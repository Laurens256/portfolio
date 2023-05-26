import IAbout from '@/types/About';
import styles from './about.module.css';

import type About from '@/types/About';

export default function About({ about }: { about: IAbout }) {
	return (
		<section className={styles.about}>
			<article>
				<section>
					<h2 id="about">{about.attributes.heading}</h2>
					<p>{about.attributes.main}</p>
				</section>

				<section>
					<div>
						<img
							src={about.attributes.img.data.attributes.url}
							alt={about.attributes.img.data.attributes.alternativeText}
						/>
					</div>
				</section>
			</article>
		</section>
	);
}
