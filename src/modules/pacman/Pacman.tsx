import styles from './pacman.module.css';

import { useEffect, useRef, RefObject } from 'react';

const degrees = [0, 90, 180, 270];

let pacmanSize = 40;
export default function Pacman() {
	const summonPacman = (degree = degrees[Math.floor(Math.random() * degrees.length)]) => {
		pacmanSize = Math.min(pacmanSize + 2, 80);

		pacmanRef.current?.classList.add(styles.summoned);
		pacmanRef.current?.setAttribute(
			'style',
			`transform: rotate(${degree}deg); --pacman-size: ${pacmanSize}px;`
		);

		setTimeout(() => {
			pacmanRef.current?.classList.remove(styles.summoned);
		}, 10000);
	};

	useEffect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			return;
		}
		setTimeout(() => {
			summonPacman(0);
			setInterval(() => {
				summonPacman();
			}, 15000);
		}, 5000);
	}, []);

	const pacmanRef: RefObject<HTMLDivElement> = useRef(null);

	return (
		<section ref={pacmanRef} className={`${styles.pacman} pacman`}>
			<div>
				<span></span>
			</div>

			<ul>{(() => [...Array(20)].map((_, i) => <li key={i}></li>))()}</ul>
		</section>
	);
}
