// source: https://tympanus.net/Tutorials/AnimatedTextFills/
import styles from './svgAnimation.module.css';
import { useRef, useEffect } from 'react';

const colorPalettes = [
	['#7e6aa8', '#9ece69', '#7dcfff', '#2f69e4', '#dcac67'],
	['#bb73d1', '#e3bf7a', '#61afef', '#98c379', '#e06c75'],
	['#62cee2', '#ac7ffc', '#94c72c', '#d8ce6e', '#ec266d'],
	['#eacd59', '#db6fc0', '#36f9f6', '#e37d37', '#6feab3'],
	['#d919d1', '#f12c91', '#3ea5f9', '#fed300', '#0deffb']
];

export default function SvgAnimation() {
	// create ref to each <use> element in svg, i forgot why it needs a length of 5 lmao
	const useRefs = Array.from({ length: 5 }, () => useRef<SVGUseElement>(null));

	const toggleAnimation = (newState?: string) => {
		useRefs.forEach((useRef) => {
			const useElement = useRef.current;
			if (!useElement) return;

			if (!newState) {
				// if no new state is provided, toggle current state
				const currentState = getComputedStyle(useElement).animationPlayState;
				newState = currentState === 'paused' ? 'running' : 'paused';
			}
			useElement.style.animationPlayState = newState;
		});

		// save current play state to local storage
		localStorage.setItem('svgAnimPlayState', newState || 'running');
	};

	// add random color palette to svg on mount
	const svgRef = useRef<SVGSVGElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		const svgElement = svgRef.current;
		if (svgElement) {
			// add clickable class to button to show it's clickable
			if (buttonRef.current) {
				buttonRef.current.classList.add(styles.clickable);
			}

			const randomColorPalette =
				colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
			randomColorPalette.forEach((color, index) => {
				svgElement.style.setProperty(`--color${index + 1}`, color);
			});

			// retrieve previous play state from local storage and set it
			const previousPlayState = localStorage.getItem('svgAnimPlayState');
			previousPlayState && toggleAnimation(previousPlayState);
		}
	}, []);

	return (
		<section className={styles['svg-container']}>
			<button
				ref={buttonRef}
				onClick={() => toggleAnimation()}
				aria-label="toggle animation"></button>
			<svg ref={svgRef} aria-hidden="true" viewBox="0 0 650 300">
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
	);
}
