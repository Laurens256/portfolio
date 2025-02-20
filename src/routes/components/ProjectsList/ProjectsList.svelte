<script lang="ts">
	import type { SvxProjectMeta } from '$types';
	import { ProjectCard } from '$components';

	type Props = {
		projectsMeta: SvxProjectMeta[];
	};

	const { projectsMeta }: Props = $props();
</script>

<section>
	<header class="header">
		<h2 id="__projects__">My projects</h2>
		<a href="/projects" class="underline" aria-label="see all projects">See more</a>
	</header>

	<ol class="list" aria-labelledby="__projects__">
		{#each projectsMeta as meta (meta.slug)}
			<li>
				<ProjectCard {...meta} />
			</li>
		{/each}
	</ol>
</section>

<style>
	.header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.25rem;
		flex-wrap: wrap;
	}
	.list {
		display: flex;
		flex-direction: column;
		margin-top: 1rem;
		gap: 0.75rem;
	}
</style>
