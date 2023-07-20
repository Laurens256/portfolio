// source: https://tympanus.net/Tutorials/AnimatedTextFills/
import styles from './svgAnimation.module.css';
import { useRef, useEffect, useState } from 'react';

const colorPalettes = [
	['#7e6aa8', '#9ece69', '#7dcfff', '#2f69e4', '#dcac67'],
	['#bb73d1', '#e3bf7a', '#61afef', '#98c379', '#e06c75'],
	['#62cee2', '#ac7ffc', '#94c72c', '#d8ce6e', '#ec266d'],
	['#eacd59', '#db6fc0', '#36f9f6', '#e37d37', '#6feab3'],
	['#d919d1', '#f12c91', '#3ea5f9', '#fed300', '#0deffb']
];

export default function SvgAnimation({ text }: { text: string }) {
	const svgUseRefs = Array.from({ length: 5 }, () => useRef<SVGUseElement>(null));

	useEffect(() => {
		// add random color to each use element on mount
		const randomPalette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
		svgUseRefs.forEach((svgUseRef) => {
			const svgUseElement = svgUseRef.current;
			if (svgUseElement) {
				randomPalette.forEach((color, index) => {
					svgUseElement.style.setProperty(`--color${index + 1}`, color);
				});
			}
		});
	}, []);

	return (
		<section className={styles['svg-container']}>
			<svg aria-hidden="true" viewBox="0 0 650 300">
				<symbol id="s-text">
					<text textAnchor="middle" x="50%" y="50%" dy=".35em">
						{text}
					</text>
				</symbol>

				{svgUseRefs.map((svgUseRef, index) => (
					<use
						key={index}
						ref={svgUseRef}
						xlinkHref="#s-text"
						// blehhhhhh makes sure the server rendered version of the animation is the same as the client rendered version (any non-css value works)
						style={{
							animationDelay: `${(index + 1) * -1.2}s`,
							stroke: `var(--color${index + 1})`,
							[`--color${index + 1}`]: colorPalettes[0][index]
						}}
					/>
				))}
			</svg>
		</section>
	);
}
