<script lang="ts">
	type Props = {
		heading: string;
		subheading?: string;
	};

	const { heading, subheading }: Props = $props();
</script>

<section class="root">
	<h1 class="heading">{heading}</h1>
	{#if subheading}
		<p class="subheading">{subheading}</p>
	{/if}
</section>

<style>
	.root {
		border-bottom: 2px solid var(--primary-text);
		padding-bottom: 1rem;
	}
	.heading {
		font-size: 2.25rem;
	}
	.subheading {
		font-size: 1.25rem;
		margin-top: 0.5rem;
	}
</style>
