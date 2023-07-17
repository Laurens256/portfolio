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

	const [playState, setPlayState] = useState('');

	useEffect(() => {
		// check playstate to make sure it's not empty string (which is the initial state)
		playState && localStorage.setItem('svgAnimPlayState', playState.toString());
	}, [playState]);

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

		// retrieve previous play state from local storage and set it, otherwise set it to the computed style
		// reason computed style is used is because initial computed style can be different depending on prefers-reduced-motion media query
		const previousPlayState = localStorage.getItem('svgAnimPlayState');
		if (previousPlayState) {
			setPlayState(previousPlayState);
		} else {
			const firstUseRef = svgUseRefs[0].current;
			if (firstUseRef) {
				const computedStyle = getComputedStyle(firstUseRef);
				setPlayState(computedStyle.getPropertyValue('animation-play-state') || '');
			}
		}
	}, []);

	return (
		<section className={styles['svg-container']}>
			<button
				onClick={() => setPlayState(playState === 'running' ? 'paused' : 'running')}
				// add clickable class if playstate is not empty string which means it's not the initial state so js is enabled
				className={playState === '' ? '' : styles.clickable}
				aria-label="toggle animation"></button>
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
							animationPlayState: playState || 'blehhhhhh',
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
