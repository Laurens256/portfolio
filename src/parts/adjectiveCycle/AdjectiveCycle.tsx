import { useRef, useEffect } from 'react';
import styles from './adjectiveCycle.module.css';

export default function AdjectiveCycle({ strings }: { strings: string[] }) {
	const spanRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (
			window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
			!spanRef.current
		) {
			return;
		}

		typewriter();
		spanRef.current.classList.add(styles.typewriter);
	}, []);

	const typewriter = () => {
		const usedStrings: string[] = [];
		let previousString = strings[0];
		let currentString = strings[0];

		// all delays in ms
		const typeDelay = 100;
		const eraseDelay = 80;
		const newStringDelay = 8000;

		const getNewString = () => {
			if (usedStrings.length === strings.length) {
				usedStrings.length = 0;
			}
			const possibleStrings = strings.filter(
				(string) => !usedStrings.includes(string) && string !== previousString
			);
			const newString =
				possibleStrings[Math.floor(Math.random() * possibleStrings.length)];

			previousString = newString;
			usedStrings.push(newString);

			return newString;
		};

		const type = () => {
			currentString = getNewString();
			let i = 0;
			const typing = setInterval(() => {
				if (i === currentString.length) {
					clearInterval(typing);
					setTimeout(() => {
						erase();
					}, newStringDelay);
				} else {
					spanRef.current!.textContent += currentString[i];
					i++;
				}
			}, typeDelay);
		};

		const erase = () => {
			let i = currentString.length - 1;
			const erasing = setInterval(() => {
				if (i === -1) {
					clearInterval(erasing);
					type();
				} else {
					spanRef.current!.textContent = currentString.substring(0, i);
					i--;
				}
			}, eraseDelay);
		};

		setTimeout(() => {
			erase();
		}, 3000);
	};

	return <span ref={spanRef}>{strings[0]}</span>;
}
