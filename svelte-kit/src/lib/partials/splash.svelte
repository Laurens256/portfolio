<section>
	<div>
		<h1>Laurens Duin</h1>
	</div>

	<nav>
		<a href="#skills">Skills</a>
		<a href="#projects">Projecten</a>
		<a href="#about">Over mij</a>
		<a href="#contact">Contact</a>
	</nav>
</section>

<style>
	section {
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

	section nav a:first-of-type {
		grid-column: 1 / 3;
		grid-row: 1 / 3;
		min-height: 30rem;
	}

	section nav a:last-of-type {
		grid-column: 3 / -1;
	}

	section nav a {
		background: blue;
		border-radius: 4rem;
		padding: 2em;
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
