<script lang="ts">
	import { Timeline } from '$components';

	const educations = [
		{
			dateString: '2020 - 2024',
			title: 'Bachelor\'s degree (Cum Laude)',
			subtitle: 'Communication & Multimedia Design',
			description: 'Amsterdam University of Applied Sciences',
		},
		{
			dateString: '2015 - 2019',
			title: 'HAVO',
			description: '\'t Atrium',
		},
	];
</script>

<section class="root">
	<h2>Formal education</h2>
	<Timeline entries={educations} />
</section>

<style>
  .root {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: min(100%, 35rem);
  }
</style>
