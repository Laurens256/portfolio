import { useEffect, useRef, RefObject } from 'react';
import styles from './newSplash.module.css';

import { SplashMdx } from 'contentlayer/generated';

import { betterLinkScroll } from '@/modules/header/Header';

const delay = 100;
const removeDelay = 80;
// Start the typewriter effect to remove existing text
const removeText = (
	element: HTMLElement,
	container: HTMLElement,
	newAdjective: string,
	ariaLabel: string
) => {
	let i = element.textContent!.length;
	const removeNextCharacter = () => {
		if (i > 0) {
			element.textContent = element.textContent!.slice(0, i - 1);
			i--;
			setTimeout(removeNextCharacter, removeDelay);
		} else {
			typeNextCharacter(element, container, newAdjective, ariaLabel, 0);
		}
	};
	removeNextCharacter();
};

const typeNextCharacter = (
	element: HTMLElement,
	container: HTMLElement,
	newAdjective: string,
	ariaLabel: string,
	index: number
) => {
	if (newAdjective && index < newAdjective.length) {
		element.textContent += newAdjective.charAt(index);
		index++;
		setTimeout(
			typeNextCharacter,
			delay,
			element,
			container,
			newAdjective,
			ariaLabel,
			index
		);
	} else {
		container.setAttribute('aria-label', ariaLabel);
	}
};

let adjectives: string[] = [];
const usedAdjectives: string[] = [];
let previousAdjective = '';
const getNewAdjective = () => {
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

	return newAdjective;
};

export default function NewSplash({ splashData }: { splashData: SplashMdx }) {
	let subheading1 = splashData.body.raw;
	let subheading2 = '';
	let firstAdjective = '';
	if (subheading1.includes('{adjective}')) {
		subheading1 = splashData.body.raw.split('{adjective}')[0];
		subheading2 = splashData.body.raw.split('{adjective}')[1];

		if (splashData.adjectives) {
			adjectives = splashData.adjectives;
			firstAdjective = adjectives[0];
			previousAdjective = adjectives[0];
			usedAdjectives.push(adjectives[0]);
		}
	}

	let ran = false;
	// init typewriter effect
	const adjectiveContainer: RefObject<HTMLParagraphElement> = useRef(null);
	const adjectiveRef: RefObject<HTMLSpanElement> = useRef(null);
	useEffect(() => {
		if (ran) return;
		ran = true;
		const adjectiveContainerEl = adjectiveContainer.current;
		const adjectiveEl = adjectiveRef.current;

		if (
			adjectiveContainerEl &&
			adjectiveEl &&
			!window.matchMedia('(prefers-reduced-motion: reduce)').matches
		) {
			setTimeout(() => {
				const newAdjective = getNewAdjective();
				removeText(
					adjectiveEl,
					adjectiveContainerEl,
					newAdjective,
					`${subheading1} ${newAdjective} ${subheading2}`
				);

				setInterval(() => {
					const newAdjective = getNewAdjective();
					removeText(
						adjectiveEl,
						adjectiveContainerEl,
						newAdjective,
						`${subheading1} ${newAdjective} ${subheading2}`
					);
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
					<p
						ref={adjectiveContainer}
						aria-label={`${subheading1} ${firstAdjective} ${subheading2}`}>
						{subheading1}
						{firstAdjective && (
							<>
								<span ref={adjectiveRef} aria-hidden="true" className={styles.adjective}>
									{firstAdjective}
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
