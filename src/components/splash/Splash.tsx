import styles from './splash.module.css';

import { SplashMdx } from 'contentlayer/generated';

import { betterLinkScroll } from '@/components/header/Header';
import AdjectiveCycle from '@/parts/adjectiveCycle/AdjectiveCycle';
import Link from 'next/link';

export default function Splash({ splashData }: { splashData: SplashMdx }) {
	let subheading1 = splashData.body.raw;
	let subheading2 = '';

	// check if subheading contains special {adjective} tag, if so, list of adjectives is needed and will be used in place of {adjective}
	if (subheading1.includes('{adjective}')) {
		subheading1 = splashData.body.raw.split('{adjective}')[0];
		subheading2 = splashData.body.raw.split('{adjective}')[1];
	}

	return (
		<>
			<section className={styles.splash}>
				<div>
					<p aria-hidden="true">Hi! My name is</p>
					<h1 aria-label="hi! my name is Laurens Duin">Laurens Duin</h1>
					<p>
						{subheading1}
						{splashData.adjectives && (
							<>
								<AdjectiveCycle strings={splashData.adjectives} />
								{subheading2}
							</>
						)}
					</p>
				</div>
				<Link
					href="#projects"
					aria-label="scroll to my projects"
					className={styles.scrollbtn}
					onClick={betterLinkScroll}>
					My Projects
				</Link>
			</section>
		</>
	);
}
