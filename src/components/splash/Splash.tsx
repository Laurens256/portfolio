import { useEffect, useState } from 'react';
import styles from './splash.module.css';

import { SplashMdx } from 'contentlayer/generated';

import { betterLinkScroll } from '@/modules/header/Header';
import Typewriter from '@/parts/typewriter/Typewriter';

let adjectives: string[] = [];
const usedAdjectives: string[] = [];
let previousAdjective = '';
// all logic for getting a new adjective and making sure it loops through all adjectives before resetting possible adjectives
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

export default function Splash({ splashData }: { splashData: SplashMdx }) {
	let subheading1 = splashData.body.raw;
	let subheading2 = '';
	let firstAdjective = '';

	// check if subheading contains special {adjective} tag, if so, list of adjectives is needed and will be used in place of {adjective}
	if (subheading1.includes('{adjective}')) {
		subheading1 = splashData.body.raw.split('{adjective}')[0];
		subheading2 = splashData.body.raw.split('{adjective}')[1];

		if (splashData.adjectives) {
			adjectives = splashData.adjectives;
			firstAdjective = adjectives[0];
			previousAdjective = firstAdjective;
			usedAdjectives.push(firstAdjective);
		}
	}

	const [currentAdjective, setAdjective] = useState('');

	let ran = false;
	useEffect(() => {
		if (ran || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		ran = true;

		setTimeout(() => {
			setAdjective(getNewAdjective());

			setInterval(() => {
				setAdjective(getNewAdjective());
			}, 8000);
		}, 3000);
	}, []);

	return (
		<>
			<section className={styles.splash}>
				<div>
					<p aria-hidden="true">Hi! My name is</p>
					<h1 aria-label="hi! my name is Laurens Duin">Laurens Duin</h1>
					<p>
						{subheading1}
						{firstAdjective && (
							<>
								<Typewriter newText={currentAdjective} initialValue={firstAdjective} />
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
