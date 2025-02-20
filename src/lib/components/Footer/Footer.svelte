<script lang="ts">
	const socials = [
		{ label: 'duinlaurens2@gmail.com', href: 'mailto:duinlaurens2@gmail.com' },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/laurens-duin-497b9a1a9/' },
		{ label: 'Github', href: 'https://github.com/Laurens256/' },
	];
</script>

<footer class="root">
	<section>
		<h2 id="__footer_socials__" class="heading">Contact</h2>
		<ul aria-labelledby="__footer_socials__" class="socialsList">
			{#each socials as { label, href }}
				<li>
					<a
						{href}
						target="_blank"
						class="underline socialLink"
					>
						{label}
					</a>
				</li>
			{/each}
		</ul>
	</section>

	<p class="copyrightText">&copy; {new Date().getFullYear()} Laurens Duin</p>
</footer>

<style>
	.root {
		width: 100%;
		background-color: var(--secondary-bg);
		padding-inline: calc((100% - var(--page-width)) / 2);
		padding-block: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.heading {
		font-size: 1.1rem;
	}
	.socialsList {
		display: flex;
		column-gap: 1.5rem;
		row-gap: 0.5rem;
		margin-top: 0.25rem;
		flex-wrap: wrap;

		@media screen and (max-width: 500px) {
			flex-direction: column;
		}
	}
	.socialLink {
		color: var(--primary-text);
		font-family: var(--font-sans-serif);
	}

	.copyrightText {
		font-size: 0.8rem;
		color: var(--secondary-text);
	}
</style>
