<script lang="ts">
	import './global.css';
	import { Header, Footer } from '$components';
	import { jsEnabledStore } from '$stores';

	const { children } = $props();

	$effect.pre(() => {
		jsEnabledStore.isEnabled = true;
		console.log(`    |\\__/,|   (\`\\
  _.|o o  |_   ) )
-(((---(((--------
`);
	});

	const documentTitle = 'Laurens Duin | Portfolio';
	const documentDescription = 'I\'m a Dutch frontend developer who loves working on fun web experiences.';
</script>

<svelte:head>
	<title>{documentTitle}</title>
	<meta name="og:title" content={documentTitle} />

	<meta name="description" content={documentDescription} />
	<meta name="og:description" content={documentDescription} />
</svelte:head>

<Header />

<main class="inner">
	{@render children()}
</main>

<Footer />

<style>
  .inner {
		padding-block: 2rem 3rem;
		padding-inline: calc((100% - var(--page-width)) / 2);
		background-color: var(--primary-bg);
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}
</style>
