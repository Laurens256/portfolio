<script lang="ts">
	import { Timeline } from '$components';

	const experiences = [
		{
			dateString: 'Aug. 2023 - present',
			title: 'Pickler',
			subtitle: 'Intern \u2192 Junior frontend developer',
			description: 'Next, Typescript, Node',
		},
		{
			dateString: 'April 2022 - June 2022',
			title: 'Atos',
			subtitle: 'Intern frontend developer',
			description: 'Angular, Typescript',
		},
		{
			dateString: 'June 2021 - Mar. 2024',
			title: 'Ikea',
			subtitle: 'Warehouse worker',
		},
	];
</script>

<section class="root">
	<h2>Career</h2>
	<Timeline entries={experiences} />
</section>

<style>
  .root {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: min(100%, 35rem);
  }
</style>
