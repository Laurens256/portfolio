import styles from './about.module.css';
import { AboutMdx } from 'contentlayer/generated';

import SvgAnimation from '@/parts/svgAnimation/SvgAnimation';

export default function About({ about }: { about: AboutMdx }) {
	return (
		<section className={styles.about}>
			<article>
				<section>
					<h2 id="about">About me</h2>
					<p>{about.body.raw}</p>
					<p className={styles.resume}>
						Want to know more?{' '}
						<a className="underline" href="Laurens_Duin-resume.pdf">
							Check out my resume
						</a>
					</p>
				</section>

				<SvgAnimation />
			</article>
		</section>
	);
}
