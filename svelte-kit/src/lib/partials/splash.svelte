<script lang="ts">
	import { onMount } from 'svelte';

	export let navLinks: NavLink[];

	navLinks.sort((a, b) => {
		return a.attributes.order - b.attributes.order;
	});

	interface NavLink {
		attributes: {
			title: string;
			href: string;
			icon: string;
			order: number;
		};
	}

	onMount(() => {
		setRandomPanelColors();
	});

	const panelColors = ['#5627af', '#9d27b0', '#2729af', '#256bb0', '#e91f63'];
	const setRandomPanelColors = () => {
		const navLinkEls: NodeListOf<HTMLAnchorElement> =
			document.querySelectorAll('section.splash nav a');
			
		navLinkEls.forEach((navLinkEl) => {
			const randomIndex = Math.floor(Math.random() * panelColors.length);
			const randomColor = panelColors[randomIndex];
			panelColors.splice(randomIndex, 1);

			navLinkEl.style.setProperty('--panel-color', randomColor);
			navLinkEl.classList.remove('unloaded');
		});
	};

	const betterLinkLogic = (e: MouseEvent) => {
		e.preventDefault();

		const navLink = e.currentTarget;
		if (navLink instanceof HTMLAnchorElement) {
			const targetHeading = navLink.getAttribute('href');

			if (targetHeading) {
				const targetHeadingElement = document.querySelector(targetHeading);
				targetHeadingElement?.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		}
	};
</script>

<section class="splash">
	<div>
		<h1>Laurens Duin</h1>
	</div>

	<nav>
		{#each navLinks as navLink}
			<a
				draggable="false"
				class="unloaded"
				on:click={betterLinkLogic}
				href="#{navLink.attributes.href}"
				>{navLink.attributes.title}
				{@html navLink.attributes.icon}
			</a>
		{/each}
	</nav>
</section>

<h2 id="skills">skills</h2>
<h2 id="projects">projecten</h2>
<h2 id="about">over mij</h2>
<h2 id="contact">contact</h2>

<style>
	section {
		display: grid;
		grid-template-rows: 40% 1fr;
		min-height: 100vh;
		height: fit-content;
	}

	section > div:first-of-type {
		height: 40vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	section div h1 {
		font-size: clamp(2rem, 5rem, 10vw);
		text-align: center;
		place-self: center;
	}

	section nav {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0.5em;
		padding: 0.5em;
		align-self: end;
	}

	section nav a {
		position: relative;
		overflow: hidden;
		color: var(--text-white);
		background: linear-gradient(
			140deg,
			var(--panel-color, var(--secondary-bg)) 50%,
			var(--secondary-bg) 0
		);
		border-radius: 4rem;
		padding: 4em;
		transition: transform 0.4s ease, border-color 0.2s ease, background-position 1.8s ease;
		border: solid 2px var(--main-bg);
		background-size: 200% 200%;
		background-position: 100% 100%;

		animation: panelLoad 1.8s ease forwards;
		animation-play-state: running;
	}
	section nav a.unloaded {
		animation-play-state: paused;
	}

	@keyframes panelLoad {
		to {
			background-position: 0 0;
		}
	}

	section nav a:first-of-type {
		grid-column: 1 / 3;
		grid-row: 1 / 3;
		min-height: 30rem;
	}

	section nav a:last-of-type {
		grid-column: 3 / -1;
	}

	section nav a:is(:hover, :focus-visible) {
		transform: scale(0.975);
		border-color: var(--main-text);
	}

	section nav a:focus-visible {
		outline-offset: 3px;
		outline-color: var(--link-color);
	}

	:global(section.splash nav a svg) {
		position: absolute;
		bottom: 1em;
		right: 2em;
		width: 3em;
		fill: none;
		stroke: currentColor;
		mix-blend-mode: difference;
		transition: fill 0.2s ease;
		stroke-linecap: round;
		stroke-linejoin: bevel;
		stroke-width: 1.5px;
	}

	@media (max-width: 1028px) {
		section > div:first-of-type {
			height: 30vh;
		}

		section nav {
			grid-template-columns: repeat(2, 1fr);
		}

		section nav a {
			border-radius: 3em;
		}

		section nav a:first-of-type {
			grid-column: 1 / -1;
			grid-row: 1 / 2;
		}

		section nav a:nth-of-type(2),
		section nav a:last-of-type {
			min-height: 10rem;
		}

		section nav a:last-of-type {
			grid-column: 1 / -1;
		}
	}
</style>
