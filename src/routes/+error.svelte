<script lang="ts">
	import { page } from '$app/state';
</script>

<main class="root">
	<div class="textContainer">
		<h2>{page.status}</h2>
		<h1>{page.error?.message}</h1>
	</div>

	<a href="/" class="underline">Back to home</a>
</main>

<style>
	.root {
		min-height: 30rem;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 3rem;
		flex-direction: column;
	}
	.textContainer {
		display: flex;
		flex-direction: column;
		text-align: center;
		gap: 0.25rem;
	}
</style>
