<script lang="ts">
	import { page } from '$app/state';

	const currentRoute = $derived(page.route.id);

	const entries = [
		{ label: 'Home', href: '/' },
		{ label: 'Projects', href: '/projects' },
		{ label: 'About', href: '/about' },
		{ label: 'Contact', href: '/contact' },
	];
</script>

<header class="root">
	<ul class="list">
		{#each entries as { label, href }}
			<li class="listItem">
				<a
					{href}
					class="underline listItemLink"
					class:active={href === currentRoute}
				>
					{label}
				</a>
			</li>
		{/each}
	</ul>
</header>

<style>
	.root {
		width: 100%;
		background-color: var(--primary-bg);
		position: sticky;
		top: 0;
		z-index: 10;
	}
	.list {
		display: flex;
		align-items: center;
  	gap: 1.5rem;
		justify-content: flex-end;
		width: var(--page-width);
		padding-block: 1rem;
		margin-inline: auto;
	}

	.listItem {
		&:first-of-type {
			margin-right: auto;
		}
	}
	.listItemLink {
		color: var(--primary-text);

		&.active {
			cursor: default;
		}
	}
</style>
