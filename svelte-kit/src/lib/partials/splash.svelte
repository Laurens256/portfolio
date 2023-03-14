<script lang="ts">
	import { onMount } from 'svelte';
	let wrapper: HTMLElement;

	onMount(() => {
		// betterNavLinks();
	});

	const linkColors: string[] = [];

	const betterNavLinks = () => {
		const navLinks: NodeListOf<HTMLAnchorElement> = wrapper.querySelectorAll('nav a');

		for (const [i, navLink] of navLinks.entries()) {
			navLink.addEventListener('click', betterLinkLogic);

			// get the css variable values and insert into random positions in the array
			const color = getComputedStyle(document.documentElement).getPropertyValue(
				`--nav-panel-${i + 1}`
			);
			linkColors.splice(Math.floor(Math.random() * (linkColors.length + 1)), 0, color);
		}
		setLinkColors();
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

	const setLinkColors = () => {
		for (const [i, color] of linkColors.entries()) {
			document.documentElement.style.setProperty(`--nav-panel-${i + 1}`, color);
		}
	};
</script>

<section bind:this={wrapper}>
	<div>
		<h1>Laurens Duin</h1>
	</div>

	<nav>
		<a draggable="false" href="#skills">Skills</a>
		<a draggable="false" href="#projects">Projecten</a>
		<a draggable="false" href="#about">Over mij</a>
		<a draggable="false" href="#contact">Contact</a>
	</nav>
</section>

<style lang="scss">
	$bgColors: #42a5f5, #26a69a, #ffa727, #ef5350, #c561d6;

	@function list-remove($list, $index) {
		$newList: ();
		@for $i from 1 through length($list) {
			@if $i != $index {
				$newList: append($newList, nth($list, $i));
			}
		}
		@return $newList;
	}

	@for $i from 1 through length($bgColors) {
		$bgColor-index: random(length($bgColors));
		$bgColor: nth($bgColors, $bgColor-index);
		$bgColors: list-remove($bgColors, $bgColor-index);
		section nav a:nth-of-type(#{$i}) {
			background-color: $bgColor;
		}
	}

	section {
		/* --panel-1: #5627af;
		--panel-2: #9d27b0;
		--panel-3: #2729af;
		--panel-4: #256bb0; */

		background-color: var(--main-bg);
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
		background-color: var(--secondary-bg);
		border-radius: 4rem;
		padding: 2em;
		transition: transform 0.4s ease, border-color 0.2s ease;
		border: solid 2px transparent;
	}

	section nav a:first-of-type {
		grid-column: 1 / 3;
		grid-row: 1 / 3;
		min-height: 30rem;
		// background-color: var(--nav-panel-1);
	}

	section nav a:nth-of-type(2) {
		// background-color: var(--nav-panel-2);
	}

	section nav a:nth-of-type(3) {
		// background-color: var(--nav-panel-3);
	}

	section nav a:last-of-type {
		grid-column: 3 / -1;
		// background-color: var(--nav-panel-4);
	}

	section nav a:is(:hover, :focus-visible) {
		transform: scale(0.975);
		border-color: var(--main-text);
	}

	section nav a:focus-visible {
		outline-offset: 3px;
		outline-color: var(--link-color);
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
