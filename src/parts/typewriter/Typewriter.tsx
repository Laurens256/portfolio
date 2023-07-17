import { useImperativeHandle, useRef, useEffect } from 'react';
import styles from './typewriter.module.css';

const delay = 100;
const removeDelay = 80;
// Start the typewriter effect to remove existing text
const removeText = (element: HTMLElement): Promise<void> => {
	return new Promise((resolve) => {
		if (!element.textContent) return;
		let i = element.textContent.length;
		const removeNextCharacter = () => {
			if (i > 0) {
				element.textContent = element.textContent!.slice(0, i - 1);
				i--;
				setTimeout(removeNextCharacter, removeDelay);
			} else {
				resolve();
			}
		};
		removeNextCharacter();
	});
};

const addText = (element: HTMLElement, newText: string): Promise<void> => {
	return new Promise((resolve) => {
		let i = 0;
		const addNextCharacter = () => {
			if (i < newText.length) {
				element.textContent += newText.charAt(i);
				i++;
				setTimeout(addNextCharacter, delay);
			} else {
				resolve();
			}
		};
		addNextCharacter();
	});
};

const typeNewWord = async (newWord: string) => {
	// const typewriteEl = typewriterRef.current;

	const typewriterEl = document.querySelector(`#${styles.typewriter}`) as HTMLElement;

	if (!typewriterEl) return;

	await removeText(typewriterEl);
	await addText(typewriterEl, newWord);
};

const changeWord = async (typewriterEl: HTMLElement, newWord: string) => {
	await removeText(typewriterEl);
	await addText(typewriterEl, newWord);
};

export default function Typewriter({
	newText,
	initialValue
}: {
	newText: string;
	initialValue?: string;
}) {
	const typewriterRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (newText && typewriterRef.current) {
			changeWord(typewriterRef.current, newText);
		}
	}, [newText]);

	return (
		<span className={styles.typewriter} ref={typewriterRef} role="text">
			{initialValue ? initialValue : ''}
		</span>
	);
}

export { typeNewWord };
