<script lang="ts">
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	const { Content } = $derived(data);
</script>

<div class="__markdown_projects_page__">
	<Content />
</div>

<style>
:global {
	.__markdown_projects_page__ {
		--section-margin: 1.5rem;
		font-size: 1.1rem;
		line-height: 1.6;

		& img {
			width: 100%;
			height: auto;
			margin-bottom: var(--section-margin);
		}

		& p {
			margin-bottom: var(--section-margin);
		}

		& ul, & ol, & dl {
			list-style: revert;
			list-style-position: inside;
			margin-bottom: var(--section-margin);
		}
	}
}
</style>
