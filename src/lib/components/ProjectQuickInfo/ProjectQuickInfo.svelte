<script lang="ts">
	type Props = {
		caseDescription?: string;
		quickLinks?: { label: string; href: string }[];
	};

	const { caseDescription, quickLinks }: Props = $props();
</script>

<header class="root">
	{#if caseDescription}
		<section class="section">
			<h2>Case</h2>
			<p class="caseText">{caseDescription}</p>
		</section>
	{/if}

	{#if quickLinks}
		<section class="section">
			<h2>Quick links</h2>
			<ul class="linksList">
				{#each quickLinks as { label, href }}
					<li>
						<a {href} target="_blank" class="underline">{label}</a>
					</li>
				{/each}
			</ul>
		</section>
	{/if}
</header>

<style>
	.root {
		display: flex;
		padding-bottom: 3rem;
		gap: 2rem;

		@media screen and (max-width: 40rem) {
			flex-direction: column;
			padding-bottom: 1.5rem;
		}
	}
	.section {
		flex-basis: 50%;

		& h2 {
			font-size: 1.5rem;
			margin-bottom: 0.25rem;
		}
		& .caseText {
			margin: 0;
		}
	}
	.linksList {
		list-style: none;
	}
</style>
