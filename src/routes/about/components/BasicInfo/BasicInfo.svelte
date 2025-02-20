<script lang="ts">
	const calculateAge = (dateStr: string | Date) => {
		const fromDate = new Date(dateStr);
		const now = new Date();

		let age = now.getFullYear() - fromDate.getFullYear();

		const monthDiff = now.getMonth() - fromDate.getMonth();

		if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < fromDate.getDate())) {
			age -= 1;
		}

		return age;
	};
</script>

<section class="root">
	<p>
		<!-- eslint-disable-next-line @stylistic/max-len -->
		Hi! I'm Laurens, a {calculateAge('2003-09-22')} year old frontend developer based in the the Netherlands, Amersfoort. I like to develop web applications with a special eye for usability. When I'm not developing, I like to spend my time bouldering, reading and playing video games.
	</p>

	<!--	<chaos-cards src="https://placehold.co/600x400" alt="laurens duin">-->
</section>

<style>
	.root {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
