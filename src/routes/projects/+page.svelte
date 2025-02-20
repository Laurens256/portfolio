<script lang="ts">
	import { ProjectCard, PageHeader } from '$components';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<PageHeader heading="All projects" />

<ol class="list" aria-labelledby="__all_projects__">
	{#each data.projectsMeta as meta (meta.slug)}
		<li>
			<ProjectCard {...meta} />
		</li>
	{/each}
</ol>

<style>
	.list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 1rem;
	}
</style>
