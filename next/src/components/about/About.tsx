import { useRef, useEffect } from 'react';

import IAbout from '@/types/About';
import styles from './about.module.css';

import type About from '@/types/About';

const colorPalettes = [
	['#7e6aa8', '#9ece69', '#7dcfff', '#2f69e4', '#dcac67'],
	['#bb73d1', '#e3bf7a', '#61afef', '#98c379', '#e06c75'],
	['#62cee2', '#ac7ffc', '#94c72c', '#d8ce6e', '#ec266d'],
	['#eacd59', '#db6fc0', '#36f9f6', '#e37d37', '#6feab3'],
	['#d919d1', '#f12c91', '#3ea5f9', '#fed300', '#0deffb']
];

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

	// add random color palette to svg
	const svgRef = useRef<SVGSVGElement>(null);
	useEffect(() => {
		const svgElement = svgRef.current;
		if (svgElement) {
			const randomColorPalette =
				colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
			randomColorPalette.forEach((color, index) => {
				svgElement.style.setProperty(`--color${index + 1}`, color);
			});
		}
	}, []);

	return (
		<section className={styles.about}>
			<article>
				<section>
					<h2 id="about">About me</h2>
					<p>{about.attributes.main}</p>
					<p className={styles.resume}>
						Want to know more?{' '}
						<a className="underline" href="Laurens_Duin-resume.pdf">
							Check out my resume
						</a>
					</p>
				</section>

				<section>
					<button onClick={toggleAnimation} aria-label="toggle animation"></button>

					{/* source: https://tympanus.net/Tutorials/AnimatedTextFills/ */}
					<svg
						ref={svgRef}
						aria-hidden="true"
						className={styles.svg}
						viewBox="0 0 650 300">
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
