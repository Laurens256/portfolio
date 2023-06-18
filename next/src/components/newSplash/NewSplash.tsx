import { useEffect, useRef, RefObject } from 'react';
import styles from './newSplash.module.css';

import { betterLinkScroll } from '@/modules/header/Header';
import type ISplash from '@/types/Splash';

// prettier-ignore
let adjectives: string[] = [];
// const adjectives = ['responsive', 'fast', 'fun', 'interactive', 'engaging', 'dynamic', 'modern', 'sleek', 'intuitive'];

const usedAdjectives: string[] = [];
let previousAdjective = '';

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

export default function NewSplash({ splashData }: { splashData: ISplash }) {
	const adjectiveRef: RefObject<HTMLSpanElement> = useRef(null);
	useEffect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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

	let subheading1 = '';
	let subheading2 = '';
	let randomAdjective = '';
	if (splashData.attributes.subheading.includes('{adjective}')) {
		subheading1 = splashData.attributes.subheading.split('{adjective}')[0];
		subheading2 = splashData.attributes.subheading.split('{adjective}')[1];

		const adjectiveArr = splashData.attributes.adjectives?.split('\n');
		if (adjectiveArr) {
			adjectives = adjectiveArr;
			randomAdjective = adjectives[0];
			previousAdjective = adjectives[0];
			usedAdjectives.push(adjectives[0]);
		}
	} else {
		subheading1 = splashData.attributes.subheading;
	}

	return (
		<>
			<section className={styles.splash}>
				<div>
					<p aria-hidden="true">Hi! My name is</p>
					<h1 aria-label="hi! my name is Laurens Duin">Laurens Duin</h1>
					<p>
						{subheading1}
						{randomAdjective && (
							<>
								<span ref={adjectiveRef} aria-label={randomAdjective} className={styles.adjective}>
									{randomAdjective}
								</span>

								{subheading2}
							</>
						)}
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
