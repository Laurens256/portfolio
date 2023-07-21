import styles from './about.module.css';
import { AboutMdx } from 'contentlayer/generated';

import Link from 'next/link';

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
						<Link className="underline" href="Laurens_Duin-resume.pdf">
							Check out my resume
						</Link>
					</p>
				</section>

				<SvgAnimation text='code' />
			</article>
		</section>
	);
}
