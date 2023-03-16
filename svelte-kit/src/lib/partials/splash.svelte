<script lang="ts">
	import { onMount } from 'svelte';

	interface NavLink {
		attributes: {
			title: string;
			href: string;
			icon: string;
			order: number;
		};
	}

	export let navLinks: NavLink[];

	navLinks.sort((a, b) => {
		return a.attributes.order - b.attributes.order;
	});

	// onMount(() => {
	// 	setRandomPanelColors();
	// });

	const panelColors = ['#5627af', '#9d27b0', '#2729af', '#256bb0', '#e91f63'];
	const getRandomPanelColor = () => {
		return panelColors.splice(Math.floor(Math.random() * panelColors.length), 1);
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

	console.log('javascript ran');
	// style="--panel-color: var(--panel-color-{i + 1}"
	// style="--panel-color: {panelColors.splice(Math.floor(Math.random() * panelColors.length), 1)}"
</script>

<section class="splash">
	<div>
		<h1>Laurens Duin</h1>
	</div>

	<nav>
		{#each navLinks as navLink, i}
			<a
				draggable="false"
				on:click={betterLinkLogic}
				href="#{navLink.attributes.href}"
				style="--panel-color: {getRandomPanelColor()}"
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
		min-height: 15rem;
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
		--panel-color-1: #5627af;
		--panel-color-2: #9d27b0;
		--panel-color-3: #2729af;
		--panel-color-4: #e91f63;
		--panel-color-5: #256bb0;

		position: relative;
		overflow: hidden;
		color: var(--text-white);
		background-color: var(--secondary-bg);
		background-image: linear-gradient(
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
		/* --panel-color: #5627af; */
	}

	section nav a:nth-of-type(2) {
		/* --panel-color: #9d27b0; */
	}

	section nav a:nth-of-type(3) {
		/* --panel-color: #2729af; */
	}

	section nav a:last-of-type {
		grid-column: 3 / -1;
		/* --panel-color: #e91f63; */
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
			min-height: 12rem;
		}

		section nav a:last-of-type {
			grid-column: 1 / -1;
		}
	}

	@media (max-width: 768px) {
		section > div:first-of-type {
			height: 20vh;
		}

		section nav {
			gap: 0.1em;
			padding: 0.1em;
		}
	}
</style>
