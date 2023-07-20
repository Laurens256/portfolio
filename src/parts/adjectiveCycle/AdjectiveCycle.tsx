import { useRef, useEffect } from 'react';
import styles from './adjectiveCycle.module.css';

export default function AdjectiveCycle({ strings }: { strings: string[] }) {
	const spanRef = useRef<HTMLSpanElement>(null);

	const disableTypewriter = () => {
		if (!spanRef.current) {
			return;
		}
		clearInterval(typingInterval);
		clearInterval(erasingInterval);
		clearTimeout(erasingTimeout);
		clearTimeout(typingTimeout);

		const spanEl = spanRef.current;
		spanEl.classList.remove(styles.typewriter);
		spanEl.classList.remove(styles.moving);
		spanEl.textContent = strings[0];
	};

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		mediaQuery.addEventListener('change', () => {
			mediaQuery.matches ? disableTypewriter() : typewriter();
		});

		if (mediaQuery.matches) {
			return;
		}

		typewriter();
	}, []);

	// all the intervals and timeouts are stored in variables so they can be cleared on disableTypewriter
	let erasingInterval: NodeJS.Timeout;
	let typingInterval: NodeJS.Timeout;
	let erasingTimeout: NodeJS.Timeout;
	let typingTimeout: NodeJS.Timeout;
	const typewriter = () => {
		if (!spanRef.current) {
			return;
		}
		const usedStrings: string[] = [];
		let previousString = strings[0];
		let currentString = strings[0];

		const intialDelay = 3000; // delay before first string is changed
		const typeDelay = 100; // delay between each character being typed
		const eraseDelay = 80; // delay between each character being erased
		const newStringDelay = 8000; // n amount of time new string is shown
		const noStringDelay = 1500; // n amount of time no string is shown

		const spanEl = spanRef.current;
		spanEl.classList.add(styles.typewriter);

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
			spanEl.classList.add(styles.moving);

			let i = 0;
			typingInterval = setInterval(() => {
				if (i === currentString.length) {
					clearInterval(typingInterval);
					// clearInterval(typing);
					spanEl.textContent = currentString;
					spanEl.classList.remove(styles.moving);
					erasingTimeout = setTimeout(() => {
						erase();
					}, newStringDelay);
				} else {
					spanEl.textContent += currentString[i];
					i++;
				}
			}, typeDelay);
		};

		const erase = () => {
			let i = currentString.length - 1;
			spanEl.classList.add(styles.moving);

			erasingInterval = setInterval(() => {
				if (i === -1) {
					// clearInterval(erasing);
					clearInterval(erasingInterval);
					spanEl.classList.remove(styles.moving);
					typingTimeout = setTimeout(() => {
						type();
					}, noStringDelay);
				} else {
					spanEl.textContent = currentString.substring(0, i);
					i--;
				}
			}, eraseDelay);
		};

		setTimeout(() => {
			erase();
		}, intialDelay);
	};

	return (
		<span ref={spanRef} role="text">
			{strings[0]}
		</span>
	);
}
