<script lang="ts">
	import type { PageProps } from './$types';
	import { ProjectsList } from './components';
	import { PageHeader } from '$components';

	const { data }: PageProps = $props();

// ? TODO: something fun on landing page
</script>

<PageHeader heading="Laurens Duin" subheading="Frontend developer" />

<ProjectsList projectsMeta={data.projectsMeta} />
