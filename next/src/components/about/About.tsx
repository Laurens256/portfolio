import IAbout from '@/types/About';
import styles from './about.module.css';

import type About from '@/types/About';

export default function About({ about }: { about: IAbout }) {
	return (
		<section className={styles.about}>
			<article>
				<section>
					<h2 id="about">About me</h2>
					<p>{about.attributes.main}</p>
					<p className={styles.resume}>
						Want to know more?
						<a className="underline" href="Laurens_Duin-resume.pdf">
							Check out my resume
						</a>
					</p>
				</section>

				<section>
					{/* <div>
						<img
							src={about.attributes.img.data.attributes.url}
							alt={about.attributes.img.data.attributes.alternativeText}
						/>
					</div> */}
					{/* source: https://tympanus.net/Tutorials/AnimatedTextFills/ */}
					<svg className={styles.svg} viewBox="0 0 650 300">
						<symbol id="s-text">
							<text text-anchor="middle" x="50%" y="50%" dy=".35em">
								Code
							</text>
						</symbol>

						<use xlinkHref="#s-text"></use>
						<use xlinkHref="#s-text"></use>
						<use xlinkHref="#s-text"></use>
						<use xlinkHref="#s-text"></use>
						<use xlinkHref="#s-text"></use>
					</svg>
				</section>
			</article>
		</section>
	);
}
