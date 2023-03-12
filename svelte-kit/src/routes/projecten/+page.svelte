<script lang="ts">
	export let data;
	const projects = data.response;
	console.log(projects);
</script>

<h1>lijst met projecten</h1>

<ul>
	{#each projects as project}
		<li>
			{#if project.attributes.cover.data}
				<img src={project.attributes.cover.data.attributes.url} alt="" />
			{/if}
			<a href="/projecten/{project.attributes.slug}">{project.attributes.title}</a>
		</li>
	{/each}
</ul>
