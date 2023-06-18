import { useRef } from 'react';

import IAbout from '@/types/About';
import styles from './about.module.css';

import type About from '@/types/About';

export default function About({ about }: { about: IAbout }) {
	const useRefs = Array.from({ length: 5 }, () => useRef<SVGUseElement>(null));

	const toggleAnimation = () => {
		useRefs.forEach((useRef) => {
			const useElement = useRef.current;
			if (useElement) {
				const currentState = getComputedStyle(useElement).animationPlayState;
				useElement.style.animationPlayState =
					currentState === 'paused' ? 'running' : 'paused';
			}
		});
	};

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
					<button onClick={toggleAnimation} aria-label="toggle animation"></button>

					{/* source: https://tympanus.net/Tutorials/AnimatedTextFills/ */}
					<svg className={styles.svg} viewBox="0 0 650 300">
						<symbol id="s-text">
							<text textAnchor="middle" x="50%" y="50%" dy=".35em">
								Code
							</text>
						</symbol>

						{useRefs.map((useRef, index) => (
							<use key={index} xlinkHref="#s-text" ref={useRef}></use>
						))}
					</svg>
				</section>
			</article>
		</section>
	);
}
