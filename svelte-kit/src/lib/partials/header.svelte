<header>
	<ul>
		<li>Icon</li>

		<li>
			<label for="hamburger-toggle">Toggle hamburger menu</label>
			<input id="hamburger-toggle" type="checkbox" />
		</li>

		<li><a href="#home">Home</a></li>
		<li><a href="#about">About</a></li>
		<li><a href="#projects">Projects</a></li>
		<li><a href="#contact">Contact</a></li>
	</ul>
</header>

<style>
	header {
		background-color: var(--main-bg);
		background-color: red;
		padding: 1rem 5rem;
	}

	header ul {
		display: flex;
		gap: 2rem;
		justify-content: end;
	}

	header li:first-of-type {
		margin-right: auto;
	}

	/* hide label */
	header ul li label {
		clip: rect(0 0 0 0);
		position: fixed;
	}
</style>
