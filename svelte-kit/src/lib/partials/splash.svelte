<script lang="ts">
	import { onMount } from 'svelte';
	let wrapper: HTMLElement;

	const navItems = [
		{
			name: 'Skills',
			href: '#skills'
		},
		{
			name: 'Projecten',
			href: '#projects'
		},
		{
			name: 'Over mij',
			href: '#about'
		},
		{
			name: 'Contact',
			href: '#contact'
		}
	];

	onMount(() => {
		betterNavLinks();
	});

	const linkColors: string[] = [];

	const betterNavLinks = () => {
		const navLinks: NodeListOf<HTMLAnchorElement> = wrapper.querySelectorAll('nav a');

		for (
			let i = 0;
			getComputedStyle(wrapper).getPropertyValue(`--panel-color-${i + 1}`) !== '';
			i++
		) {
			const color = getComputedStyle(wrapper).getPropertyValue(`--panel-color-${i + 1}`);
			linkColors.splice(Math.floor(Math.random() * (linkColors.length + 1)), 0, color);
		}

		// apply the link color to the nav links and set click handler
		for (const [i, navLink] of navLinks.entries()) {
			navLink.addEventListener('click', betterLinkLogic);
			navLink.style.setProperty('--panel-color', linkColors[i]);
			navLink.classList.remove('unloaded');
		}
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

<section bind:this={wrapper}>
	<div>
		<h1>Laurens Duin</h1>
	</div>

	<nav>
		{#each navItems as navItem}
			<a draggable="false" class="unloaded" href={navItem.href}
				>{navItem.name}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path class="cls-1" d="M16.3,16.78l4.11-4.11a1,1,0,0,0,0-1.41l-4-4" />
					<path class="cls-1" d="M7.7,7.22,3.59,11.33a1,1,0,0,0,0,1.41l4,4" />
					<line class="cls-1" x1="13.84" y1="3.14" x2="10.72" y2="20.86" />
				</svg>
			</a>
		{/each}
	</nav>
</section>

<style>
	section {
		/* kleuren worden random ingeladen dmv js */
		--panel-color-1: #5627af;
		--panel-color-2: #9d27b0;
		--panel-color-3: #2729af;
		--panel-color-4: #256bb0;
		--panel-color-5: #e91f63;

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
		background-position: 0 0;
	}

	section nav a.unloaded {
		background-position: 100% 100%;
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

	section nav a svg {
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
