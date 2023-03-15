<script lang="ts">
	import Splash from '$lib/partials/splash.svelte';

	export let data;

	const { navLinks } = data;
</script>

<Splash navLinks={navLinks} />
