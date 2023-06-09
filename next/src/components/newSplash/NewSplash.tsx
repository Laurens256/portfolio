import { useEffect, useRef, RefObject } from 'react';
import styles from './newSplash.module.css';

import { betterLinkScroll } from '@/modules/header/Header';

// prettier-ignore
const adjectives = ['responsive', 'fast', 'fun', 'interactive', 'engaging', 'dynamic', 'modern', 'sleek', 'intuitive'];

const usedAdjectives: string[] = [];
let previousAdjective = 'responsive';

const delay = 100;
const removeDelay = 80;
const typewriterEffect = (element: HTMLSpanElement) => {
	if (usedAdjectives.length === adjectives.length) {
		usedAdjectives.length = 0;
	}
	const possibleAdjectives = adjectives.filter(
		(adjective) => !usedAdjectives.includes(adjective) && adjective !== previousAdjective
	);
	const newAdjective =
		possibleAdjectives[Math.floor(Math.random() * possibleAdjectives.length)];

	previousAdjective = newAdjective;
	usedAdjectives.push(newAdjective);

	// Start the typewriter effect to remove existing text
	const removeText = () => {
		let i = element.textContent!.length;
		function removeNextCharacter() {
			if (i > 0) {
				element.textContent = element.textContent!.slice(0, i - 1);
				i--;
				setTimeout(removeNextCharacter, removeDelay);
			} else {
				typeNextCharacter(0);
			}
		}
		removeNextCharacter();
	};

	const typeNextCharacter = (index: number) => {
		if (index < newAdjective.length) {
			element.textContent += newAdjective.charAt(index);
			index++;
			setTimeout(typeNextCharacter, delay, index);
		} else {
			element.setAttribute('aria-label', element.textContent || '');
		}
	};
	removeText();
};

export default function NewSplash() {
	const adjectiveRef: RefObject<HTMLSpanElement> = useRef(null);
	let ran = false;
	useEffect(() => {
		if (ran) return;
		ran = true;
		const element = adjectiveRef.current;

		if (element) {
			setTimeout(() => {
				typewriterEffect(element);

				setInterval(() => {
					typewriterEffect(element);
				}, 8000);
			}, 3000);
		}
	}, []);

	return (
		<>
			<section className={styles.splash}>
				<div>
					<p aria-hidden="true">Hi! My name is</p>
					<h1 aria-label="hi! my name is Laurens Duin">Laurens Duin</h1>
					<p>
						I'm a Dutch <span className={styles.frontend}>front-end developer</span> based
						in Amersfoort, Netherlands. I love creating{' '}
						<span ref={adjectiveRef} aria-label="responsive" className={styles.adjective}>
							responsive
						</span>{' '}
						and <span className={styles.accessible}>accessible</span> web experiences.
					</p>
				</div>
				<a
					href="#projects"
					aria-label="scroll to my projects"
					className={styles.scrollbtn}
					onClick={betterLinkScroll}>
					My Projects
				</a>
			</section>
		</>
	);
}